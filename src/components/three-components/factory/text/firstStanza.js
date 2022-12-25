import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFirstStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFirstStanza = new TextGeometry(
      "There once was a robot who loved to tinker and build\nHe spent every moment in his workshop, his mind always filled\nWith ideas and plans for new and exciting creations\nHe poured his heart and soul into his work, without hesitation\n",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialFirstStanza = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshFirstStanza = new THREE.Mesh(textGeometryFirstStanza, textMaterialFirstStanza);
    textMeshFirstStanza.position.set(-25, -20, -900);
    textMeshFirstStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshFirstStanza);
    return textMeshFirstStanza
  });
}

export { createTextFirstStanza };
