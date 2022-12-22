import * as THREE from "three";

function disposeWorld(scene) {
  for (let i = 0; i < scene.children.length; i++) {
    if (
      scene.children[i].isMesh ||
      scene.children[i].isPoints ||
      scene.children[i].isLine
    ) {
      if (scene.children[i].geometry) scene.children[i].geometry.dispose();
      if (scene.children[i].texture) scene.children[i].texture.dispose();
      if (scene.children[i].material.map)
        scene.children[i].material.map.dispose();
      if (scene.children[i].material.lightMap)
        scene.children[i].material.lightMap.dispose();
      if (scene.children[i].material.bumpMap)
        scene.children[i].material.bumpMap.dispose();
      if (scene.children[i].material.normalMap)
        scene.children[i].material.normalMap.dispose();
      if (scene.children[i].material.specularMap)
        scene.children[i].material.specularMap.dispose();
      if (scene.children[i].material.envMap)
        scene.children[i].material.envMap.dispose();
      if (scene.children[i].material.alphaMap)
        scene.children[i].material.alphaMap.dispose();
      if (scene.children[i].material.aoMap)
        scene.children[i].material.aoMap.dispose();
      if (scene.children[i].material.displacementMap)
        scene.children[i].material.displacementMap.dispose();
      if (scene.children[i].material.emissiveMap)
        scene.children[i].material.emissiveMap.dispose();
      if (scene.children[i].material.gradientMap)
        scene.children[i].material.gradientMap.dispose();
      if (scene.children[i].material.metalnessMap)
        scene.children[i].material.metalnessMap.dispose();
      if (scene.children[i].material.roughnessMap)
        scene.children[i].material.roughnessMap.dispose();

      scene.remove(scene.children[i]);
    } else {
      if (scene.children[i].map) scene.children[i].map.dispose();
      if (scene.children[i].lightMap) scene.children[i].lightMap.dispose();
      if (scene.children[i].bumpMap) scene.children[i].bumpMap.dispose();
      if (scene.children[i].normalMap) scene.children[i].normalMap.dispose();
      if (scene.children[i].specularMap)
        scene.children[i].specularMap.dispose();
      if (scene.children[i].envMap) scene.children[i].envMap.dispose();
      if (scene.children[i].alphaMap) scene.children[i].alphaMap.dispose();
      if (scene.children[i].aoMap) scene.children[i].aoMap.dispose();
      if (scene.children[i].displacementMap)
        scene.children[i].displacementMap.dispose();
      if (scene.children[i].emissiveMap)
        scene.children[i].emissiveMap.dispose();
      if (scene.children[i].gradientMap)
        scene.children[i].gradientMap.dispose();
      if (scene.children[i].metalnessMap)
        scene.children[i].metalnessMap.dispose();
      if (scene.children[i].roughnessMap)
        scene.children[i].roughnessMap.dispose();
    }
  }
  return scene
}

export {disposeWorld}
