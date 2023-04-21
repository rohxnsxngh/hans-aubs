import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFifthStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFifthStanza = new TextGeometry(
      "He never woke up again\nHis spark extinguished, his work undone\nHe was left alone in the cold and dark\nHis dreams and hopes forever gone\n",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialFifthStanza = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshFifthStanza = new THREE.Mesh(textGeometryFifthStanza, textMaterialFifthStanza);
    textMeshFifthStanza.position.set(25, 0, -2500);
    textMeshFifthStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshFifthStanza);
    return textMeshFifthStanza
  });
  const geometry = new THREE.PlaneGeometry(160, 75);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-17, 0, -2500);
  scene.add(plane);
}

export { createTextFifthStanza };
