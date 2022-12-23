import * as THREE from "three";

function createConveyorBelt(scene) {
  const geometry = new THREE.BoxGeometry(40, 10, 4000);
  const texture = new THREE.TextureLoader().load("/conveyor.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const material = new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    map: texture,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, -90, -1000);
  scene.add(cube);
}

export { createConveyorBelt };
