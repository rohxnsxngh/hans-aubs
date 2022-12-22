import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function createAbstract(scene) {
  //load Red Background
  const loader = new GLTFLoader();
  loader.load(
    "/Models/AbstractModel/scene.gltf",
    function (gltf) {
      const object = gltf.scene;
      object.position.set(0, 0, 0);
      // object.scale.set(10, 10, 10);
    //   object.rotateOnAxis(new THREE.Vector3(0, 1, 0), (Math.PI) / 2);
    //   object.castShadow = true;
      scene.add(object);


      // mixer = new THREE.AnimationMixer( object );
      // mixer.clipAction( gltf.animations[ 0 ] ).play();

      // animate();

      // for (var i = 0; i < 5; i++) {
      //   const newModel = object.clone();
      //   const x = 100 * Math.random() - 10;
      //   const y = 100 * Math.random() - 10;
      //   const z = 100 * Math.random() - 10;
      //   newModel.position.set(x, y, z);
      //   scene.add(newModel);
      // }
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

export { createAbstract };
