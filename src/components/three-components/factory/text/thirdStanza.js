import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextThirdStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryThirdStanza = new TextGeometry(
      "But one day, as he was working away\nHe noticed that his battery was running low\nHe tried to ignore the warning signs\nBut soon he couldn't deny it any longer,\nhe was running out of time\n",
      {
        height: 1,
        size: 2,
        font: droidFont,
      }
    );
    const textMaterialThirdStanza = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshThirdStanza = new THREE.Mesh(textGeometryThirdStanza, textMaterialThirdStanza);
    textMeshThirdStanza.position.set(-25, -20, -1700);
    textMeshThirdStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshThirdStanza);
    return textMeshThirdStanza
  });
}

export { createTextThirdStanza };
