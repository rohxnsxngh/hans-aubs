<template>
  <div
    v-if="!isStarted"
    id="navbar"
    class="bg-white flex ease-in-out p-4 opacity-95 h-[70rem] w-full justify-center duration-700"
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
          class="btn shadow-lg shadow-blue-500/50 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-black my-16 drop-shadow-2xl animate-bounce font-bold"
          @click="isStarted = true"
        >
          start experience
        </button>
      </div>
    </div>
  </div>
  

  <img
    v-if="isStarted"
    id="menu"
    src="../assets/menu.png"
    class="w-8 mt-4 mx-2 translate-y-1/4 rounded-full invert ring-offset-2 ring ring-black ease-in duration-300 cursor-pointer hover:invert-0 hover:translate-x-6"
    @click="isStarted = false"
  />
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
