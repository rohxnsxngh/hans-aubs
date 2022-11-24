import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { createCurve } from "./components/three-components/curve";
import { spaceBoi } from "./components/three-components/spaceboi";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { createText } from "./components/three-components/text";
import { createPlane } from "./components/three-components/plane";
import { createParticles } from "./components/three-components/particles";

let container, object, mixer, particles, plane, meshCube, colorCube, redCube, raycaster, mouse;
let camera, scene, renderer, clock, composer;
let controls, water, upperwater, sun;
let pointLight, ambientLight;
let materials, current_material;
let resolution;
let effectController;
let effect;
let time = 0;

function init() {
  container = document.getElementById("container");

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  // camera.rotateOnAxis(new THREE.Vector3(0, 0, 0), 0);
  camera.position.set(0, 20, 0);

  //fog
  const color = 0x000000;
  const near = 100;
  const far = 1000;
  scene.fog = new THREE.Fog(color, near, far);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  //LIGHT
  pointLight = new THREE.PointLight(0xeb4950);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  ambientLight = new THREE.AmbientLight(0x81e6d6);
  scene.add(ambientLight);

  // White directional light at half intensity shining from the top.
  const directionalLight = new THREE.DirectionalLight(0x81e6d6, 15);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  const spotLight = new THREE.SpotLight(0x81e6d6, 15);
  spotLight.position.set(0, 10, 0);
  scene.add(spotLight);

  // CUBE
  colorCube = new THREE.Color();
  redCube = new THREE.Color().setHex(0xf90b0b);
  const amount = parseInt(window.location.search.slice(1)) || 5;
  const count = Math.pow(amount, 3);
  const geometryCube = new THREE.IcosahedronGeometry(0.5, 3);
  const materialCube = new THREE.MeshPhongMaterial({
    color: 0xf90b0b,
    emissive: 0xf90b0b,
    shininess: 30,
  });

  meshCube = new THREE.InstancedMesh(geometryCube, materialCube, count);

  let i = 0;
  const offset = (amount - 1) / 2;

  const matrix = new THREE.Matrix4();

  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      for (let z = 0; z < amount; z++) {
        matrix.setPosition(offset - x, offset - y, offset - z);

        meshCube.setMatrixAt(i, matrix);

        i++;
      }
    }
  }
  meshCube.scale.set(10, 10, 10);
  meshCube.position.set(0, 50, -1000);
  scene.add(meshCube);

  setupGui();

  // MATERIALS

  materials = generateMaterials();
  current_material = "matte";

  // MARCHING CUBES
  resolution = 28;

  effect = new MarchingCubes(
    resolution,
    materials[current_material],
    true,
    true,
    100000
  );
  effect.position.set(0, 50, -400);
  effect.scale.set(60, 80, 60);
  scene.add(effect);

  //clock
  clock = new THREE.Clock();

  //Sun
  sun = new THREE.Vector3();

  //Water
  const waterGeometry = new THREE.PlaneGeometry(20000, 20000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xda9bf2,
    waterColor: 0x6aeff5,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  upperwater = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xe27d60,
    waterColor: 0x000000,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  upperwater.rotation.x = -Math.PI / 2;
  upperwater.position.set(0, 100, 0);
  upperwater.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  scene.add(upperwater);

  //SkyBox
  const sky = new Sky();
  sky.scale.setScalar(20000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 1;
  skyUniforms["rayleigh"].value = -1; // twilight mode is 0, sunset mode is 3, -1 turns it all off
  skyUniforms["mieCoefficient"].value = 0.5;
  skyUniforms["mieDirectionalG"].value = 1;

  const parameters = {
    elevation: 0,
    azimuth: 180,
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  let renderTarget;

  function updateSun() {
    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);
    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms["sunPosition"].value.copy(sun);
    water.material.uniforms["sunDirection"].value.copy(sun).normalize();
    if (renderTarget !== undefined) renderTarget.dispose();
    renderTarget = pmremGenerator.fromScene(sky);
    scene.environment = renderTarget.texture;
  }

  updateSun();
  // spaceBoi(scene);
  createText(scene);
  // createPlane(scene);
  particles = createParticles(scene)
  
  //curve
  // createCurve(scene);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //Controls
  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 50;
  controls.lookSpeed = 0.0075;
  controls.heightMin = 10;
  controls.heightCoef = 10;
  controls.constrainVertical = true;
  controls.mouseDragOn = false;
  //controls mouse look around
  controls.activeLook = true;
  controls.lookVertical = false;

  //Controls
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.dampingFactor = 0.05;
  // controls.screenSpacePanning = false;
  // controls.minDistance = 100;
  // controls.maxDistance = 500;
  // controls.maxPolarAngle = Math.PI / 2;

  // Resize Window
  window.addEventListener("resize", onWindowResize);
}

//Fit to Window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // composer.setSize(window.innerWidth, window.innerHeight);
}

//Animate
function animate() {
  // object.position.y += 0.05
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / 50);
  render();
}

//Render
function render() {
  const timer = performance.now() * 0.0025;
  water.material.uniforms["time"].value += 1.0 / 60.0;
  upperwater.material.uniforms["time"].value += 1.0 / 60.0;

  const delta = clock.getDelta();
  time += delta * 1.0 * 0.5;

  // marching cubes

  if (effectController.resolution !== resolution) {
    resolution = effectController.resolution;
    effect.init(Math.floor(resolution));
  }

  if (effectController.isolation !== effect.isolation) {
    effect.isolation = effectController.isolation;
  }

  updateCubes(
    effect,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );

  meshCube.rotation.z += 0.025;
  meshCube.rotation.y += 0.025;
  meshCube.position.y += Math.sin(time * 5) / 1;
  effect.position.y += Math.sin(time * 5) / 2;
  particles.position.y += Math.sin(time / 2);

  // mixer.update( delta );
  controls.update(delta);
  renderer.render(scene, camera);
}

init();
animate();

console.log("Scene Polycount:", renderer.info.render.triangles);
console.log("Active Drawcalls:", renderer.info.render.calls);
console.log("Textures in Memory", renderer.info.memory.textures);
console.log("Geometries in Memory", renderer.info.memory.geometries);

function generateMaterials() {
  const materials = {
    matte: new THREE.MeshPhongMaterial({ specular: 0x111111, shininess: 1 }),
    colors: new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 2,
      vertexColors: true,
    }),
  };
  return materials;
}

function setupGui() {
  effectController = {
    material: "matte",
    speed: 0.05,
    numBlobs: 50,
    resolution: 75,
    isolation: 50,
    floor: false,
    wallx: false,
    wallz: false,
  };
}

// this controls content of marching cubes voxel field
function updateCubes(object, time, numblobs, floor, wallx, wallz) {
  object.reset();

  //filling the field
  const subtract = 12;
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (let i = 0; i < numblobs; i++) {
    const ballx =
      Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
      0.5;
    const bally =
      Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
    const ballz =
      Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27 + 0.5;

    object.addBall(ballx, bally, ballz, strength, subtract);
  }

  if (floor) object.addPlaneY(2, 12);
  if (wallz) object.addPlaneZ(2, 12);
  if (wallx) object.addPlaneX(2, 12);

  object.update();
}
