import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextIntro(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryIntro = new TextGeometry(
      "You went through\nthe portal...didn't you?",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialIntro = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshIntro = new THREE.Mesh(textGeometryIntro, textMaterialIntro);
    textMeshIntro.position.set(-25, -20, -200);
    textMeshIntro.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshIntro);
    return textMeshIntro
  });
}

export { createTextIntro };
