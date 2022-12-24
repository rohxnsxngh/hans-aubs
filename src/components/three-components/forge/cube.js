import * as THREE from "three";

function createCube(scene) {
  // CUBE
  const color = new THREE.Color();
  const amount = parseInt(window.location.search.slice(1)) || 5;
  const count = Math.pow(amount, 3);
  const geometryCube = new THREE.IcosahedronGeometry(0.5, 3);
  const materialCube = new THREE.MeshPhongMaterial({
    color: 0x5700E6,
    emissive: 0x000000,
    specular: 0xffffff,
    shininess: 30,
  });

  const meshCube = new THREE.InstancedMesh(geometryCube, materialCube, count);

  let i = 0;
  const offset = (amount - 1) / 2;

  const matrix = new THREE.Matrix4();

  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      for (let z = 0; z < amount; z++) {
        matrix.setPosition(offset - x, offset - y, offset - z);

        meshCube.setMatrixAt(i, matrix);
        meshCube.setColorAt(i, color.setHex(Math.random() * 0xffffff));

        i++;
      }
    }
  }
  meshCube.scale.set(15, 15, 15);
  meshCube.position.set(-1000, 100, 200);
  scene.add(meshCube);
  return meshCube;
}

export { createCube };
