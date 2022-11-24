import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createText(scene) {
    const fontLoaderExp = new FontLoader();
    fontLoaderExp.load(
      "./node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
      (droidFont) => {
        const textGeometryHome = new TextGeometry(
          "What if web design could be better...\n     What if it could be infinite...",
          {
            height: 3,
            size: 8,
            font: droidFont,
          }
        );
        const textMaterialHome = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMeshHome = new THREE.Mesh(textGeometryHome, textMaterialHome);
        textMeshHome.position.set(60, 40, -400);
        textMeshHome.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
        scene.add(textMeshHome);
      }
    );
}

export { createText };