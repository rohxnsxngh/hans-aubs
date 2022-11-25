import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextAbout(scene) {
  const fontAbout = new FontLoader();
  fontAbout.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryAbout = new TextGeometry("<About Me/>", {
      height: 5,
      size: 18,
      font: droidFont,
    });
    const textMaterialAbout = new THREE.MeshBasicMaterial({ color: 0xfa1d00 });
    const textMeshAbout = new THREE.Mesh(textGeometryAbout, textMaterialAbout);
    textMeshAbout.position.set(480, 80, -360);
    textMeshAbout.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 3);
    scene.add(textMeshAbout);

    const textGeometryAboutCaption = new TextGeometry(
        "I’m a mechanical engineer with a knack for software\ndevelopment! I am passionate about Mechanical\nEngineering, Software Development, and Mechatronics.\nThank you for visiting my portfolio! I really hope you\nenjoy it as much as I enjoyed building it. If you have\nany questions or comments, feel free to contact me!",
        {
          height: 1,
          size: 6,
          font: droidFont,
        }
      );
      const textMaterialAboutCaption = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshAboutCaption = new THREE.Mesh(textGeometryAboutCaption, textMaterialAboutCaption);
      textMeshAboutCaption.position.set(480, 70, -360);
      textMeshAboutCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 3);
      scene.add(textMeshAboutCaption);
      return textMeshAbout, textMeshAboutCaption;

  });
}

export { createTextAbout };
