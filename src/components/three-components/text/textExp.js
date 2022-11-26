import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextExp(scene, fontLoader) {
  let textMeshExp
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryExp = new TextGeometry("<Experience/>", {
      height: 5,
      size: 22,
      font: droidFont,
    });
    const textMaterialExp = new THREE.MeshBasicMaterial({ color: 0xfa1d00 });
    const textMeshExp = new THREE.Mesh(textGeometryExp, textMaterialExp);
    textMeshExp.position.set(0, 120, 300);
    textMeshExp.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.95 * Math.PI);
    scene.add(textMeshExp);

    const textGeometryExpCaption = new TextGeometry(
      "For more information please visit my\nportfolio website located in the menu",
      {
        height: 1,
        size: 6,
        font: droidFont,
      }
    );
    const textMaterialExpCaption = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const textMeshExpCaption = new THREE.Mesh(
      textGeometryExpCaption,
      textMaterialExpCaption
    );
    textMeshExpCaption.position.set(0, 105, 300);
    textMeshExpCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.95 * Math.PI);
    scene.add(textMeshExpCaption);
  });
}

export { createTextExp };
