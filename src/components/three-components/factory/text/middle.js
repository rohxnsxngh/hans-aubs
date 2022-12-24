import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextMiddle(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryMiddle = new TextGeometry(
      "Well...Welcome\nto the Factory.",
      {
        height: 2,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialMiddle = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshMiddle = new THREE.Mesh(textGeometryMiddle, textMaterialMiddle);
    textMeshMiddle.position.set(-25, -20, -600);
    textMeshMiddle.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshMiddle);
    return textMeshMiddle
  });
}

export { createTextMiddle };
