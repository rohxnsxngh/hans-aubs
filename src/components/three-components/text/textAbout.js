import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextAbout(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryAbout = new TextGeometry("<About Me/>", {
      height: 5,
      size: 22,
      font: droidFont,
    });
    const textMaterialAbout = new THREE.MeshBasicMaterial({ color: 0xfa1d00 });
    const textMeshAbout = new THREE.Mesh(textGeometryAbout, textMaterialAbout);
    textMeshAbout.position.set(400, 120, 0);
    textMeshAbout.rotateOnAxis(new THREE.Vector3(0, 1, 0), -11 * Math.PI / 20);
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
      textMeshAboutCaption.position.set(400, 105, -15);
      textMeshAboutCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), -11 * Math.PI / 20);
      scene.add(textMeshAboutCaption);
      return textMeshAbout, textMeshAboutCaption;

  });
}

export { createTextAbout };
