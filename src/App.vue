<template>
  <div id="loader" v-if="isLoading"></div>
  <div class="nav-container" v-if="!isLoading">
    <nav id="navbar">
      <div>
        <a href="https://github.com/rohxnsxngh">
          <div class="link-container">
            <img
              src="./assets/github.png"
              style="width: 35px; height: 35px; margin-bottom: 15px;"
            /><img />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/rohan-singh1122/">
          <div class="link-container">
            <img
              src="./assets/linkedin.png"
              style="width: 35px; height: 35px; margin-bottom: 15px"
            /><img />
          </div>
        </a>
        <a href="mailto:rohan.singh.do@gmail.com">
          <div class="link-container">
            <img
              src="./assets/email.png"
              style="width: 35px; height: 35px; margin-bottom: 15px"
            /><img />
          </div>
        </a>
        <a href="https://www.instagram.com/rohxnsxngh/">
          <div class="link-container">
            <img
              src="./assets/instagram.png"
              style="width: 35px; height: 35px; margin-bottom: 15px"
            /><img />
          </div>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "main",
  components: {},
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

<style scoped>
#navbar {
  display: flex;
  background-color: transparent;
  /* transform: translateY(-100%); */
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
#navbar a {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
#navbar > * {
  padding: 1rem;
}
/* .nav-container:hover #navbar {
  transform: translateY(0);
} */
</style>
