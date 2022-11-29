import * as THREE from "three";

function createBoundary(scene) {
  const geometry = new THREE.TorusGeometry(750, 10, 20, 60);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x000000, //change color
    specular: 0x55C2D6,
    shininess: 30,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  torus.position.set(0, 200, 0)
  scene.add(torus);
  return torus;
}

export { createBoundary };
