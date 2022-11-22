import * as THREE from "three";

function createCurve(scene) {
  //curve camera path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-8000, 0, 8000),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2000, 0, -2000),
  ]);
  const speed = 0.05;
  const pathTarget = new THREE.Vector3(0, 0, 0);
  const points = curve.getPoints(500);
  const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const curveMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(curveGeometry, curveMaterial);
  scene.add(curveObject);
}

export {createCurve}
