import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

function createWater(water, scene, upperwater) {
  //Water
  const waterGeometry = new THREE.PlaneGeometry(20000, 20000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xda9bf2,
    waterColor: 0x6aeff5,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  upperwater = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xe27d60,
    waterColor: 0x000000,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  upperwater.rotation.x = -Math.PI / 2;
  upperwater.position.set(0, 100, 0);
  upperwater.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  scene.add(upperwater);
  return water, upperwater
}

export { createWater };
