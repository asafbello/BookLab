<template>
  <section class="book-header">
    <div class="book-aside">
      <el-button class="add-book" type="primary" @click="addBook(googleBookId)">Add to shelf</el-button>
      <img v-if="googleBook" class="book-img" :src="googleBook.img" />
      <!-- Rating -->
      <el-rate
        v-model="ratingVal"
        :texts="['Nah', 'Disappointed', 'Niceee', 'Great', 'Masterpiece!']"
        show-text>
        <span>Rate it</span>
      </el-rate>
    </div>
    <!-- Book content -->
    <main class="book-content" v-if="googleBook">
      <h1>{{googleBook.title}}/ <span class="pageCount">{{googleBook.pages}} pages</span></h1>
      <h5>{{googleBook.author}}</h5>
      <el-button class="chat-btn" type="primary">Chat about this book</el-button>
      <el-button type="success">Add review</el-button>
      <article class="book-review">
        <p v-html="googleBook.desc"></p>
        <span class="friends-review"></span>
      </article>
      <article class="links">
        <el-button type="info">Get a copy</el-button>
        <el-button class="vid-review" type="success">See it in video</el-button>
      </article>
    </main>
  </section>
</template>

<script>

import BookService from '../services/BookService.js'
import { ADD_BOOK, GET_BOOK } from '../store/modules/BookModule.js'

export default {
  name: 'BookPage',

  data() {
    return {
      ratingVal: null,
    }
  },
    created() {
      var googleBookId = this.$route.params.googleBookId;
      console.log({googleBookId});
      this.$store
          .dispatch({
              type: GET_BOOK,
              googleBookId: googleBookId
            })
  },
  computed: {
    googleBook(){
      return this.$store.state.book.currGoogleBook
    }
  },
  methods: {
    addBook(googleBookId) {
      this.$store
      .then(book => {
        this.$store.dispatch({
          type: ADD_BOOK_TO_USER,
          googleBookId
        })
        console.log('fetching book', book); 
      })
    }
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
  background: var(--secondary-color);
  border: none;
}

.book-img {
  max-width: 280px;
  height: auto;
  display: block;
  margin-bottom: 15px;
}

.pageCount {
  font-size: 16px;
}
</style>