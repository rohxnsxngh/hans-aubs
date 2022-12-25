import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFifthStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFifthStanza = new TextGeometry(
      "He never woke up again\nHis spark extinguished, his work undone\nHe was left alone in the cold and dark\nHis dreams and hopes forever gone\n",
      {
        height: 1,
        size: 2,
        font: droidFont,
      }
    );
    const textMaterialFifthStanza = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshFifthStanza = new THREE.Mesh(textGeometryFifthStanza, textMaterialFifthStanza);
    textMeshFifthStanza.position.set(-25, -20, -2500);
    textMeshFifthStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshFifthStanza);
    return textMeshFifthStanza
  });
}

export { createTextFifthStanza };