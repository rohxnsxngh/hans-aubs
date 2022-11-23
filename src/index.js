import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { createCurve } from "./components/three-components/curve";
import { spaceBoi } from "./components/three-components/spaceboi";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let container, object, mixer, particles;
let camera, scene, renderer, clock, composer;
let controls, water, upperwater, sun;
let pointLight, ambientLight;
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
  camera.rotateOnAxis(new THREE.Vector3(0, 0, 0), 0);
  camera.position.set(0, 20, 0);

  //fog
  const color = 0x000000; // change color
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

  const geometryPlane = new THREE.PlaneGeometry(1, 1);
  const materialPlane = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometryPlane, materialPlane);
  plane.scale.set(10,10,10)
  plane.position.set(0,10,-100)
  scene.add(plane);

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

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //curve
  createCurve(scene);

  //Particles//
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const sprite = new THREE.TextureLoader().load("/sprites.png");

  for (let i = 0; i < 1000000; i++) {
    const x = 3000 * Math.random() - 1000;
    const y = 3000 * Math.random() - 1000;
    const z = 3000 * Math.random() - 1000;

    vertices.push(x, y, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 3,
    sizeAttenuation: true,
    alphaTest: 0.5,
    map: sprite,
    transparent: true,
    color: 0x008080,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  //Controls
  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 100;
  controls.lookSpeed = 0.05;
  controls.heightMin = 10;
  controls.heightCoef = 10;
  controls.constrainVertical = true;
  controls.mouseDragOn = false;
  //controls mouse look around
  controls.activeLook = true;
  controls.lookVertical = false;
  window.addEventListener("resize", onWindowResize);

  //Controls
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.maxPolarAngle = Math.PI * 0.725;
  // controls.target.set(0, 10, 0);
  // controls.minDistance = 40.0;
  // controls.maxDistance = 200.0;
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

  particles.position.y += Math.sin(delta * 2);

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
