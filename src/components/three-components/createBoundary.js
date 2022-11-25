import * as THREE from "three";

function createBoundary(scene) {
  const geometry = new THREE.TorusGeometry(600, 3, 20, 60);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0xfa1d00,
    shininess: 30,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  scene.add(torus);
  return torus;
}

export { createBoundary };
