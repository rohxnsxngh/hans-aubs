import * as THREE from "three";

function createAMCube(scene) {
  const texture = new THREE.TextureLoader().load("/A&M.png");
  const geometry = new THREE.BoxGeometry(25, 25, 25);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-136, 30, 584.383);
  scene.add(mesh);
  return mesh;
}

export { createAMCube };
