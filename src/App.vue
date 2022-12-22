<template>
  <div>
    <div v-if="isLoading"></div>
    <div v-if="!isLoading">
      <Navbar/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue";

export default {
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
