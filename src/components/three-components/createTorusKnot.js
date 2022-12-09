import * as THREE from "three";

function createTorusKnot(scene) {
  const geometry = new THREE.TorusKnotGeometry(0.5, 0.25, 77, 8, 20, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x4e00ff, //change color
    specular: 0xffffff,
    shininess: 15,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.scale.set(50, 50, 50);
  torusKnot.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  torusKnot.position.set(-500, 80, -50);
  scene.add(torusKnot);
  return torusKnot
}

export { createTorusKnot };
