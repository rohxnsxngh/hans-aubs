import * as THREE from "three";

function createAmbientSound(camera, frequencySamples, ANALYSER) {
  const startButton = document.getElementById("start-experience");
  const audio = document.getElementById("audio");
  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add(listener);
  let count = 0;

  // create a global audio source
  const sound = new THREE.Audio(listener);

  // create an AudioAnalyser, passing in the sound and desired fftSize
  const analyser = new THREE.AudioAnalyser(sound, 32);

  // get the average frequency of the sound
  const data = analyser.getFrequencyData();

  startButton.addEventListener("click", function () {
    document.documentElement.requestFullscreen();
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./Audio/SomethingWicked.mp3", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.75);
      sound.play();

      //Pause and Play
      audio.addEventListener("click", function () {
        count += 1;
        if (count % 2 != 0) {
          sound.pause();
        } else {
          sound.play();
        }
      });
    });
  });

  // const ACTX = new AudioContext();
  // ANALYSER = ACTX.createAnalyser();
  // const AUDIO = new Audio("./Audio/SomethingWicked.mp3");
  // ANALYSER.fftSize = 4 * frequencySamples;
  // ANALYSER.smoothingTimeConstant = 0.5;
  // const SOURCE = ACTX.createMediaElementSource(AUDIO);
  // SOURCE.connect(ANALYSER);

  //Audio Analyzer

  return sound;
}

export { createAmbientSound };
