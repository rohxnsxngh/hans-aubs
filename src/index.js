import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, container;
let mesh, controls, clock, directionalLight, portalParticles;
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
  // camera.rotateOnAxis(new THREE.Vector3(0, 0, 0), 0);
  camera.position.set(0, 0, 1000);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  clock = new THREE.Clock();

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  const geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);

  //
  controls = new OrbitControls(camera, renderer.domElement);
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  // controls.minDistance = 100;
  // controls.maxDistance = 10000;
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

  controls.update(delta);
  if (document.getElementById("container2").style.visibility == "visible") {
    renderer.render(scene, camera);
  }
}

console.log("Scene Polycount:", renderer.info.render.triangles);
console.log("Active Drawcalls:", renderer.info.render.calls);
console.log("Textures in Memory", renderer.info.memory.textures);
console.log("Geometries in Memory", renderer.info.memory.geometries);
