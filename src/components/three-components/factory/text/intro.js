import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextIntro(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryIntro = new TextGeometry(
      "Welcome to the Factory!\nLet me tell you a little about me",
      {
        height: 1,
        size: 6,
        font: droidFont,
      }
    );
    const textMaterialIntro = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshIntro = new THREE.Mesh(textGeometryIntro, textMaterialIntro);
    textMeshIntro.position.set(50, 30, -200);
    textMeshIntro.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshIntro);
    return textMeshIntro
  });
  const geometry = new THREE.PlaneGeometry(155, 25);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-10, 27, -200);
  scene.add(plane);
}

export { createTextIntro };
