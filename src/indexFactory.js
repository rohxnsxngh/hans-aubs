import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createLimits } from "./components/three-components/factory/createLimits";
import { createCurve } from "./components/three-components/factory/curve";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { createConveyorBelt } from "./components/three-components/factory/createConveyorBelt";
import { createTextIntro } from "./components/three-components/factory/text/intro";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { createTextMiddle } from "./components/three-components/factory/text/middle";
import { createTextFirstStanza } from "./components/three-components/factory/text/firstStanza";
import { createTextSecondStanza } from "./components/three-components/factory/text/secondStanza";
import { createTextThirdStanza } from "./components/three-components/factory/text/thirdStanza";
import { createTextFourthStanza } from "./components/three-components/factory/text/fourthStanza";
import { createTextFifthStanza } from "./components/three-components/factory/text/fifthStanza";
import { createTextSixthStanza } from "./components/three-components/factory/text/sixthStanza";
import { createPortal } from "./components/three-components/global/createPortal";
import { createSparks } from "./components/three-components/factory/createSparks";
import { createRobotArm } from "./components/three-components/factory/createRobotArm";

let camera, scene, renderer, container, curve, speed, pathTarget, fontLoader;
let controls, clock, mixer, _mixer, _mixerRobot, cameraRobot;
let mixers = [];
let _mixers = [];
let time = 0;

init();
animate();

function init() {
  container = document.getElementById("container2");
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    20,
    5000
  );
  camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  // camera.position.set(0, -20, -500);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  clock = new THREE.Clock();

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  //LIGHT
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, -3000);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xfa820d);
  pointLight.position.set(0, -20, -3000);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  //FOG
  const color = 0xffffff;
  const near = 10;
  const far = 650;
  scene.fog = new THREE.Fog(color, near, far);

  //ORIGIN
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //FONT
  fontLoader = new FontLoader();
  createTextIntro(scene, fontLoader);
  createTextMiddle(scene, fontLoader);
  createTextFirstStanza(scene, fontLoader);
  createTextSecondStanza(scene, fontLoader);
  createTextThirdStanza(scene, fontLoader);
  createTextFourthStanza(scene, fontLoader);
  createTextFifthStanza(scene, fontLoader);
  createTextSixthStanza(scene, fontLoader);

  createLimits(scene);
  createConveyorBelt(scene);
  // createPortal(scene, 0, -60, -3000, 0.1, 0x4c00f0);
  // sparks = createSparks(scene);

  curve = createCurve(scene);
  speed = 0.005;
  pathTarget = new THREE.Vector3(0, 0, -4000);

  // createRobotArm(scene);

  //load Robot Arm
  const loader = new GLTFLoader();
  loader.load(
    "/Models/AbstractModel/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(200, 0, -200);
      object.scale.set(0.05, 0.05, 0.05);
      // object.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
      object.castShadow = true;

      for (var i = 0; i < 15; i++) {
        const newModel = SkeletonUtils.clone(object);
        if (i % 2 == 0) {
          newModel.position.set(-200, 0, i * -200);
          newModel.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
          scene.add(newModel);
          mixer = new THREE.AnimationMixer(newModel);
          mixer.timeScale = Math.random() * 2 + 1;
          mixer.clipAction(gltf.animations[0]).play();
          mixers.push(mixer);
        } else {
          newModel.position.set(200, 0, i * -200);
          scene.add(newModel);
          mixer = new THREE.AnimationMixer(newModel);
          mixer.timeScale = Math.random() * 2 + 1;
          mixer.clipAction(gltf.animations[0]).play();
          mixers.push(mixer);
        }
      }
    },
    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    function (err) {
      console.log("An error happened");
    }
  );

  //FACTORY LINE
  loader.load(
    "/Models/FactoryLine/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(-175, -195, 0);
      object.scale.set(70, 70, 70);
      // object.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
      object.castShadow = true;
      scene.add(object);

      for (var i = 0; i < 11; i++) {
        const newModel = SkeletonUtils.clone(object);
        if (i % 2 == 0) {
          newModel.position.set(175, -195, i * -300);
          newModel.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
          scene.add(newModel);
          _mixer = new THREE.AnimationMixer(newModel);
          _mixer.timeScale = Math.random() * 2 + 1;
          _mixer.clipAction(gltf.animations[0]).play();
          _mixers.push(_mixer);
        } else {
          newModel.position.set(-175, -195, i * -300);
          scene.add(newModel);
          _mixer = new THREE.AnimationMixer(newModel);
          _mixer.timeScale = Math.random() * 2 + 1;
          _mixer.clipAction(gltf.animations[0]).play();
          _mixers.push(_mixer);
        }
      }
    },
    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    function (err) {
      console.log("An error happened");
    }
  );

  //INJURED ROBOT
  loader.load(
    "/Models/walkingRobot/scene.gltf",
    function (gltf) {
      cameraRobot = gltf.scene;
      // cameraRobot.position.set(0, -80, 0);
      // cameraRobot.scale.set(10, 10, 10);
      cameraRobot.scale.set(1.5, 1.5, 1.5);
      // object.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
      cameraRobot.castShadow = true;
      cameraRobot.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
      scene.add(cameraRobot);
      _mixerRobot = new THREE.AnimationMixer(cameraRobot);
      _mixerRobot.clipAction(gltf.animations[0]).play();
    },
    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    function (err) {
      console.log("An error happened");
    }
  );

  // Orbit Controls
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.dampingFactor = 0.05;
  // controls.screenSpacePanning = false;
  // controls.minDistance = 100;
  // controls.maxDistance = 500;
  // controls.maxPolarAngle = Math.PI / 2;
  //First Person Controls
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 0;
  controls.lookSpeed = 0.05;
  controls.verticalMax = (3 * Math.PI) / 4;
  controls.verticalMin = Math.PI / 4;
  controls.constrainVertical = true;
  // controls mouse look around
  controls.activeLook = false;
  controls.lookVertical = true;

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / 50);
  render();
}

function render() {
  // controls.update(delta);
  if (document.getElementById("container2").style.visibility == "visible") {
    const delta = clock.getDelta();
    time += delta * 1.0 * 0.5;
    // Allows camera to follow designed path
    curve.getPoint((clock.getElapsedTime() * speed) % 1.0, pathTarget);
    camera.position.copy(pathTarget);

    cameraRobot.position.copy( camera.position );
    cameraRobot.updateMatrix();
    cameraRobot.translateZ( -100 );
    cameraRobot.translateY( -10 );

    if (_mixerRobot) {
      _mixerRobot.update(delta);
    }
    // console.log("Scene Polycount:", renderer.info.render.triangles);
    // console.log("Active Drawcalls:", renderer.info.render.calls);
    // console.log("Textures in Memory", renderer.info.memory.textures);
    // console.log("Geometries in Memory", renderer.info.memory.geometries);

    mixers.forEach(function (mixer) {
      mixer.update(delta);
    });

    _mixers.forEach(function (_mixer) {
      _mixer.update(delta);
    });
    renderer.render(scene, camera);
  }
}

console.log("Scene Polycount:", renderer.info.render.triangles);
console.log("Active Drawcalls:", renderer.info.render.calls);
console.log("Textures in Memory", renderer.info.memory.textures);
console.log("Geometries in Memory", renderer.info.memory.geometries);
