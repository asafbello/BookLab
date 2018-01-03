<template>
  <main>
    <!-- Readers' profiles -->
    <article class="profile-display">
      <h3 class="profile-title">Also read by</h3>
      <profiles-prev :profiles="profilesFromReviews"></profiles-prev>
    </article>
    <section class="book-header">
        <!-- List select -->
        <!-- <div class="add-to-shelf">
            <el-select v-model="readState" placeholder="Wish List">
              <el-option value="Read"></el-option>
              <el-option value="Reading"></el-option>
              <el-option value="WishList"></el-option>
            </el-select>
            <el-button class="add-book" type="primary" @click.native="setBookToList(currBook)">Add To My Shelf</el-button>
        </div> -->



      <div class="book-aside">
        <div class="bookimg-and-rate">
        <img v-if="currBook" class="book-img" :src="currBook.img" />
        <!-- Rating -->
        <div class="block">
          <span class="rating-title">Avg Rating</span>
            <el-rate v-if="bookRate" :value="bookRate" disabled show-score text-color="#ff9900"
            score-template="{value} stars"></el-rate>
            <el-rate v-else :value=".5" disabled show-score text-color="#ff9900"
            score-template="No rates yet"></el-rate>
        </div>
        </div>

      <!-- Action buttons -->
      <!-- <div class="actn-btns">
        <i class="fa fa-video-camera vid-review" @click="showVideoModal" aria-hidden="true"> </i>
        <el-button type="primary" @click="showReviewModal">Add Review</el-button>
        <i class="fa fa-shopping-cart copy-btn" aria-hidden="true"></i>
      </div> -->
      <!-- Book content -->
      <main class="book-content" v-if="currBook">
        <div>
        <div class="title-and-author">
          <h1 v-if="currBook">{{currBook.title}}</h1>
          <span class="pageCount">{{currBook.pages }} pages 
          <i class="fa fa-file-text-o" aria-hidden="true"></i>
          </span>
        <h5 class="book-author">By {{currBook.author}}</h5>
        </div>
      </div>
          <!-- Book description start -->
        <article class="book-review">
          <p class="book-desc" v-html="currBook.desc"></p>
        </article>
     
        <!-- Book description end -->
        <!-- <article class="links">
        <el-button class="chat-btn" type="primary">Join Book Chat <span class="down-arrow">↓</span></el-button>
        </article> -->
          <!-- Review modal -->
        <div class="modal-wrapper">
          <transition name="fadeReview">
            <div class="bg-modal" @click="closeFromCancel" v-if="showModal" @closeModalOnEsc="showReviewModal">
            <review-modal :currBook="currBook" @click.native.stop @closeFromCancel="closeFromCancel"  class="klub-modal" @addUserReview="addRateToBook"></review-modal>
            </div>
          </transition>
        </div>
      </main>
          <div class="actions">
            <img class="img-icon" src="https://png.icons8.com/color/100/000000/youtube-play.png" @click="showVideoModal">
            <img class="img-icon" src="https://png.icons8.com/dusk/100/000000/hand-with-pen.png" @click="showReviewModal">
            <img class="img-icon" src="https://png.icons8.com/office/100/000000/collaboration.png">
            <div class="add-to-shelf" >
              <div class="select-menu">
            <img class="img-icon" src="https://png.icons8.com/office/100/000000/book-shelf.png"  @click.native="setBookToList(currBook)">
            <el-select v-model="readState" placeholder="Wish List">
              <el-option value="Read">Read <img src="https://png.icons8.com/metro/20/000000/checkmark.png"></el-option>
              <el-option value="Reading">Reading <img src="https://png.icons8.com/ios/20/000000/reading.png"></el-option>
              <el-option value="WishList">Wish list <img src="https://png.icons8.com/wired/20/000000/star-of-bethlehem.png"></el-option>
            </el-select>
            </div>
        </div>
        </div>
    </div>
      <!-- Book reviews -->
      <section v-if="currBook" class="book-reviews">
        <book-reviews v-if="currBook.reviews" :reviews="currBook.reviews"></book-reviews>
        <div v-else class="first-review">Be the first to review {{currBook.title}}!
          <img src="https://media0.giphy.com/media/WoWm8YzFQJg5i/giphy.gif" />
        </div>
      </section>
        <!-- Video modal -->
        <div class="video-wrapper">
          <transition name="fadeVideo">
            <div @click="closeVideoModal" v-if="showVideo" class="bg-modal">
              <i @click="closeVideoModal" class="el-icon-error close-vid"></i>
              <video-modal class="klub-modal" :videoId="videoSrc"></video-modal>
          </div>
          </transition>
        </div>
    </section>
  </main>

</template>

<script>
import ReviewModal from "../pages/ReviewModal.vue";
import ProfilesPrev from "../pages/ProfilesPrev.vue";
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
import { SET_PROFILES } from "../store/modules/ProfileModule.js";

