import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextMiddleSecond(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryMiddleSecond = new TextGeometry(
      "Since we're here let me tell you a little more about\nmyself. I am a mechanical engineer. My interest lie in robotics\nand mechatronics. However, I am content as long as I am creating.",
      {
        height: 2,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialMiddleSecond = new THREE.MeshBasicMaterial({ color: 0x2F4F4F});
    const textMeshMiddleSecond = new THREE.Mesh(textGeometryMiddleSecond, textMaterialMiddleSecond);
    textMeshMiddleSecond.position.set(-25, -20, -1000);
    textMeshMiddleSecond.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    scene.add(textMeshMiddleSecond);
    return textMeshMiddleSecond
  });
}

export { createTextMiddleSecond };
