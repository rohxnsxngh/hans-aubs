import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextHome(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryHome = new TextGeometry(
      "Rohan Singh",
      {
        height: 5,
        size: 22,
        font: droidFont,
      }
    );
    const textGeometryHomeCaption = new TextGeometry(
      "Welcome to the Forge. This is my slice of reality, an alternate\ndimension where anything is possible. There are no rules here\nso feel free to explore this infinite plane. However, I have one\nrequest, please be careful when exploring the lab. Some specimen\nare unstable and have unknown effects.",
      {
        height: 1,
        size: 6,
        font: droidFont,
      }
    );
    const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0x5600F5});
    const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
    textMeshHome.position.set(-100, 150, -400);
    textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshHome);

    const textMaterialHomeCaption = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMeshHomeCaption = new THREE.Mesh(textGeometryHomeCaption, textMaterialHomeCaption);
    textMeshHomeCaption.position.set(-100, 135, -400);
    textMeshHomeCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshHomeCaption);
    return textMeshHome ,textMeshHomeCaption
  });
}

export { createTextHome };
