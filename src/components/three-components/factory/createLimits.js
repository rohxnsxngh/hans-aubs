import * as THREE from "three";

function createLimits(scene) {
  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0x2F4F4F,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  plane.position.set(0, 85, 0)
  plane.scale.set(100, 100, 100)
  const planeFloor = plane.clone()
  planeFloor.position.set(0, -200, 0)
  scene.add(plane);
  scene.add(planeFloor)
}

export { createLimits };
