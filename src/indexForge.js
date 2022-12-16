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
import { createAmbientSound } from "./components/three-components/ambientSound";
import { createTorusKnot } from "./components/three-components/createTorusKnot";
import { createSphere } from "./components/three-components/createSphere";
import { createBackground } from "./components/three-components/createBackground";
import colormap from "colormap";
import { createCapsule } from "./components/three-components/createCapsule";
import { createPortal } from "./components/three-components/createPortal";;

let container, particles, meshCube, torusKnot, fontLoader;
let camera, scene, renderer, clock;
let controls,
  water,
  upperwater,
  torus,
  sound,
  heights,
  vertices,
  mesh,
  mesh1,
  mesh2,
  mesh3;
let pointLight, ambientLight, sphere, indices, ANALYSER;
let materials, current_material;
let resolution;
let effectController;
let effect;
let time = 0;
let count = 0;
let objects = [];

const frequencySamples = 256;
const timeSamples = 400;
const data = new Uint8Array(frequencySamples);
const nVertices = (frequencySamples + 1) * (timeSamples + 1);
let xSegments = timeSamples;
let ySegments = frequencySamples;
let xSize = 200;
let ySize = 20;
let xHalfSize = xSize / 2;
let yHalfSize = ySize / 2;
let xSegmentSize = xSize / xSegments; //Size of one square
let ySegmentSize = ySize / ySegments;

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
  camera.position.set(0, 50, 0);

  const geometry = new THREE.BufferGeometry();
  indices = [];
  heights = [];
  vertices = [];

  const yPowMax = Math.log(ySize);
  const yBase = Math.E;
  // generate vertices for a simple grid geometry
  for (let i = 0; i <= xSegments; i++) {
    let x = i * xSegmentSize - xHalfSize; //midpoint of mesh is 0,0
    for (let j = 0; j <= ySegments; j++) {
      let pow = ((ySegments - j) / ySegments) * yPowMax;
      let y = -Math.pow(yBase, pow) + yHalfSize + 1;
      vertices.push(x, y, 0);
      heights.push(0); // for now our mesh is flat, so heights are zero
    }
  }

  for (let i = 0; i < xSegments; i++) {
    for (let j = 0; j < ySegments; j++) {
      let a = i * (ySegments + 1) + (j + 1);
      let b = i * (ySegments + 1) + j;
      let c = (i + 1) * (ySegments + 1) + j;
      let d = (i + 1) * (ySegments + 1) + (j + 1);
      // generate two faces (triangles) per iteration
      indices.push(a, b, d); // face one
      indices.push(b, c, d); // face two
    }
  }
  geometry.setIndex(indices);
  heights = new Uint8Array(heights);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute(
    "displacement",
    new THREE.Uint8BufferAttribute(heights, 1)
  );

  const colors = colormap({
    //inferno, electric, blackbody
    colormap: "electric",
    nshades: 256,
    format: "rgba",
    alpha: 1,
  });
  colors[0] = [0, 0, 0, 0];
  // console.log(colors);
  const lut = colors.map((color) => {
    const red = color[0] / 255;
    const green = color[1] / 255;
    const blue = color[2] / 255;

    return new THREE.Vector3(red, green, blue);
  });
  // console.log(lut);
  //Grab the shaders from the document
  const vShader = document.getElementById("vertexshader");
  const fShader = document.getElementById("fragmentshader");
  // Define the uniforms. V3V gives us a 3vector for RGB color in out LUT
  const uniforms = {
    vLut: { type: "v3v", value: lut },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vShader.text,
    fragmentShader: fShader.text,
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-2000, 90, 0);
  mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  mesh.scale.set(20, 10, 10);
  scene.add(mesh);

  mesh1 = mesh.clone();
  mesh1.position.set(0, 90, -2000);
  mesh1.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
  scene.add(mesh1);

  mesh2 = mesh.clone();
  mesh2.position.set(2000, 90, 0);
  mesh2.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  scene.add(mesh2);

  mesh3 = mesh.clone();
  mesh3.position.set(0, 90, 2000);
  mesh3.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  scene.add(mesh3);

  //mesh.geometry.computeFaceNormals();
  mesh.geometry.computeVertexNormals();

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
  effect.position.set(-500, 50, 300);
  effect.scale.set(60, 80, 60);
  scene.add(effect);

  //clock
  clock = new THREE.Clock();

  //Water
  const waterGeometry = new THREE.PlaneGeometry(5000, 5000);

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
    sunColor: 0xffffff,
    waterColor: 0x290275,
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
    sunColor: 0xffffff,
    waterColor: 0x000000,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  upperwater.rotation.x = -Math.PI / 2;
  upperwater.position.set(0, 500, 0);
  upperwater.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  scene.add(upperwater);

  fontLoader = new FontLoader();

  torusKnot = createTorusKnot(scene);
  updateSun(scene, water, renderer);
  createTextHome(scene, fontLoader);
  createTextAbout(scene, fontLoader);
  createTextExp(scene, fontLoader);
  createTextLab(scene, fontLoader);
  createCapsule(scene, -500, 0, 0x0084db, 1.2);
  createCapsule(scene, -800, -300, 0xdb0a00, 2);
  createCapsule(scene, -800, 200, 0xf52300, 1.5);
  createCapsule(scene, -500, 300, 0xe8dcca, 2);
  // createPortal(scene)
  meshCube = createCube(scene);
  torus = createBoundary(scene);
  particles = createParticles(scene);
  // createBackground(scene);
  // sphere = createSphere(scene, camera);

  sound = createAmbientSound(camera);
  const audio = document.getElementById("audio");

  const startButton = document.getElementById("start-experience");
  startButton.addEventListener("click", function () {
    const AUDIO = new Audio("./Audio/SomethingWicked.mp3");
    const ACTX = new AudioContext();
    ANALYSER = ACTX.createAnalyser();
    AUDIO.play();
    AUDIO.loop = true;
    ANALYSER.fftSize = 4 * frequencySamples;
    ANALYSER.smoothingTimeConstant = 0.5;
    const SOURCE = ACTX.createMediaElementSource(AUDIO);
    SOURCE.connect(ANALYSER);
    // //Pause and Play
    audio.addEventListener("click", function () {
      count += 1;
      if (count % 2 != 0) {
        AUDIO.pause();
      } else {
        AUDIO.play();
      }
    });

    return ANALYSER;
  });

  // createCurve(scene);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  axesHelper.add(sound);

  // createRectLight(scene);

  //Controls
  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 50;
  controls.lookSpeed = 0.025; //0.0075
  controls.heightMin = 10;
  controls.heightCoef = 10;
  controls.heightMax = 120;
  controls.heightMin = 10;
  controls.verticalMax = (3 * Math.PI) / 4;
  controls.verticalMin = Math.PI / 4;
  controls.constrainVertical = true;
  controls.mouseDragOn = true;
  // controls mouse look around
  controls.activeLook = true;
  controls.lookVertical = true;

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

  if (sound.isPlaying) {
    updateGeometry();
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

  torusKnot.rotation.z += 0.045;
  torusKnot.rotation.y += 0.045;
  torusKnot.position.y += Math.sin(time * 5) / 1;

  meshCube.rotation.z += 0.025;
  meshCube.rotation.y += 0.025;
  meshCube.position.y += Math.sin(time * 5) / 1;

  torus[0].rotation.y += 0.025;
  torus[1].rotation.x += 0.025;
  torus[2].rotation.y -= 0.025;
  torus[3].rotation.x -= 0.025;
  //////////////
  torus[4].rotation.y += 0.025;
  torus[5].rotation.x += 0.025;
  torus[6].rotation.y -= 0.025;
  torus[7].rotation.x -= 0.025;
  //////////////
  torus[8].rotation.y += 0.025;
  torus[9].rotation.x += 0.025;

  torus[0].position.y += Math.sin(time * 8) / 1;
  torus[1].position.y += Math.sin(time * 8) / 1;
  torus[2].position.y += Math.sin(time * 8) / 1;
  torus[3].position.y += Math.sin(time * 8) / 1;
  torus[4].position.y += Math.sin(time * 8) / 1;
  torus[5].position.y += Math.sin(time * 8) / 1;
  torus[6].position.y += Math.sin(time * 8) / 1;
  torus[7].position.y += Math.sin(time * 8) / 1;
  torus[8].position.y += Math.sin(time * 8) / 1;
  torus[9].position.y += Math.sin(time * 8) / 1;
  torus[10].position.y += Math.sin(time * 8) / 1;

  effect.position.y += Math.sin(time * 5) / 1;

  particles.position.y += Math.sin(time / 4);
  // particles.position.x += Math.sin(time * 10) / 4;

  // mixer.update( delta );
  controls.update(delta);
  if (camera.position.y < 5) {
    camera.position.y = 5;
  }
  if (camera.position.y > 480) {
    camera.position.y = 480;
  }
  if (
    camera.position.x > 3000 ||
    camera.position.x < -3000 ||
    camera.position.z < -3000 ||
    camera.position.z > 3000
  ) {
    camera.position.set(0, 50, 0);
  }
  // if (camera.position.x > -50 && camera.position.x < 50 && camera.position.z < -495 && camera.position.z > -505)  {
  //   camera.position.set(0,10000,10000)
  // }
  // console.log(camera.position.z)
  renderer.render(scene, camera);
}

const updateGeometry = function () {
  ANALYSER.getByteFrequencyData(data);
  const startVal = frequencySamples + 1;
  const endVal = nVertices - startVal;
  heights.copyWithin(0, startVal, nVertices + 1);
  heights.set(data, endVal - startVal);
  mesh.geometry.setAttribute(
    "displacement",
    new THREE.Uint8BufferAttribute(heights, 1)
  );
};

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
