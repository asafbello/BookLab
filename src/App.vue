<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
    <footer></footer>
  </div>
</template>

<script>
 import navBar from './components/Nav'
export default {
  name: 'app',
  components:{
    navBar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
