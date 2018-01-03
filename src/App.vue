<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
    <footer-bar class="footer"></footer-bar>
  </div>
</template>

<script>
 import NavBar from './components/Nav'
 import FooterBar from './components/Footer.vue'
export default {
  name: 'app',
  components:{
    NavBar,
    FooterBar
  }
}
</script>

<style>
#app {
  position: relative;
  padding-bottom: 30vh;
  min-height: 100%;
}
  .footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
}

  .el-footer {
    background-color: #545c64;
    color: white;
    text-align: center;
    line-height: 60px;
  }
  
</style>
