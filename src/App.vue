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
}
</style>
