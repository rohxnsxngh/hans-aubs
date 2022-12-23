import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let mixer;
function createRobotArm(scene) {
  //load Red Background
  const loader = new GLTFLoader();
  loader.load(
    "/Models/AbstractModel/scene.gltf",
    (gltf) => {
      const object = gltf.scene;
      object.position.set(0, 0, 0);
      object.scale.set(0.1, 0.1, 0.1);
    //   object.rotateOnAxis(new THREE.Vector3(0, 1, 0), (Math.PI) / 2);
    //   object.castShadow = true;
      scene.add(object);


      mixer = new THREE.AnimationMixer( object );
      mixer.clipAction( gltf.animations[ 0 ] ).play();

      // animate();

      // for (var i = 0; i < 5; i++) {
      //   const newModel = SkeletonUtils.clone(object)
      //   const x = 100 * Math.random() - 10;
      //   const y = 100 * Math.random() - 10;
      //   const z = 100 * Math.random() - 10;
      //   newModel.position.set(x, y, z);
      //   scene.add(newModel);

      //   mixer = new THREE.AnimationMixer(newModel);
      //   mixer.clipAction(gltf.animations[0]).play();
      //   mixers.push(mixer)
      // }
      // console.log(mixer)
      // return mixer
    },
    // onProgress callback
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    (err) => {
      console.log("An error happened");
    }
  );
}

export { createRobotArm };
