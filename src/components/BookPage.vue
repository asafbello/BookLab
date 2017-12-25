<template>
  <section>
    <h1>Book Page</h1>
    <div class="book-aside">
      <button>Add to shelf</button>
      <img class="book-img" src="/FrontEnd/assets/img/harryPotter.jpg" />
      <span>Rating</span>
    <main class="book-content">
      <h2>Book Title</h2>
      <h5>Author</h5>
      <p>Chat about this book</p>
      <button>Add review</button>
      <article class="book-review">
        <p>Book review text</p>
        <span class="friends-review"></span>
      </article>
      <article class="links">
        <button>Get a copy</button>
      </article>
      <h5>Get in video</h5>
    </main>
    </div>
  </section>
</template>

<script>
export default {
  // name: 'BookPage',
  created(){
    console.log('inside book page')
  },
  data () {
    return {
    }
  } 
}
</script>

<style scoped>

</style>