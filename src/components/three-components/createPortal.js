import * as THREE from "three";

function createPortal(scene) {
  const geometryTorus = new THREE.TorusGeometry(125, 7, 16, 100);
  const materialTorus = new THREE.MeshNormalMaterial({ color: 0xffff00 });
  const torus = new THREE.Mesh(geometryTorus, materialTorus);
  torus.position.set(0, 0, 50);
  scene.add(torus);

  const geometry = new THREE.CircleGeometry(30, 32);
  const material = new THREE.MeshNormalMaterial({
    color: 0xffff00,
  });
  const portalMesh = new THREE.InstancedMesh(geometry, material, 5000);
  const matrix = new THREE.Matrix4();
  for (let p = 1000; p > 10; p--) {
    matrix.setPosition(
      0.5 * p * Math.cos((4 * p * Math.PI) / 180),
      0.5 * p * Math.sin((4 * p * Math.PI) / 180),
      0.1 * p
    );

    portalMesh.setMatrixAt(p, matrix);
  }
  portalMesh.scale.set(0.25, 0.25, 0.25);
  scene.add(portalMesh);
  return portalMesh;
}

export { createPortal };
