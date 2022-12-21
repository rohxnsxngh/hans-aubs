import * as THREE from "three";

function createBoundary(scene) {
  let torus;
  let torusCollection = [];
  const material = new THREE.MeshNormalMaterial();
  
  for (let i = 0; i < 11; i++) {
    const geometry = new THREE.TorusGeometry(100 - (10 * i), 5, 20, 60);
    torus = new THREE.Mesh(geometry, material);
    torus.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/4);
    torus.position.set(-800, 120, -300)
    // torus.material.specular.setHex(0xffffff * Math.random())
    scene.add(torus);
    torusCollection.push(torus)
  }


  return torusCollection;
}

export { createBoundary };
