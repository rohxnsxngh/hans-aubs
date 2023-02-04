import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFourthStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFourthStanza = new TextGeometry(
      "In addition to sports, I also have a love for creating art. Whether it's painting, sketching, or sculpting, I find art to be a wonderful form of self-expression and a way to unleash my creativity. I enjoy exploring new mediums and techniques, and I find that the process of creating something from scratch is incredibly rewarding.",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialFourthStanza = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshFourthStanza = new THREE.Mesh(textGeometryFourthStanza, textMaterialFourthStanza);
    textMeshFourthStanza.position.set(50, 25, -2100);
    textMeshFourthStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshFourthStanza);
    return textMeshFourthStanza
  });
}

export { createTextFourthStanza };
