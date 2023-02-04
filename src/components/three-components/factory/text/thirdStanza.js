import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextThirdStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryThirdStanza = new TextGeometry(
      "When I'm not working on software or mechanical engineering projects, I enjoy engaging in a variety of hobbies that allow me to tap into my creative side and stay active. I have a passion for playing sports and staying physically fit, whether it's through a pickup game of basketball, a challenging hike, or a round of golf. These activities not only keep me in shape but also provide a welcome break from the screen and allow me to connect with friends and nature.",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialThirdStanza = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshThirdStanza = new THREE.Mesh(textGeometryThirdStanza, textMaterialThirdStanza);
    textMeshThirdStanza.position.set(50, 25, -1700);
    textMeshThirdStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshThirdStanza);
    return textMeshThirdStanza
  });
}

export { createTextThirdStanza };