export default {
  name: "BookPage",
  components: {
    ReviewModal,
    VideoModal,
    BookReviews,
    ProfilesPrev
  },
  data() {
    return {
      ratingVal: null,
      showModal: false,
      readState: "Add to list",
      isReadMore: false,
      showVideo: false,
      videoSrc: null,
    };
  },
  computed: {
    ...mapGetters([
      "currBook",
      "isUser",
      "loggedInUser",
      "bookRate",
      "profilesFromBook"
    ]),
    profilesFromReviews() {
      if (this.currBook === null) return [];
      var profiles = this.currBook.reviews.map(profile => {
        return {
          avatar: profile.userAvatar,
          name: profile.userName,
          _id: profile.byUserId
        };
      });
      // this.$store
      //   .commit({ type: SET_PROFILES , profiles })
      return profiles;
    }
  },
  methods: {
    showVideoModal() {
      let title = this.currBook.title + " funny book review";
      APIService.getVideo(title).then(videoSrc => {
        this.videoSrc = videoSrc;
      });
      this.showVideo = true;
    },
    closeVideoModal() {
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
    setBookToList(book) {
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

.book-reviews {
  width: 100%;
}
.img-icon {
  cursor: pointer;
}

.title-and-author {
  text-align: left;
}

.actions {
  width: 15%;
}

.bookimg-and-rate {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 0;
}

.book-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.block {
  width: 100%;
}

.book-aside {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  /* flex-flow: column nowrap; */
  /* max-width: 280px; */
  margin: 20px 20px;
}

.add-book {
  margin-bottom: 5px;
}

.book-img {
  /* max-width: 280px; */
  width: 50%;
  height: auto;
  display: block;
  margin: auto;
  margin-top: 0;
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
  text-align: left;
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
  font-size: 2em;
}

.chat-btn {
  margin-bottom: 2vw;
}

/* .fa-video-camera {
  transform: rotateY(180deg);
} */

.book-review {
  cursor: pointer;
}

.book-content {
  /* margin-top: 25px; */
  display: flex;
  flex-direction: column;
  width: 50%;
}

.close-vid {
  font-size: 2.5em;
  color: #dfdfdf;
}

.el-icon-error::before {
  position: absolute;
  top: 3.45em;
  left: 50%;
  transform: translateX(-50%);
}

.first-review {
  margin-bottom: 2vw;
}

.el-icon-error {
  cursor: pointer;
}

.book-author {
  font-size: 1.5em;
  margin-top: 0.8em;
  margin-bottom: 0.8em;
}

.profile-display {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 0.5em;
  border: 1px solid var(--main-color);
  border-radius: 1em;
  margin-right: 1.5em;
  margin-left: 1.5em;
}

.profile-title {
  margin-top: 1em;
  font-size: 2em;
}

/* Modal fade */
.fadeReview-enter-active, .fadeReview-leave-active {
  transition: opacity .5s
}
.fadeReview-enter, .fadeReview-leave-to {
  opacity: 0
}

/* Video modal fade */
.fadeVideo-enter-active, .fadeVideo-leave-active {
  transition: opacity .5s
}
.fadeVideo-enter, .fadeVideo-leave-to {
  opacity: 0
}

/* ////////////  mobile query  //////////////// */

@media screen and (max-width: 768px) {
  .book-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    margin-left: 3vw;
    margin-right: 3vw;
  }

  .vid-review {
    margin-top: 3vw;
    font-size: 2em;
  }

  .book-content {
    margin-top: 0em;
  }

  .el-icon-error::before {
    position: absolute;
    top: 1.3em;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 1em;
  }

  .book-author {
    font-size: 1.5em;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }

  .actn-btns {
  display: flex;
  justify-content: space-between;
  position: relative;
  left: .8em;
  width: 16em;
  margin-bottom: .7em;
  margin-top: .7em;
  align-items: center;
  }

  .profile-display {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 0.5em;
    border: 1px solid var(--main-color);
    border-radius: 1em;
  }

  .profile-title {
    margin-top: 0.4em;
    font-size: 1.2em;
  }

  .book-aside {
    flex-direction: column;
  }

  .book-img {
    width: 100%;
  }

  .img-icon {
    width: 25%;
  }
  .actions {
    flex-direction: row;
    width: 100%;
  }
}

.book-content {
  width: 95%;
}

.title-and-author {
  margin-top: 5%;
}

.bookimg-and-rate {
  width: 50%;
  margin: auto;
  margin-bottom: 3%;
}
</style>

 <p class="book-desc" :style="styleReadMore" @click="isReadMore = !isReadMore"></p>


  Read more function on methods:
    // styleReadMore() {
      // return {
      //   height: this.isReadMore ? "" : "300px"
      // }
    // },

