<template>
  <div>
    <div
      v-if="!isStarted"
      id="navbar"
      class="bg-gray-700 ease-in-out p-4 opacity-95 h-[70rem] w-full justify-center duration-700"
    >
      <div>
        <div class="columns-2">
          <div class="flex">
            <a href="https://github.com/rohxnsxngh">
              <div
                class="transition delay-150 duration-300 hover:translate-y-6 mx-4"
              >
                <img
                  src="../assets/github.png"
                  class="w-12 sm:w-6 mb-10 shadow-lg shadow-yellow-500/50 rounded-bl-lg rounded-br-lg"
                /><img />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/rohan-singh1122/">
              <div
                class="transition delay-150 duration-300 hover:translate-y-6 mx-4"
              >
                <img
                  src="../assets/linkedin.png"
                  class="w-12 sm:w-6 mb-10 shadow-lg shadow-yellow-500/50 rounded-bl-lg rounded-br-lg"
                /><img />
              </div>
            </a>
            <a href="mailto:rohan.singh.do@gmail.com">
              <div
                class="transition delay-150 duration-300 hover:translate-y-6 mx-4"
              >
                <img
                  src="../assets/email.png"
                  class="w-12 sm:w-6 mb-10 shadow-lg shadow-yellow-500/50 rounded-bl-lg rounded-br-lg"
                /><img />
              </div>
            </a>
            <a href="https://www.instagram.com/rohxnsxngh/">
              <div
                class="transition delay-150 duration-300 hover:translate-y-6 mx-4"
              >
                <img
                  src="../assets/instagram.png"
                  class="w-12 sm:w-6 mb-10 shadow-lg shadow-yellow-500/50 rounded-bl-lg rounded-br-lg"
                /><img />
              </div>
            </a>
          </div>
        </div>
        <ControlsInfo />
        <div class="text-center">
          <button
            id="start-experience"
            class="btn shadow-lg shadow-yellow-500/50 bg-gradient-to-r from-purple-500 via-orange-500 to-yellow-500 hover:from-yellow-500 hover:via-orange-500 hover:to-purple-500 duration-100 text-black my-16 drop-shadow-2xl animate-bounce font-bold"
            @click="isStarted = true"
          >
            start experience
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col px-4 ease-in-out duration-700">
      <img
        v-if="isStarted"
        id="menu"
        src="../assets/menu.png"
        class="w-12 sm:w-6 self-end mt-2 translate-y-1/4 rounded-full invert ring-offset-1 ring ring-blue-500 ease-in duration-300 cursor-pointer hover:invert-0 hover:rotate-180"
        @click="isStarted = false"
      />
      <button id="audio" class="self-end">
        <img
          v-if="isAudio"
          @click="isAudio = false"
          id="audio-on"
          src="../assets/audioOn.png"
          class="w-12 sm:w-6 mt-6 rounded-full invert ring-offset-1 ring ring-blue-500 ease-in duration-300 cursor-pointer hover:invert-0 hover:rotate-90 animate-bounce"
        />
        <img
          v-if="!isAudio"
          @click="isAudio = true"
          id="audio-off"
          src="../assets/audioMute.png"
          class="w-12 sm:w-6 mt-6 rounded-full invert ring-offset-1 ring ring-orange-500 ease-in duration-300 cursor-pointer hover:invert-0 hover:rotate-90"
        />
      </button>
    </div>
  </div>
</template>

<script>
import ControlsInfo from "../components/controlInfo.vue";

export default {
  name: "main",
  components: {
    ControlsInfo,
  },
  data() {
    return {
      isStarted: false,
      isAudio: true,
    };
  },
};
</script>
