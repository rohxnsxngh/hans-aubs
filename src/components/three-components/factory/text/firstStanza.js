import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextFirstStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryFirstStanza = new TextGeometry(
      "With a diverse background in software engineering\nand mechanical engineering, I bring a unique skill\nset to the table. My experiences include a software\nengineering internship at Tesla, where I had the\nopportunity to work on cutting-edge software projects\nfor electric vehicles. This experience not only\nallowed me to further develop my software skills\nbut also gave me a deep understanding of the intersection\nbetween software and hardware. I also had the\nopportunity to work on a community-driven project,\nRiverProject.io, where I was able to apply my software\nengineering skills to develop a web-based platform\nto help promote an online community of learners\nand educators.",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialFirstStanza = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    const textMeshFirstStanza = new THREE.Mesh(
      textGeometryFirstStanza,
      textMaterialFirstStanza
    );
    textMeshFirstStanza.position.set(50, 45, -900);
    textMeshFirstStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshFirstStanza);
    return textMeshFirstStanza;
  });
}

export { createTextFirstStanza };
