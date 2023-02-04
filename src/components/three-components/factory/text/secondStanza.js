import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextSecondStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometrySecondStanza = new TextGeometry(
      "With a diverse background in software engineering and mechanical engineering, I bring a unique skill set to the table. My experiences include a software engineering internship at Tesla, where I had the opportunity to work on cutting-edge software projects for electric vehicles. This experience not only allowed me to further develop my software skills but also gave me a deep understanding of the intersection between software and hardware. I also had the opportunity to work on a community-driven project, RiverProject.io, where I was able to apply my software engineering skills to develop a web-based platform to help promote an online community of learners and educators. Additionally, as the mechanical subteam lead for the Texas A&M Robotics organization, I had the opportunity to lead a team of engineers in the design and fabrication of various mechanical components, which further honed my skills in mechanical engineering. These experiences have allowed me to bring a unique perspective to any project and find creative solutions that bridge the gap between software and hardware.",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialSecondStanza = new THREE.MeshBasicMaterial({ color: 0x000000});
    const textMeshSecondStanza = new THREE.Mesh(textGeometrySecondStanza, textMaterialSecondStanza);
    textMeshSecondStanza.position.set(25, 0, -1300);
    textMeshSecondStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshSecondStanza);
    return textMeshSecondStanza
  });
}

export { createTextSecondStanza };
