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
      <el-button type="success" @click="showReviewModal">Add review</el-button>
        <el-button class="vid-review" type="success">Video review</el-button>
        <el-button type="info">Get a copy</el-button>
      <article class="book-review">
        <p class="book-desc" v-html="googleBook.desc"></p>
        <span class="friends-review"></span>
      </article>
      <article class="links">
      <el-button class="chat-btn" type="primary">Chat about this book <span class="down-arrow">↓</span></el-button>
        <el-button class="vid-review" type="success">Video review</el-button>
        <i class="fa fa-video-camera" aria-hidden="true"></i>
      </article>
      <div class="modal"  v-if="showModal" @keyup.esc="showReviewModal">
      <review-modal class="review-modal"></review-modal>
      </div>
    </main>
  </section>
</template>

<script>

import BookService from '../services/BookService.js'
import { ADD_BOOK, GET_BOOK } from '../store/modules/BookModule.js'
import ReviewModal from '../pages/ReviewModal.vue'

export default {
  name: 'BookPage',
  components: {
    ReviewModal
  },
  data() {
    return {
      ratingVal: null,
      showModal: false
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
    showReviewModal(){
          this.showModal = !this.showModal
    },
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

.review-modal{
  margin-right: auto;
  margin-left: auto;
  z-index: 1;
  top: 50%;
  left: 50%;
  right: 50%;
  background: rgba(255, 255, 255, 0.829);
  padding: 15vw;
  margin: 5vw
}
.modal{
  /* display: block; */
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.445)
}
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

.down-arrow {
  margin-left: 5px;
}

.book-desc {
  padding-right: 10px;
}
</style>