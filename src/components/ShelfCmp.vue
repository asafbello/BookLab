<template>
<section class="shelf-cmp">
  <div class="books">
  <ul>
      <li v-for="book in shelf">{{book.volumeInfo.title}}</li>
  </ul>
  </div>
  <div class="shelf">
      <div class="bottom-shelf"></div>
      <div class="bottom-shelf-edge"></div>
  </div>
</section>
</template>

<script>
export default {
  name: "ShelfCmp",
  props: ['shelf'],
}
</script>

<style scoped>
.shelf-cmp{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.books{
  display: block;
}
.shelf{
  display: block;
  /* top:50vw; */
}
.bottom-shelf {
  width: 80vw;
  z-index: 99;
  border-bottom: 25px solid #A1A194;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
}
 
.bottom-shelf-edge {
  width: 100%;
  height: 25px;
  background: #5B605F;
  /* position: relative; */
  z-index: 99;
  /* top: -50px; */
}
</style>


