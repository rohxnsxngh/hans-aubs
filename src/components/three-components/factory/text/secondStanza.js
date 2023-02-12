import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextSecondStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometrySecondStanza = new TextGeometry(
      "Additionally, as the mechanical subteam lead for the\nTexas A&M Robotics organization, I had the opportunity\nto lead a team of engineers in the design and fabrication\nof various mechanical components, which further honed my\nskills in mechanical engineering. These experiences have\nallowed me to bring a unique perspective to any project\nand find creative solutions that bridge the gap between\nsoftware and hardware.",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialSecondStanza = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshSecondStanza = new THREE.Mesh(textGeometrySecondStanza, textMaterialSecondStanza);
    textMeshSecondStanza.position.set(50, 25, -1300);
    textMeshSecondStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshSecondStanza);
    return textMeshSecondStanza
  });
  const geometry = new THREE.PlaneGeometry(160, 75);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-17, 0, -1300);
  scene.add(plane);
}

export { createTextSecondStanza };
