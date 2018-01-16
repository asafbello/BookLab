<template>
  <main>
    <!-- Readers' profiles -->
    <p class="profile-display"><i class="fa fa-user" aria-hidden="true"></i>Also Read By</p>
    <profiles-prev :profiles="profilesFromReviews"></profiles-prev>

      <!-- Page start -->
      <section class="book-header">
        <div class="book-aside">
          <div class="left-side">
           <div class="bookimg-and-rate">
            <img v-if="currBook" class="book-img" :src="currBook.img" />
                  
            <!-- Rating -->
              <div class="block">
                <span class="rating-title">Avg Rating</span>
                <el-rate v-if="bookRate" :value="bookRate"
                disabled show-score text-color="#ff9900"
                score-template="{value} stars">s</el-rate>
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
          </span>
          <hr>
        <h5 class="book-author">By {{currBook.author}}</h5>
        </div>
      </div>
          <!-- Book description start -->
        <article class="book-review">
          <p class="book-desc" v-html="currBook.desc" @click="readMore"></p>
          <!-- <el-collapse> 
            <el-collapse-item title="Read Book Description" name="1">
              <div v-html="currBook.desc"></div> 
             </el-collapse-item>
          </el-collapse> -->
        </article>
     
          <!-- Review modal -->
        <div class="modal-wrapper">
          <transition name="fadeReview">
            <div class="bg-modal" @click="closeFromCancel" v-if="showModal" @closeModalOnEsc="showReviewModal">
            <review-modal :currBook="currBook" @click.native.stop @closeFromCancel="closeFromCancel" 
             class="klub-modal" @addUserReview="addRateToBook"></review-modal>
            </div>
          </transition>
        </div>
          <div class="actions">
            <span @click="showVideoModal">Video Review 
            <i class="fa fa-video-camera" aria-hidden="true" @click="showVideoModal"></i>
            </span>
            
            <span @click="showReviewModal">Add Review <i class="fa fa-pencil-square-o" aria-hidden="true" @click="showReviewModal"></i></span>
            <!-- <span>Join Chat</span>
            <i class="fa fa-comments-o" aria-hidden="true"></i> -->
            <span @click="getBuylink">Buy Copy
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
        </div>
      </main>
      </div>
              <!-- Video modal -->
        <div class="video-wrapper">
          <transition name="fadeVideo">
            <div @click="closeVideoModal" v-if="showVideo" class="bg-modal">
              <i @click="closeVideoModal" class="el-icon-error close-vid"></i>
              <video-modal class="klub-modal" :videoId="videoSrc"></video-modal>
          </div>
          </transition>
        </div>
      <!-- Book reviews -->
      <div class="border"></div>
        <section v-if="currBook" class="book-reviews">
          <book-reviews v-if="currBook.reviews.length !== 0" :reviews="currBook.reviews"></book-reviews>
          <div v-else class="first-review">
            <p class="gif-title">Come on, be the first to review "{{currBook.title}}"</p>
            <img @click="showReviewModal" class="book-gif" src="https://media.giphy.com/media/il1yesdofGlZ6/giphy.gif" />
            <span class="gif-btn" @click="showReviewModal">
              <span @click="showReviewModal" class="gif-btn-txt">Add Review</span>
            <i class="fa fa-pencil-square-o gif" aria-hidden="true" @click="showReviewModal"></i>
              </span>
          </div>
        </section>
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
    readMore() {

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

/* Profiles display */

.profile-display {
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  background: #ffffffde;
  color:black;
  width: 33vw;
  display: flex;
  margin: auto;
  margin-top: 6vh; 
  margin-bottom: 1vh;
}

.fa-user:before {
  padding-right: 1vw;
}

/* ///// Profile Display end ///// */

/* Scrollbar  */

::-webkit-scrollbar {
    width: .8vw;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: .8vw;
}
 
::-webkit-scrollbar-thumb {
    border-radius: .8vw;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

/* Scrollbar end */

.img-icon-select {
  margin: auto;
    background: transparent;
    display: none;

}
.book-reviews {
  max-width: 30%;
  padding-right: 2vw;

}

.reviews-header {
    overflow-y: scroll;
    height: 100%;
}

.left-side {
  display: flex;
}
.border {
  position: relative;
  padding: 0 2em;
}
.border::after {
  content: '';
  position: absolute;
  height: 100%;
  border-right: 1px solid black;
  left: calc(50% - 1px)
}

.img-icon {
  cursor: pointer;
  width: 25%;
  background: transparent;
}

img.img-icon {
  background: transparent;
}

.gif-btn-txt {
  padding-right: 2vw;
  cursor: pointer;
}

.book-gif {
  border: black;
  width: 100%;

}

.fa-pencil-square-o gif {
  padding-right: 1vw;
}

.gif-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  margin-top: 2vh;
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: row wrap;
  justify-content: space-around;
  margin-top: 4vw;
  cursor: pointer;
  font-size: 1.2em;
}

.bookimg-and-rate {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
}

.book-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffffde;
  margin-top: 4vh;
  margin-right: 2vw;
  margin-left: 2vw;
  height: 55vh;
}

.block {
  width: 100%;
}

.book-aside {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2vh 2vw;
  width: 100%;
}

.add-book {
  margin-bottom: 5px;
}

.book-img {
  width: 50%;
  height: auto;
  display: block;
  margin: auto;
  margin-top: 0;
  margin-bottom: 15px;
  cursor: pointer;
}

.pageCount {
  font-size: 16px;
}

.down-arrow {
  margin-left: 5px;
}

.book-desc {
   display: flex column;
   height: 15vh;
  /* width: 30vw;  */
  padding-right: 2vw;
  padding-left: 2vw;
  /* overflow-y: scroll; */
  text-align: center;

}

.add-to-shelf {
  display: flex;
  flex-direction: row;
}
.add-to-shelf * {
  margin: 0.3vw;
}

.book-review {
  cursor: pointer;
  display: flex column;
  justify-content: flex-end;
  height: 18vh;
  width: 40vw;
  overflow-y: scroll;
}

.book-content {
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}

.gif-title {
  padding-bottom: .3vh;
  display: flex;
  justify-content: center;
  color: black;
  font-family: inherit;
  font-weight: bold;
  margin-top: 0;
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

.select-menu {
  margin-right: 5vw;
  margin-left: 5vw
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

  section.select-menu {
    display: none;
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
    width: 100%;
    padding-top: 1vh;
  }

  .book-img {
    width: 100%;
    cursor: pointer;
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





