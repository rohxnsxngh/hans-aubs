import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextSecondStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometrySecondStanza = new TextGeometry(
      "He built all sorts of machines and gadgets\nEach one more intricate and complex than the last\nHe was a true master of his craft\nA genius of mechanical art\n",
      {
        height: 1,
        size: 2,
        font: droidFont,
      }
    );
    const textMaterialSecondStanza = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshSecondStanza = new THREE.Mesh(textGeometrySecondStanza, textMaterialSecondStanza);
    textMeshSecondStanza.position.set(-25, -20, -1300);
    textMeshSecondStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshSecondStanza);
    return textMeshSecondStanza
  });
}

export { createTextSecondStanza };
