import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextThirdStanza(scene, fontLoader) {
  fontLoader.load("/Fonts/Droid_Serif_Regular.json", (droidFont) => {
    const textGeometryThirdStanza = new TextGeometry(
      "When I'm not working on software or \nmechanical engineering projects, I enjoy \nengaging in a variety of hobbies that allow me \nto tap into my creative side and stay active. I have \na passion for playing sports and staying physically\nfit, whether it's through a pickup game of basketball,\na challenging hike, or some mountain biking. \nThese activities not only keep me in shape but also provide a welcome\nbreak from the screen and allow me to connect\nwith friends and nature.",
      {
        height: 1,
        size: 4,
        font: droidFont,
      }
    );
    const textMaterialThirdStanza = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    const textMeshThirdStanza = new THREE.Mesh(
      textGeometryThirdStanza,
      textMaterialThirdStanza
    );
    textMeshThirdStanza.position.set(50, 25, -1700);
    textMeshThirdStanza.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    scene.add(textMeshThirdStanza);
    return textMeshThirdStanza;
  });
  const geometry = new THREE.PlaneGeometry(160, 75);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(-17, 0, -1300);
  scene.add(plane);
}

export { createTextThirdStanza };
