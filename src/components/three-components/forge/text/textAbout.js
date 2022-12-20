import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextAbout(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryAbout = new TextGeometry("Forge", {
      height: 5,
      size: 22,
      font: droidFont,
    });
    const textMaterialAbout = new THREE.MeshBasicMaterial({ color: 0x5600F5 });
    const textMeshAbout = new THREE.Mesh(textGeometryAbout, textMaterialAbout);
    textMeshAbout.position.set(500, 150, -50);
    textMeshAbout.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    scene.add(textMeshAbout);

    const textGeometryAboutCaption = new TextGeometry(
        "The forge was designed with the intention of creating\na space that allows for experimentation with music,\naudio visualizers, shaders, and WebGL. The forge is\ninfinite in all directions and limited by only the \nimagination. Thank you for visiting this reality. I hope\nyou enjoy it has much as I enjoyed building it",
        {
          height: 1,
          size: 6,
          font: droidFont,
        }
      );
      const textMaterialAboutCaption = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMeshAboutCaption = new THREE.Mesh(textGeometryAboutCaption, textMaterialAboutCaption);
      textMeshAboutCaption.position.set(500, 135, -50);
      textMeshAboutCaption.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
      scene.add(textMeshAboutCaption);
      return textMeshAbout, textMeshAboutCaption;

  });
}

export { createTextAbout };
