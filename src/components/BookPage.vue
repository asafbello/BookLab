<template>
  <section class="book-header">
    <div class="book-aside">
      <el-button class="add-book" type="primary">Add to shelf</el-button>
      <img class="book-img" src="../assets/img/bookCovers/harryPotter.jpg" />
      <!-- Rating -->
      <el-rate
        v-model="ratingVal"
        :texts="['Nah', 'Disappointed', 'Niceee', 'Great', 'Masterpiece!']"
        show-text>
        <span>Rate it</span>
      </el-rate>
    </div>
    <!-- Book content -->
    <main class="book-content">
      <h2>Book Title</h2>
      <h5>Author</h5>
      <el-button class="chat-btn" type="primary">Chat about this book</el-button>
      <el-button type="success">Add review</el-button>
      <article class="book-review">
        <p>Book review text</p>
        <span class="friends-review"></span>
      </article>
      <article class="links">
        <el-button type="info">Get a copy</el-button>
        <el-button class="vid-review" type="primary">See it in video</el-button>
      </article>
    </main>
  </section>
</template>

<script>
export default {
  // name: 'BookPage',
  created() {
  },
  data() {
    return {
      ratingVal: null
    };
  }
};
</script>

<style scoped>

.book-header {
  display: flex;
}

.book-aside {
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  max-width: 280px;
  margin: 20px 20px;
}

.add-book {
  background: var(--info-color);
  margin-bottom: 5px;
}

.chat-btn {
  background: var(--info-color);
}

.vid-review {
  background: var(--special-btn);
  border: none;
}

.book-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 15px;
}
</style>