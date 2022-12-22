import * as THREE from "three";

function createSphere(scene) {
  const geometry = new THREE.SphereGeometry(15, 32, 16);
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x008080 })
  );
  //   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  //   const sphere = new THREE.Mesh(geometry, material);
  line.position.set(-500, 80, 0)
  line.geometry.verticesNeedUpdate = true;
  scene.add(line);
  return line;
}

export { createSphere };
