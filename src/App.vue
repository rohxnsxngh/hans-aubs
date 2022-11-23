<template>
  <div>
    <div id="loader" v-if="isLoading"></div>
    <div class="nav-container" v-if="!isLoading">
      <Navbar/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue";

export default {
  name: "main",
  components: {
    Navbar
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    checkLoading() {
      var timeleft = 5;
      var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
          clearInterval(downloadTimer);
          this.isLoading = false;
        }
        timeleft -= 1;
      }, 1000);
    },
  },
};
</script>
