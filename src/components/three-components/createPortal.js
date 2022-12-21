import * as THREE from "three";

function createPortal(scene, x, y, z, scale) {
  const color = new THREE.Color();
  const geometryTorus = new THREE.TorusGeometry(125, 7, 16, 100);
  const materialTorus = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x000000, //change color
    specular: 0xffffff,
    shininess: 15,
  });
  const torus = new THREE.Mesh(geometryTorus, materialTorus);
  torus.position.set(x + 10, y, z);
  torus.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  torus.scale.set(0.4, 0.4, 0.4)
  scene.add(torus);

  // const geometryCylinder = new THREE.CylinderGeometry(125, 5, 30, 32);
  // const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
  // cylinder.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  // cylinder.position.set(0, 0, 50);
  // scene.add(cylinder);

  const geometry = new THREE.CircleGeometry(30, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0107fa,
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
    portalMesh.setColorAt(p, color.setHex(Math.random() * 0xffffff));
  }
  portalMesh.position.set(x, y, z);
  portalMesh.scale.set(scale, scale, scale);
  scene.add(portalMesh);
  return portalMesh;
}

export { createPortal };
