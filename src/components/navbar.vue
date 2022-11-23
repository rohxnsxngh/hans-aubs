<template>
  <div>
    <div
      v-if="!isStarted"
      id="navbar"
      class="bg-white flex ease-in-out p-4 opacity-90 h-[70rem] w-full justify-center"
    >
      <div>
        <a href="https://github.com/rohxnsxngh">
          <div class="transition delay-150 duration-300 hover:translate-x-6">
            <img src="../assets/github.png" class="w-6 mb-5" /><img />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/rohan-singh1122/">
          <div class="transition delay-150 duration-300 hover:translate-x-6">
            <img src="../assets/linkedin.png" class="w-6 mb-5" /><img />
          </div>
        </a>
        <a href="mailto:rohan.singh.do@gmail.com">
          <div class="transition delay-150 duration-300 hover:translate-x-6">
            <img src="../assets/email.png" class="w-6 mb-5" /><img />
          </div>
        </a>
        <a href="https://www.instagram.com/rohxnsxngh/">
          <div class="transition delay-150 duration-300 hover:translate-x-6">
            <img src="../assets/instagram.png" class="w-6 mb-5" /><img />
          </div>
        </a>
        <ControlsInfo />
        <div class="text-center">
          <button
            class="btn shadow-lg shadow-blue-500/50 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-black my-48 drop-shadow-2xl animate-bounce font-bold"
            @click="isStarted = true"
          >
            start experience
          </button>
        </div>
      </div>
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
    };
  },
};
</script>
