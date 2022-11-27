import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { createCurve } from "./components/three-components/curve";
import { spaceBoi } from "./components/three-components/spaceboi";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { createTextHome } from "./components/three-components/text/textHome";
import { createParticles } from "./components/three-components/particles";
import { createCube } from "./components/three-components/cube";
import { updateSun } from "./components/three-components/updateSun";
import { generateMaterials } from "./components/three-components/generateMaterials";
import { createBoundary } from "./components/three-components/createBoundary";
import { createTextAbout } from "./components/three-components/text/textAbout";
import { createTextExp } from "./components/three-components/text/textExp";
import { createTextLab } from "./components/three-components/text/textLabs";
import { createRectLight } from "./components/three-components/createRectLight";
import { createAmbientSound } from "./components/three-components/ambientSound";
import { createSphere } from "./components/three-components/createSphere";
import { math } from "../math";
import { noise } from "../noise.js";

let container, object, mixer, particles, plane, meshCube, fontLoader;
let camera, scene, renderer, clock, composer;
let controls, water, upperwater, sun, boundary, sound, noise1;
let pointLight, ambientLight, data, sphere;
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
  const far = 2000;
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
  pointLight = new THREE.PointLight(0xfa1d00);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  ambientLight = new THREE.AmbientLight(0xfa1d00, 15);
  scene.add(ambientLight);

  // White directional light at half intensity shining from the top.
  const directionalLight = new THREE.DirectionalLight(0xfa1d00, 15);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);

  // const spotLight = new THREE.SpotLight(0xffffff, 15);
  // spotLight.position.set(-200, 100, -400);
  // spotLight.castShadow = true;
  // spotLight.shadow.camera.near = 500;
  // spotLight.shadow.camera.far = 4000;
  // spotLight.shadow.camera.fov = 30;
  // spotLight.shadow.mapSize.width = 400;
  // spotLight.shadow.mapSize.height = 400;
  // scene.add(spotLight);

  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);

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
  effect.position.set(-600, 50, -290);
  effect.scale.set(60, 80, 60);
  scene.add(effect);

  //clock
  clock = new THREE.Clock();

  //Water
  const waterGeometry = new THREE.PlaneGeometry(20000, 20000);

  noise1 = new noise.Noise({
    octaves: 3,
    persistence: 0.5,
    lacunarity: 1.6,
    exponentiation: 1.0,
    height: 1.0,
    scale: 0.1,
    seed: 1,
  });

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
    sunColor: 0x55c2d6,
    waterColor: 0x000000,
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
    sunColor: 0x55c2d6,
    waterColor: 0x000000,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  upperwater.rotation.x = -Math.PI / 2;
  upperwater.position.set(0, 200, 0);
  upperwater.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  scene.add(upperwater);

  fontLoader = new FontLoader();

  updateSun(scene, water, renderer);
  createTextHome(scene, fontLoader);
  createTextAbout(scene, fontLoader);
  createTextExp(scene, fontLoader);
  createTextLab(scene, fontLoader);
  sphere = createSphere(scene, camera);

  data = createAmbientSound(camera, scene);

  boundary = createBoundary(scene);
  // createPlane(scene);
  particles = createParticles(scene);
  meshCube = createCube(scene);
  // createCurve(scene);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  createRectLight(scene);

  //Controls
  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 50;
  controls.lookSpeed = 0.025; //0.0075
  // controls.heightMin = 10;
  // controls.heightCoef = 10;
  controls.heightMax = 120;
  controls.heightMin = 0;
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

  //Simplex Noise Sphere
  const remap = [15, 13, 11, 9, 7, 5, 3, 1, 0, 2, 4, 6, 8, 10, 12, 14];
  for (let r = 0; r < data.length; ++r) {
    for (let i = 0; i < data.length; ++i) {
      const freqScale = math.smootherstep((data[remap[i]] / 255) ** 0.5, 0, 1);
      const sc = 1 + 6 * freqScale + noise1.Get(time, r * 0.42142, i * 0.3455);
      sphere.scale.set(sc * 1.5, sc * 1.5, sc * 1.5);
    }
  }

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

  // console.log(data)

  boundary.position.y += Math.sin(time * 5) / 3;

  effect.position.y += Math.sin(time * 5) / 2;
  particles.position.y += Math.sin(time / 4);

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

function setupGui() {
  effectController = {
    material: "matte",
    speed: 0.05,
    numBlobs: 50,
    resolution: 50,
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
