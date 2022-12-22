import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createLimits } from "./components/three-components/factory/createLimits";
import { createCurve } from "./components/three-components/forge/curve";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { createRobotArm } from "./components/three-components/factory/createRobotArm";

let camera, scene, renderer, container, curve, speed, pathTarget;
let controls, clock, mixer;
let mixers = [];
let time = 0;

init();
animate();

function init() {
  container = document.getElementById("container2");
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  // camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  camera.position.set(0, -20, 0);

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
  container.appendChild(renderer.domElement);

  //LIGHT
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  //FOG
  const color = 0x000000;
  const near = 10;
  const far = 1000;
  scene.fog = new THREE.Fog(color, near, far);

  //ORIGIN
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  createLimits(scene);

  curve = createCurve(scene);
  // speed = 0.01;
  // pathTarget = new THREE.Vector3(0, 0, -4000);

  // mixer = createRobotArm(scene);

  //load Robot Arm
  const loader = new GLTFLoader();
  loader.load(
    "/Models/AbstractModel/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(150, 0, -200);
      object.scale.set(0.05, 0.05, 0.05);
      // object.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
      object.castShadow = true;

      for (var i = 0; i < 5; i++) {
        const newModel = SkeletonUtils.clone(object);
        if (i % 2 == 0) {
          newModel.position.set(-150, 0, i * -200);
          newModel.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
          scene.add(newModel);
          mixer = new THREE.AnimationMixer(newModel);
          mixer.clipAction(gltf.animations[0]).play();
          mixers.push(mixer);
        } else {
          newModel.position.set(150, 0, i * -200);
          scene.add(newModel);
          mixer = new THREE.AnimationMixer(newModel);
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

  // Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = true;
  controls.minDistance = -10000;
  controls.maxDistance = 10000;
  controls.maxPolarAngle = Math.PI / 2;

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
  const delta = clock.getDelta();
  time += delta * 1.0 * 0.5;
  // Allows camera to follow designed path
  // curve.getPoint((clock.getElapsedTime() * speed) % 1.0, pathTarget);
  // camera.position.copy(pathTarget);

  // if (mixer) {
  //   mixer.update(delta);
  // }
  mixers.forEach(function (mixer) {
    mixer.update(delta);
  });

  controls.update(delta);
  if (document.getElementById("container2").style.visibility == "visible") {
    renderer.render(scene, camera);
  }
}

console.log("Scene Polycount:", renderer.info.render.triangles);
console.log("Active Drawcalls:", renderer.info.render.calls);
console.log("Textures in Memory", renderer.info.memory.textures);
console.log("Geometries in Memory", renderer.info.memory.geometries);
