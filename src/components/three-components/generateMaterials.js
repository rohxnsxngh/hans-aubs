import * as THREE from "three";

function generateMaterials() {
  const materials = {
    matte: new THREE.MeshPhongMaterial({ specular: 0x111111, shininess: 1 }),
    colors: new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 2,
      vertexColors: true,
    }),
  };
  return materials;
}

export { generateMaterials };
