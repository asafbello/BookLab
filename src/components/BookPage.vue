<template>
  <section class="book-header">
      <!-- <div>
        <book-reviews :reviews="currBook.reviews"></book-reviews>
      </div> -->
    <div class="book-aside">
      <div class="add-to-shelf">
          <el-select v-model="readState" placeholder="Wish List">
            <el-option value="Read"></el-option>
            <el-option value="Reading"></el-option>
            <el-option value="WishList"></el-option>
          </el-select>
           <el-button class="add-book" type="primary" @click.native="setBookToList(currBook)">Add To My Shelf</el-button>
      </div>
      <img v-if="currBook" class="book-img" :src="currBook.img" />
      <!-- Rating -->
      <div class="block">
        <span class="rating-title">Avg Rating</span>
          <el-rate :value="4.5" disabled show-score text-color="#ff9900" score-template="{value} points">
          </el-rate>
      </div>
    </div>
    <!-- Book content -->
    <main class="book-content" v-if="currBook">
      <h1>{{currBook.title}}/ <span class="pageCount">{{currBook.pages}}showVideo {{showVideo}}pages</span></h1>
      <h5>{{currBook.author}}</h5>
      <el-button type="primary" @click="showReviewModal">Add Review</el-button>
        <el-button class="vid-review" type="primary"
         @click.native="showVideoModal">
         <i class="fa fa-video-camera" aria-hidden="true"> </i> Video Review</el-button>
        <el-button class="copy-btn" type="info">Get a Copy</el-button>
      <article class="book-review">
        <p @click="isReadMore = !isReadMore" class="book-desc" :style="styleReadMore" v-html="currBook.desc"></p>
      </article>
      <article class="links">
      <el-button class="chat-btn" type="primary">Join Book Chat <span class="down-arrow">↓</span></el-button>
      </article>
        <div v-if="showVideo" class="bg-modal">
          <button @click="closeVideoModal">
            <i class="el-icon-error close-vid"></i></button>
          <video-modal class="klub-modal" :videoId="videoSrc"></video-modal>
        </div>
      <div class="bg-modal" @click="closeFromCancel" v-if="showModal" @closeModalOnEsc="showReviewModal">
      <review-modal :currBook="currBook" @click.native.stop @closeFromCancel="closeFromCancel"  class="klub-modal" @addUserReview="addRateToBook"></review-modal>
      </div>
    </main>
  </section>
</template>

<script>
import ReviewModal from "../pages/ReviewModal.vue";
import BookReviews from "../pages/BookReviews.vue";
import VideoModal from "../components/VideoModal.vue";
import BookPreview from "../components/BookPreview.vue";
import _ from "lodash";
import BookService from "../services/BookService.js";
import APIService from "../services/APIService.js";
import { ADD_BOOK, GET_BOOK } from "../store/modules/BookModule.js";
import {
  UPDATE_USER,
  ADD_TO_WISH_LIST,
  ADD_TO_READ_LIST,
  SET_CURR_READING
} from "../store/modules/UserModule.js";
import { UPDATE_BOOK_AND_USER } from "../store/modules/ReviewModule.js";
import { mapGetters } from "vuex";

export default {
  name: "BookPage",
  components: {
    ReviewModal,
    VideoModal,
    BookReviews
  },
  data() {
    return {
      ratingVal: null,
      showModal: false,
      readState: "mark book",
      isReadMore: false,
      showVideo: false,
      videoSrc: null
    };
  },
  computed: {
    ...mapGetters(["currBook", "isUser", "loggedInUser"]),
    styleReadMore() {
      return {
        height: this.isReadMore ? "" : "300px"
      };
    }
  },
  methods: {
    showVideoModal() {
      let title = this.currBook.title + " book review";
      APIService.getVideo(title)
      .then(videoSrc => {
        this.videoSrc = videoSrc
      });
      this.showVideo = true;
    },
    closeVideoModal(){
      console.log('hi');
      this.showVideo = false;
    },
    showReviewModal() {
      if (!this.$store.getters.isUser) {
        this.$message.error("Oops, Please log in to add a review");
      } else {
        this.showModal = true;
        document.addEventListener("keyup", evt => {
          if (evt.keyCode === 27) {
            this.showModal = false;
          }
        });
      }
    },
    closeFromCancel() {
      this.showModal = !this.showModal;
    },
    addBook() {
      if (!this.$store.getters.isUser) {
        this.$message.error("Oops, Please log in to add to your shelf");
      } else {
        var objToUpdateBook = {
          userId: this.loggedInUser._id,
          readState: this.readState
        };
        var objToUpdateUser = {
          bookForigenId: updatedBook.forigenId,
          readState: this.readState
        };
        this.$store
          .dispatch({
            type: UPDATE_BOOK_AND_USER,
            objToUpdateBook,
            objToUpdateUser
          })
          .then(_ => console.log("updated"))
          .catch(err => console.log("err", err));
      }
    },
    addRateToBook(reviewBook, reviewUser) {
      if (!this.$store.getters.isUser) {
        this.$message.error("Oops, Please log in to add to a shelf");
      } else {
        this.showModal = !this.showModal;
        this.$message("adding your review...");
        this.$store
          .dispatch({
            type: UPDATE_BOOK_AND_USER,
            reviewBook,
            reviewUser
          })
          .then(_ => console.log("updated"))
          .catch(err => {
            this.$message.error("Oops, could not get your review. Try again");
            console.log("err", err);
          });
      }
    },
    SetBookToList(book) {
      if (!this.$store.getters.isUser) {
        this.$message.error("Oops, Please log in to add to a shelf");
      } else {
        if (this.readState === "WishList") {
          this.$store.dispatch({
            type: ADD_TO_WISH_LIST,
            id: this.$store.state.user.loggedinUser._id,
            book
          });
        } else if (this.readState === "Read") {
          this.$store.dispatch({
            type: ADD_TO_READ_LIST,
            id: this.$store.state.user.loggedinUser._id,
            book
          });
        } else if (this.readState === "Reading") {
          this.$store.dispatch({
            type: SET_CURR_READING,
            id: this.$store.state.user.loggedinUser._id,
            book
          });
        }
      }
    }
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
        APIService.getBookFromGoogle(googleBookId).then(function(bookToAdd) {
          if (bookToAdd._id) return;
          self.dispatch({
            type: ADD_BOOK,
            bookToAdd
          });
        });
      }
    });
  }
};
</script>

<style scoped>

/* .review-modal {
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
} */
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
  padding-right: 2vw;
  padding-left: 2vw;
  overflow: hidden;
}
.add-to-shelf {
  display: flex;
  flex-direction: row;
}
.add-to-shelf * {
  margin: 0.3vw;
}

.copy-btn {
  margin-top: 2vw;
}

.chat-btn {
  margin-bottom: 2vw;
}

.book-review {
  cursor: pointer;
}

.book-content {
  margin-top: 25px;
}

.close-vid {
  font-size: 2.5em
}

/* ////////////  mobile query  //////////////// */

@media screen and (max-width: 768px) {
  .book-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>