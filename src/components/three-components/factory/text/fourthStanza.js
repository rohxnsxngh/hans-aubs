import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFourthStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFourthStanza = new TextGeometry(
      "He worked as fast as he could\nBut it was too late, his battery died\nHe collapsed to the floor, his work unfinished\nAs the darkness closed in, he closed his eyes\n",
      {
        height: 1,
        size: 2,
        font: droidFont,
      }
    );
    const textMaterialFourthStanza = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshFourthStanza = new THREE.Mesh(textGeometryFourthStanza, textMaterialFourthStanza);
    textMeshFourthStanza.position.set(-25, -20, -2100);
    textMeshFourthStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshFourthStanza);
    return textMeshFourthStanza
  });
}

export { createTextFourthStanza };