import * as THREE from "three";

function createTeslaCube(scene) {
  const texture = new THREE.TextureLoader().load("/Tesla.png");
  const geometry = new THREE.BoxGeometry(25, 25, 25);
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    color: 0xffffff,
    emissive: 0xD90700,
    shininess: 15,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 30, 600);
  scene.add(mesh);
  return mesh
}

export { createTeslaCube };
