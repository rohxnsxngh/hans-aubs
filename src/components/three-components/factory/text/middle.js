import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextMiddle(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryMiddle = new TextGeometry(
      "I’m a mechanical engineer with a knack for\nsoftware development! I’ll graduate from\nTexas A&M in 2023 with my B.S. in Mechanical\nEngineering and a minor in Computer Science.\nThank you for visiting my portfolio!\nI really hope you enjoy it as much as I enjoyed\nbuilding it. If you have any questions or comments,\nfeel free to contact me!",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialMiddle = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMeshMiddle = new THREE.Mesh(
      textGeometryMiddle,
      textMaterialMiddle
    );
    textMeshMiddle.position.set(50, 25, -500);
    textMeshMiddle.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshMiddle);
    return textMeshMiddle;
  });
  const geometry = new THREE.PlaneGeometry(145, 75);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-17, 0, -500);
  scene.add(plane);
}

export { createTextMiddle };
