import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextHome(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryHome = new TextGeometry(
      "<Rohan Singh/>",
      {
        height: 5,
        size: 22,
        font: droidFont,
      }
    );
    const textGeometryHomeCaption = new TextGeometry(
      "Welcome to the Forge. This is my slice of reality, an alternate\ndimension where anything is possible. There are no rules here\nso feel free to explore this infinite plane. I have one request, please\nstay inside the boundary. If you leave the boundary you will\nenter the void where I cannot guarantee your safety.",
      {
        height: 1,
        size: 6,
        font: droidFont,
      }
    );
    const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xFA1D00 });
    const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
    textMeshHome.position.set(-100, 120, -300);
    textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshHome);

    const textMaterialHomeCaption = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMeshHomeCaption = new THREE.Mesh(textGeometryHomeCaption, textMaterialHomeCaption);
    textMeshHomeCaption.position.set(-100, 105, -300);
    textMeshHomeCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshHomeCaption);
    return textMeshHome ,textMeshHomeCaption
  });
}

export { createTextHome };
