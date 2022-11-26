import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextLab(scene, fontLoader) {
    fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryLab = new TextGeometry("<The Forge/>", {
      height: 8,
      size: 26,
      font: droidFont,
    });
    const textMaterialLab = new THREE.MeshBasicMaterial({ color: 0xfa1d00 });
    const textMeshLab = new THREE.Mesh(textGeometryLab, textMaterialLab);
    textMeshLab.position.set(-500, 150, 0);
    textMeshLab.rotateOnAxis(new THREE.Vector3(0, 1, 0), -9.5 * Math.PI / 6);
    scene.add(textMeshLab);
    return textMeshLab
  });
}

export { createTextLab };