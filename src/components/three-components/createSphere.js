import * as THREE from "three";

function createSphere(scene) {
  const geometry = new THREE.SphereGeometry(15, 32, 16);
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
//   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
//   const sphere = new THREE.Mesh(geometry, material);
  line.position.set(-100, 20, -300);
  scene.add(line);
  return line;
}

export { createSphere };
