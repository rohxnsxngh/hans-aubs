import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextExp(scene) {
  const fontExp = new FontLoader();
  fontExp.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryExp = new TextGeometry("<Experience/>", {
      height: 5,
      size: 18,
      font: droidFont,
    });
    const textMaterialExp = new THREE.MeshBasicMaterial({ color: 0xfa1d00 });
    const textMeshExp = new THREE.Mesh(textGeometryExp, textMaterialExp);
    textMeshExp.position.set(268.328, 80, 536.656);
    textMeshExp.rotateOnAxis(new THREE.Vector3(0, 1, 0), 20.5 * Math.PI / 4);
    scene.add(textMeshExp);
  });
}

export { createTextExp };
