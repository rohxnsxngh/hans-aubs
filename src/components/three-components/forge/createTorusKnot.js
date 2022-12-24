import * as THREE from "three";

function createTorusKnot(scene) {
  const geometry = new THREE.TorusKnotGeometry(0.5, 0.25, 77, 8, 20, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x000000, //change color
    specular: 0xEB00D5,
    shininess: 15,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.scale.set(50, 50, 50);
  torusKnot.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  torusKnot.position.set(-500, 100, -300);
  scene.add(torusKnot);
  return torusKnot
}

export { createTorusKnot };
