import * as THREE from "three";

//PLANE
function createPlane(scene) {
  const geometryPlane = new THREE.PlaneGeometry(3, 1);
  const materialPlane = new THREE.MeshMatcapMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometryPlane, materialPlane);
  plane.scale.set(125, 125, 125);
  plane.position.set(0, 40, -300);
  plane.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
  scene.add(plane);
}

export { createPlane };
