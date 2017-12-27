<template>
  <section class="book-header">
    <div class="book-aside">
      <el-button class="add-book" type="primary" @click="addBook(googleBookId)">Add to shelf</el-button>
      <img v-if="currBook" class="book-img" :src="currBook.img" />
      <!-- Rating -->
      <div class="block">
        <span class="rating-title">Avg Rating</span>
        <el-rate @click.native="addRateToBook" v-model="ratingVal"></el-rate>
      </div>
    </div>
    <!-- Book content -->
    <main class="book-content" v-if="currBook">
      <h1>{{currBook.title}}/ <span class="pageCount">{{currBook.pages}} pages</span></h1>
      <h5>{{currBook.author}}</h5>
      <el-button type="success" @click="showReviewModal">Add review</el-button>
        <el-button type="info">Get a copy</el-button>
      <article class="book-review">
        <p class="book-desc" v-html="currBook.desc"></p>
        <span class="friends-review"></span>
      </article>
      <article class="links">
      <el-button class="chat-btn" type="primary">Chat about this book <span class="down-arrow">↓</span></el-button>
        <el-button class="vid-review" type="primary">Video review</el-button>
        <i class="fa fa-video-camera" aria-hidden="true"></i>
      </article>
      <div class="modal" v-if="showModal" @closeModalOnEsc="showReviewModal">
      <review-modal @closeFromCancel="showReviewModal" :curr-book="currBook" class="review-modal" @addUserReview="addRateToBook"></review-modal>
      </div>
    </main>
  </section>
</template>

<script>
import BookService from "../services/BookService.js";
import {
  ADD_BOOK,
  GET_BOOK,
  UPDATE_BOOK
} from "../store/modules/BookModule.js";
import ReviewModal from "../pages/ReviewModal.vue";
import _ from "lodash";
import {UPDATE_USER} from '../store/modules/UserModule.js'

export default {
  name: "BookPage",
  components: {
    ReviewModal
  },
  data() {
    return {
      ratingVal: null,
      showModal: false
    };
  },
  created() {
    var googleBookId = this.$route.params.googleBookId;
    BookService.getBookByForeignId(googleBookId).then(book => {
      if (book) {
        this.$store.commit({
          type: ADD_BOOK,
          book
        });
      } else {
        var self = this.$store;
        BookService.getBookFromGoogle(googleBookId).then(function(bookToAdd) {
          console.log(bookToAdd);
          if (bookToAdd._id) return;
          self.dispatch({
            type: ADD_BOOK,
            bookToAdd
          });
        });
      }
    });
  },
  computed: {
    currBook() {
      return this.$store.getters.currentBook;
    },
    isUser() {
      return this.$store.getters.isUser;
    },
    loggedInUser() {
      return this.$store.state.user.loggedinUser;
    }
  },
  methods: {
    showReviewModal() {
      this.showModal = true;
      document.addEventListener("keyup", evt => {
        if (evt.keyCode === 27) {
          this.showModal = false;
        }
      });
    },
    closeFromCancel() {
      this.showModal = !this.showModal;
    },
    addBook(googleBookId) {
      this.$store.then(book => {
        this.$store.dispatch({
          type: ADD_BOOK_TO_USER,
          googleBookId
        });
      });
    },
    addRateToBook(reviewObj) {
      console.log(reviewObj);
      this.$store
        .dispatch({
          type: UPDATE_BOOK,
          review: reviewObj
        })
        .then( () => {
          var updatedUser = _.cloneDeep(this.loggedInUser);
          updatedUser.reviews.push(reviewObj);
          this.$store.dispatch({
            type: UPDATE_USER,
            userId: this.loggedInUser._id,
            updatedUser
          });
        });
    }
  }
};
</script>

<style scoped>
.review-modal {
  margin-right: auto;
  margin-left: auto;
  z-index: 1;
  top: 50%;
  left: 50%;
  right: 50%;
  background: rgba(0, 0, 0, 0.4);
  padding: 15vw;
  margin: 5vw;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.445);
  overflow: scroll;
}
.book-header {
  display: flex;
}

.block {
  width: 100%;
}

.modal-header {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 75%;
}

.book-aside {
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  max-width: 280px;
  margin: 20px 20px;
}

.add-book {
  margin-bottom: 5px;
}

.vid-review {
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