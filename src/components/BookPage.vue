<template>
  <main>
    <!-- Readers' profiles -->
    <article class="profile-display" v-if="profilesFromReviews">
          <h3 class="profile-title">Also read by</h3>
          <profiles-prev :profiles="profilesFromReviews">
                          </profiles-prev>
    </article>
    <section class="book-header">
        <div class="book-aside">
           <div class="bookimg-and-rate">
                  <img v-if="currBook"
                      class="book-img"
                      :src="currBook.img" />
                      <!-- Rating -->
                      <div class="block">
                             <span class="rating-title">Avg Rating</span>
                             <el-rate v-if="bookRate"
                                     :value="bookRate"
                                      disabled show-score text-color="#ff9900"
                                      score-template="{value} stars">
                                      </el-rate>
                          <el-rate v-else :value=".5" disabled show-score text-color="#ff9900"
                          score-template="No rates yet"></el-rate>
                      </div>
              <div class="select-menu">
              <set-book-to-list-cmp :book="currBook">
              </set-book-to-list-cmp>
              </div>
        </div>

      <!-- Buy a copy btn- do not erase -->

        <!-- <i class="fa fa-shopping-cart copy-btn" @click="getBuylink" aria-hidden="true"></i> -->

      <!-- Book content -->
      <main class="book-content" v-if="currBook">
        <div>
        <div class="title-and-author">
          <h1 v-if="currBook" >{{currBook.title}}</h1>
          <span class="pageCount">{{currBook.pages }} pages 
          <i class="fa fa-file-text-o" aria-hidden="true"></i>
          </span>
        <h5 class="book-author">By {{currBook.author}}</h5>
        </div>
      </div>
          <!-- Book description start -->
        <article class="book-review">
          <!-- <p class="book-desc" v-html="currBook.desc"></p> -->
          <el-collapse>
            <el-collapse-item title="Read Book Description" name="1">
              <div v-html="currBook.desc"></div>
              
             </el-collapse-item>
          </el-collapse>
        </article>
     
          <!-- Review modal -->
        <div class="modal-wrapper">
          <transition name="fadeReview">
            <div class="bg-modal" @click="closeFromCancel" v-if="showModal" @closeModalOnEsc="showReviewModal">
            <review-modal :currBook="currBook" @click.native.stop @closeFromCancel="closeFromCancel"  class="klub-modal" @addUserReview="addRateToBook"></review-modal>
            </div>
          </transition>
        </div>
                  <div class="actions">
            <img class="img-icon" src="https://png.icons8.com/color/100/000000/youtube-play.png" @click="showVideoModal">
            <img class="img-icon" src="https://png.icons8.com/dusk/100/000000/hand-with-pen.png" @click="showReviewModal">
            <img class="img-icon" src="https://png.icons8.com/office/100/000000/collaboration.png">
            <div class="add-to-shelf" >

        </div>
        
        </div>
      </main>
        <section v-if="currBook" class="book-reviews">
          <book-reviews v-if="currBook.reviews.length !== 0" :reviews="currBook.reviews"></book-reviews>
          <div v-else class="first-review">
            <p class="gif-title">Come on, be the first to review {{currBook.title}}!</p>
            <img src="https://media.giphy.com/media/il1yesdofGlZ6/giphy.gif" />
          </div>
        </section>
      </div>

      <!-- Book reviews -->

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
import SetBookToListCmp from "../pages/SetBookToListCmp.vue";

import _ from "lodash";
import BookService from "../services/BookService.js";
import APIService from "../services/APIService.js";
import { ADD_BOOK, GET_BOOK } from "../store/modules/BookModule.js";
import {  UPDATE_USER} from "../store/modules/UserModule.js";

import { UPDATE_BOOK_AND_USER } from "../store/modules/ReviewModule.js";
import { mapGetters } from "vuex";
import { SET_PROFILES } from "../store/modules/ProfileModule.js";

export default {
  name: "BookPage",
  components: {
    ReviewModal,
    VideoModal,
    BookReviews,
    ProfilesPrev,
    SetBookToListCmp
  },
  data() {
    return {
      ratingVal: null,
      showModal: false,
      isReadMore: false,
      showVideo: false,
      videoSrc: null
    };
  },
  computed: {
    screenWidth() {
      if (window.innerWidth < 768) return true;
      else return false;
    },

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
      return profiles;
    }
  },
  methods: {
    getBuylink() {
      APIService.getSalesInfo(this.currBook.forigenId).then(saleLink => {
        console.log(saleLink);
        window.open(saleLink, "_blank");
      });
    },
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
        APIService.getBookFromGoogle(googleBookId)
          .then(function(bookToAdd) {
            console.log(bookToAdd)
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

.img-icon-select {
  margin: auto;
    background: transparent;
}
.book-reviews {
  width: 30%;
}
.img-icon {
  cursor: pointer;
  width: 25%;
  background: transparent;
}

img.img-icon {
  background: transparent;
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1vw;
  background-color: rgba(238, 238, 238, 0.808);
}
.actions *{
  background-color: rgba(247, 247, 247, 0.808);
}

.bookimg-and-rate {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 25%;
  margin: 0;
  margin-top: 5%;
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
  /* justify-content: space-between; */
  flex-direction: row;
  /* flex-flow: column nowrap; */
  /* max-width: 280px; */
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
  margin: 0vh 2vw;
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
  width: 35%;
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
  font-style: inherit;
  font-size: 1.3em;
  color: #dfdfdf;
}

.gif-title {
  padding-bottom: .3vh;
  display: flex;
  justify-content: center;
}

.el-icon-error {
  cursor: pointer;
}

.title-and-author{
  background-color: rgba(238, 238, 238, 0.808);
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
  font-size: 1em;
  color: white;
}

/* Modal fade */
.fadeReview-enter-active,
.fadeReview-leave-active {
  transition: opacity 0.5s;
}
.fadeReview-enter,
.fadeReview-leave-to {
  opacity: 0;
}

/* Video modal fade */
.fadeVideo-enter-active,
.fadeVideo-leave-active {
  transition: opacity 0.5s;
}
.fadeVideo-enter,
.fadeVideo-leave-to {
  opacity: 0;
}



/* ////////////  mobile query  //////////////// */

@media screen and (max-width: 768px) {
  .book-reviews {
    width: 100%;
    margin-top: 3%;
  }

  .el-input {
    width: 100%;
  }

  .select-menu-mobile {
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    margin: auto;
    margin-top: 5%;
    width: 100%;
  }

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
    left: 0.8em;
    width: 16em;
    margin-bottom: 0.7em;
    margin-top: 0.7em;
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
    font-size: .9em;
    color: white;
  }

  .book-aside {
    flex-direction: column;
  }

  .book-img {
    width: 100%;
  }

  .select-menu {
    width: 50%;
    margin-top: 15%;
  }

  .img-icon {
    width: 100%;
  }

  .actions {
    flex-direction: row;
    width: 100%;
  }

  .book-content {
    width: 95%;
  }

  .title-and-author {
    margin-top: 5%;
    text-align: center;
    text-align: left;
  }

  .bookimg-and-rate {
    width: 50%;
    margin: auto;
    margin-bottom: 3%;
  }
}
</style>





