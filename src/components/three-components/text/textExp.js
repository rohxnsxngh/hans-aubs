import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextExp(scene, fontLoader) {
  let textMeshExp
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryExp = new TextGeometry("Creator", {
      height: 5,
      size: 22,
      font: droidFont,
    });
    const textMaterialExp = new THREE.MeshBasicMaterial({ color: 0xDB10E6 });
    const textMeshExp = new THREE.Mesh(textGeometryExp, textMaterialExp);
    textMeshExp.position.set(50, 150, 500);
    textMeshExp.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshExp);

    const textGeometryExpCaption = new TextGeometry(
      "I am Rohan Singh. I'm a mechanical engineer with\na passion for software development. My ultimate goal\nis to find the intersection between creative design,\nartistic expression, mechanical engineering, and\nsoftware development... and then I want to live\nin that world forever.",
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
    textMeshExpCaption.position.set(50, 135, 500);
    textMeshExpCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshExpCaption);
  });
}

export { createTextExp };
