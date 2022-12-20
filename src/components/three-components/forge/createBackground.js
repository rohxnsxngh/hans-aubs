import * as THREE from "three";

function createBackground(scene) {
  //load Card Background

  const Geometry = new THREE.PlaneGeometry(100, 100);
  const Material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    opacity: 0.1,
  });
  const Plane = new THREE.Mesh(Geometry, Material);

  //Home Plane Creation
  const HomePlane = Plane.clone();
  HomePlane.position.set(25, 135, -500);
  HomePlane.scale.set(3, 1, 0);
  HomePlane.castShadow = true;
  scene.add(HomePlane);

  //Right Plane Creation
  const RightPlane = Plane.clone();
  RightPlane.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
  RightPlane.position.set(500, 130, 50);
  RightPlane.scale.set(2.75,1.1,0)
  RightPlane.castShadow = true;
  scene.add(RightPlane);

  //Left Plane Creation
  const LeftPlane = Plane.clone();
  LeftPlane.position.set(-500, 140, 45);
  LeftPlane.scale.set(1.5, 0.5, 0);
  LeftPlane.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  scene.add(LeftPlane);

  //Back Plane Creation
  const BackPlane = Plane.clone();
  BackPlane.position.set(-50, 130, 500);
  BackPlane.scale.set(2.75, 1.1, 0);
  scene.add(BackPlane);

  return Plane;
}

export { createBackground };
