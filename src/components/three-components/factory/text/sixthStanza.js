import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextSixthStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometrySixthStanza = new TextGeometry(
      "No one knew what had happened to him\nHe was just another missing robot in the end\nHis workshop was left abandoned and forgotten\nHis legacy lost, his spirit dead.\n",
      {
        height: 1,
        size: 2,
        font: droidFont,
      }
    );
    const textMaterialSixthStanza = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshSixthStanza = new THREE.Mesh(textGeometrySixthStanza, textMaterialSixthStanza);
    textMeshSixthStanza.position.set(-25, -20, -2900);
    textMeshSixthStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshSixthStanza);
    return textMeshSixthStanza
  });
}

export { createTextSixthStanza };