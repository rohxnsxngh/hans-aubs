import * as THREE from "three";

//PLANE
function createPlane(scene) {
  const geometryPlane = new THREE.PlaneGeometry(4, 1);
  const materialPlane = new THREE.MeshMatcapMaterial({
    color: 0x5A5A5A,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometryPlane, materialPlane);
  plane.scale.set(100, 100, 100);
  plane.position.set(60, 40, -400);
  plane.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
  scene.add(plane);
}

export { createPlane };
