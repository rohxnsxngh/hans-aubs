import * as THREE from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

function createRectLight(scene) {
  RectAreaLightUniformsLib.init();
  const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 5);
  rectLight1.position.set(-500, 20, 50);
  rectLight1.rotateOnAxis(new THREE.Vector3(0, 1, 0), 9.5 * Math.PI / 6);
  scene.add(rectLight1);
  scene.add(new RectAreaLightHelper(rectLight1));

  let mesh;

  for (let i = 0; i < 40; i++) {
    mesh = rectLight1.clone();
    mesh.position.set(-500, 20, 50 - [i * 3]);
    mesh.color.setRGB(220 - (i * 8), 9 + (i * 4), 9 + (2 * i), 1);
    scene.add(mesh);
    scene.add(new RectAreaLightHelper(mesh));
  }
}

export { createRectLight };
