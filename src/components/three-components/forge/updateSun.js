import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";

function updateSun(scene, water, renderer) {
  const sun = new THREE.Vector3();

  const sky = new Sky();
  sky.scale.setScalar(20000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 1;
  skyUniforms["rayleigh"].value = -1; // twilight mode is 0, sunset mode is 3, -1 turns it all off
  skyUniforms["mieCoefficient"].value = 0.5;
  skyUniforms["mieDirectionalG"].value = 1;

  const parameters = {
    elevation: 0,
    azimuth: 180,
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  let renderTarget;

  const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
  const theta = THREE.MathUtils.degToRad(parameters.azimuth);
  sun.setFromSphericalCoords(1, phi, theta);
  sky.material.uniforms["sunPosition"].value.copy(sun);
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();
  if (renderTarget !== undefined) renderTarget.dispose();
  renderTarget = pmremGenerator.fromScene(sky);
  scene.environment = renderTarget.texture;
}

export { updateSun };
