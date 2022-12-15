import * as THREE from "three";

function createPortal(scene) {
  const geometry = new THREE.CircleGeometry(5, 32, 0, Math.PI);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(0, 0, -500);
  circle.scale.set(10,10,10)
  scene.add(circle);
  return circle;
}

export { createPortal };
