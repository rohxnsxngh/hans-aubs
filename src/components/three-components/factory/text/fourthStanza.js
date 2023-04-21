import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFourthStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFourthStanza = new TextGeometry(
      "In addition to sports, I also have a love \nfor creating art. Whether it's painting, sketching, \nor computer aided design, I find art to be \na wonderful form of self-expression and a way \nto unleash my creativity. I enjoy exploring new \nmediums and techniques, and I find that the \nprocess of creating something from scratch \nis incredibly rewarding.",
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
  const geometry = new THREE.PlaneGeometry(160, 75);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-17, 0, -2100);
  scene.add(plane);
}

export { createTextFourthStanza };
