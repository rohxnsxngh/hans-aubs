import * as THREE from "three";

function createParticles(scene) {
  //Particles//
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const sprite = new THREE.TextureLoader().load("/sprites.png");

  for (let i = 0; i < 25000; i++) {
    const x = 3000 * Math.random() - 1000;
    const y = 3000 * Math.random() - 1000;
    const z = 3000 * Math.random() - 1000;

    vertices.push(x, y, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 3,
    sizeAttenuation: true,
    alphaTest: 0.5,
    map: sprite,
    transparent: true,
    color: 0xFA1D00,
  });

  const particles = new THREE.Points(geometry, material);
  particles.position.set(0, 0, -500);
  scene.add(particles);
  return particles;
}

export { createParticles };
