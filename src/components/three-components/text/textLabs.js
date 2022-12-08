import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextLab(scene, fontLoader) {
    fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryLab = new TextGeometry("The Lab", {
      height: 8,
      size: 22,
      font: droidFont,
    });
    const textMaterialLab = new THREE.MeshBasicMaterial({ color: 0x5600F5 });
    const textMeshLab = new THREE.Mesh(textGeometryLab, textMaterialLab);
    textMeshLab.position.set(-500, 130, 100);
    textMeshLab.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    scene.add(textMeshLab);
    return textMeshLab
  });
}

export { createTextLab };