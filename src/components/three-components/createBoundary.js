import * as THREE from "three";

function createBoundary(scene) {
  let torus;
  let torusCollection = [];
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x000000, //change color
    specular: 0xFA1200,
    shininess: 30,
  });
  
  for (let i = 0; i < 11; i++) {
    const geometry = new THREE.TorusGeometry(100 - (10 * i), 5, 20, 60);
    torus = new THREE.Mesh(geometry, material);
    torus.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/4);
    torus.position.set(-600, 150, -200)
    // torus.material.specular.setHex(0xffffff * Math.random())
    scene.add(torus);
    torusCollection.push(torus)
  }


  return torusCollection;
}

export { createBoundary };
