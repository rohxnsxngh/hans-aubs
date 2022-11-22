import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function spaceBoi(scene) {
  //load Space Boi Logo
  const loader = new GLTFLoader();
  loader.load(
    "./spaceboi/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(0, 0, 0);
      object.scale.set(10, 10, 10);
      object.rotateOnAxis(new THREE.Vector3(0, 1, 0), -1*Math.PI/4);
      object.castShadow = true;
      scene.add(object);
    },
    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    function (err) {
      console.log("An error happened");
    }
  );
}

export { spaceBoi };