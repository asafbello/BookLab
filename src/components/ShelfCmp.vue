<template>
<section>
  <ul>
      <li v-for="book in shelf">{{book.volumeInfo.title}}</li>
  </ul>
</section>
</template>

<script>
export default {
  name: "ShelfCmp",
  props: ['shelf'],
}
</script>

<style scoped>

</style>


