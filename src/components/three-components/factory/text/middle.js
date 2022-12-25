import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextMiddle(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryMiddle = new TextGeometry(
      "Well...Welcome to the Factory.\nThis is where the magic is made.\nLet me tell you a little story",
      {
        height: 1,
        size: 2,
        font: droidFont,
      }
    );
    const textMaterialMiddle = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshMiddle = new THREE.Mesh(textGeometryMiddle, textMaterialMiddle);
    textMeshMiddle.position.set(-25, -20, -500);
    textMeshMiddle.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshMiddle);
    return textMeshMiddle
  });
}

export { createTextMiddle };
