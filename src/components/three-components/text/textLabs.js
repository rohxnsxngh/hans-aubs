import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextLab(scene, fontLoader) {
    fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryLab = new TextGeometry("<The Lab/>", {
      height: 5,
      size: 18,
      font: droidFont,
    });
    const textMaterialLab = new THREE.MeshBasicMaterial({ color: 0xfa1d00 });
    const textMeshLab = new THREE.Mesh(textGeometryLab, textMaterialLab);
    textMeshLab.position.set(-600, 80, 0);
    textMeshLab.rotateOnAxis(new THREE.Vector3(0, 1, 0), -3 * Math.PI / 2);
    scene.add(textMeshLab);
    return textMeshLab
  });
}

export { createTextLab };