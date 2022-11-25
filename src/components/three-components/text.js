import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createText(scene) {
  const fontLoaderExp = new FontLoader();
  fontLoaderExp.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryHome = new TextGeometry(
      "What if web design could be better...\n     What if it could be infinite...\n          Take a look around...",
      {
        height: 3,
        size: 10,
        font: droidFont,
      }
    );
    const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
    textMeshHome.position.set(-50, 40, -300);
    textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshHome);
  });
}

export { createText };
