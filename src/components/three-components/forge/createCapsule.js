import * as THREE from "three";

function createCapsule(scene, x, z, color, scale) {
  const geometry = new THREE.TorusGeometry(40, 5, 16, 100);
  const material = new THREE.MeshBasicMaterial({
    color: color,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  torus.scale.set(scale, scale, scale)
  torus.position.set(x, 0, z);
  scene.add(torus);
  return torus
}

export { createCapsule };
