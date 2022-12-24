import * as THREE from "three";

function createCurve(scene) {
  //curve camera path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -60, -500),
    new THREE.Vector3(0, -60, 0),
    new THREE.Vector3(0, -60, -1000),
    new THREE.Vector3(0, -60, -3000),
  ]);
  // const speed = 0.05;
  // const pathTarget = new THREE.Vector3(0, 0, 0);
  const points = curve.getPoints(500);
  const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const curveMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(curveGeometry, curveMaterial);
  scene.add(curveObject);
  return curve
}

export {createCurve}
