import * as THREE from "three";

function generateMaterials() {
  const materials = {
    matte: new THREE.MeshPhongMaterial({ specular: 0xE60C00, shininess: 10, color: 0xffffff, emissive: 0x000000 }),
  };
  return materials;
}

export { generateMaterials };
