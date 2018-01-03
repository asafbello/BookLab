<template>
  <el-container>
    <el-footer>
      <!-- <div class="img-wrapper">
        <img class="footer-logo" src="../assets/img/logo.png" />
      </div> -->
      An app powered by
      <a class="nav-link" href="https://nemo369.github.io/naaman/" target="_blank"> Naaman,</a>
      <a class="nav-link" href="https://github.com/asafbello" target="_blank"> Asaf</a>  and 
      <a class="nav-link" href="https://charlesmarlow.github.io/proj-gallery/" target="_blank"> Nadav &copy</a></el-footer>
  </el-container>
</template>
<script>

export default {
  data() {
    return {

    };
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style scoped> 

.nav-link {
  color: white; 
  text-decoration: none;
}

/* .footer-logo {
  display: block;
  width: 100%;
  height: auto;
} */

.img-wrapper {
  width: 13vw;
  max-width: 150px;
}

/* ////////////  mobile query  //////////////// */

/* @media screen and (max-width: 768px) {
.footer-logo {
    max-width: 10vw;
    height: 4.8vh;
    position: absolute;
    top: 27px;
    left: 30px;
  }
} */



</style>

