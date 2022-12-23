import * as THREE from "three";

function createSparks(scene) {
  //Particles//
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 10000; i++) {
    const vertex = new THREE.Vector3();
    vertices.push(vertex);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 3,
    sizeAttenuation: true,
    alphaTest: 0.5,
    transparent: true,
    color: 0x8A00F5
  });

  const particles = new THREE.Points(geometry, material);
  particles.position.set(0, 0, -500);
  scene.add(particles);
  return particles;
}

export { createSparks };
