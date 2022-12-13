import * as THREE from "three";

function createCapsule(scene) {
  const geometry = new THREE.TorusGeometry(40, 5, 16, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0x1B00FF,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  torus.position.set(-500, 0, 0);
  scene.add(torus);

  const geometryBoundary = new THREE.TorusGeometry(60, 5, 16, 100);
  const torusBoundary = new THREE.Mesh(geometryBoundary, material);
  torusBoundary.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  torusBoundary.position.set(-800, 0, -300);
  scene.add(torusBoundary);

}

export { createCapsule };
