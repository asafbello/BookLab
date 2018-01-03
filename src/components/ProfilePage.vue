<template>
  <section>
  <div class="no-user" v-if="noProfile"><h1>Sorry 404 No Profile avilable</h1></div>
  <div v-else class="main-container">
          <profile-card :proflie="currProfile"
                         :isUser="isProfileOfLoggenInUser"
                          @delete="deleteUser" @edit="editProfile">
          </profile-card>
  <section class="content-wrapper">
      <div class="statistics-wrapper">
          <proflie-statistics :proflie="currProfile"  :isUser="isProfileOfLoggenInUser">
          </proflie-statistics>
      </div>
      <div>
        <h2>Wish List</h2>
          <hr>
          <div class="read-list">
              <book-preview class="book-preview"
                            v-for="(book1, index) in currProfile.wishList"
                            :img-url="book1.img" :key="index" @click.native="goTobookDetails(book1.forigenId)">
                            </book-preview>
          </div>
        <h2>Books read</h2>
          <hr>
          <div class="read-list">
              <book-preview class="book-preview"
                             v-for="(book , index) in currProfile.readList"
                            :img-url="book.img" :key="index" @click.native="goTobookDetails(book.forigenId)">
                            </book-preview>
          </div>
      </div>
    <!-- <div class="right-panel jenres">
          <div class="curr-book-reading">
                <div class="book-align">
                    <h3>Reading right now</h3>
                          <book-preview :img-url="currProfile.currentlyReading.img"
                                        @click.native="goTobookDetails(currProfile.currentlyReading.forigenId)">
                            </book-preview>
                </div>
                <div class="jenres" v-if="!isEditing">
                  <div class="jenres-wrapper">
                      <h1>Favorite jenres</h1>
                      <p v-for="jenre in currProfile.favoriteJenre" :key="jenre">{{jenre}}</p>
                    </div>
                </div> -->

    <!-- </div>
    </div> -->
  </section>      
        <!-- <form class="signin-form " v-if="isEditing">
          <h4>Password</h4>
             <el-input type="password" placeholder="password" v-model="updatedUser.pass"></el-input>
          <h4>User Name</h4>
             <el-input type="text" placeholder="username" v-model="updatedUser.username"></el-input>
          <h4>Profile Image</h4>
             <el-input type="text" placeholder="Copy image URL" v-model="updatedUser.avatar"></el-input>
            <el-button type="default" v-if="isEditing" @click="isEditing = false">Cancel</el-button>
            <el-button type="default" v-if="isEditing" @click="saveUpdatedPrifile">Save</el-button>
        </form> -->
        </div>
  </section>
</template>

<script>
import ShelfCmp from "./ShelfCmp";
import store from "../store/store.js";
import bookPreview from "./BookPreview";
import ProfileCard from "../pages/ProfileCard";
import ProflieStatistics from "../pages/ProflieStatistics";

import {
  DELETE_USER,  SIGNOUT,  UPDATE_USER,  REMOVE_FROM_WISH_LIST} from "../store/modules/UserModule.js";
import {GET_PROFILE} from "../store/modules/ProfileModule.js";

export default {
  name: "ProfilePage",
  components: {
    ProfileCard,
    ProflieStatistics,
    bookPreview,
  },

  computed: {
    currProfile() {
      return this.$store.state.profile.currProfile;
    },
    isProfileOfLoggenInUser() {
      return this.$store.state.user.loggedinUser._id === this.$store.state.profile.currProfile._id
    },
    screenWidth() {
      if (window.innerWidth > 1300) {
        return 5;
      } else if (window.innerWidth > 768) {
        return 4;
      } else {
        return 3;
      }
    }
  },
  data() {
    return {
      noProfile: false,
      userImg: null,
      userId: this.$store.state.user.loggedinUser._id,
      isEditing: false,
      updatedUser: {
        username: this.$store.state.user.loggedinUser.username,
        name: this.$store.state.user.loggedinUser.name,
        avatar: this.$store.state.user.loggedinUser.avatar,
        reviews: this.$store.state.user.loggedinUser.bookReviews,
        readList: this.$store.state.user.loggedinUser.uBooks,
      }
    };
  },
  created() {
    //GETTING PROFILE FROM PARMARS ID
    var id = this.$route.params.id;
    var self = this
    this.$store
      .dispatch({
        type: GET_PROFILE,
        id
      })
      .then(_ => { console.log('finy your proflie')})
      .catch(err => {
          self.noProfile = true})
  },
  methods: {
    goTobookDetails(id) {
      // ADD SOME TRANSITON
      this.$router.push(`/book/${id}`);
    },
    deleteReview(bookId) {
      // this.updatedUser.reviews = this.updatedUser.reviews.filter(review => review.id != bookId)
      // var userId = this.$store.state.user.loggedinUser._id;
      // this.$store.dispatch({
      //   type: UPDATE_USER,
      //   userId,
      //   user
      // });
    },

    editProfile(userId, updatedUser) {
      console.log('editind');
      // this.isEditing = !this.isEditing;
    },

    saveUpdatedPrifile() {
      if (this.updatedUser.avatar === "" || null) {
        this.updatedUser.avatar =
          "http://www.nanigans.com/wp-content/uploads/2014/07/Generic-Avatar.png";
      }
      var userId = this.$store.state.user.loggedinUser._id;
      this.$store.dispatch({
        type: UPDATE_USER,
        userId,
        updatedUser: this.updatedUser
      });
      this.isEditing = !this.isEditing;
    },

    deleteUser() {
      var userId = this.$store.state.user.loggedinUser._id
      this.$confirm(
        "This will permanently delete the Profile. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          this.$router.push("/");
          this.$store.dispatch({ type: DELETE_USER, userId });
          this.$store.dispatch({ type: SIGNOUT, userId });
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    }
  }
};
</script>

<style scoped>
.read-list {
  display: flex;
  margin-top: 5%;
}

.book-preview {
  width: 100px;
}
.icon {
  margin: auto;
}

.curr-book-reading > * {
  padding: 10px;
}
.curr-book-reading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.review-cards {
  width: 15%;
  /* margin-top: 6%; */
  margin-left: 3%;
}

.reviews {
  width: 100%;
  display: flex;
  /* height: 200px; */
}
.jenres {
  /* width: 50%; */
  display: flex;
  justify-content: space-evenly;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  color: #999;
  justify-content: flex-end;
}

.content-wrapper {
  display: flex;
  width: 70%;
  flex-flow: row wrap;
  margin-right: 2%;
  margin-top: 2%;
  justify-content: space-between;
}

.profile-pic-edit {
  width: 45%;
}

.signin-form {
  margin-left: 5%;
  margin-top: 3%;
}

.signin-form > * {
  margin-bottom: 5px;
}

h4 {
  color: #999;
  text-align: left;
}

h3 {
  margin-bottom: 7%;
  font-size: 1em;
}

.wrapper {
  display: flex;
  flex-flow: column;
}

.statistics-wrapper {
  width: 60%;
  color: #999;
  padding-bottom: 5%;
}

.main-container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}

.fa {
  font-size: 5em;
}

input {
  border: none;
  background: inherit;
}

h1 {
  font-size: 2em;
  text-align: center;
}

h2 {
  margin-top: 5%;
}

.edit-btn {
  width: 100%;
}

/* ////////////  mobile query  //////////////// */

@media screen and (max-width: 768px) {
  .main-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
  }

  .content-wrapper {
    display: flex;
    width: 95%;
    flex-flow: column wrap;
    justify-content: space-between;
    margin-top: 2%;
  }
  .curr-book-reading {
    flex-direction: row;
    margin-top: 5%;
  }

  .right-panel {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: space-around;
  }

  .right-panel.jenres {
    width: unset;
    justify-content: space-around;;
  }

  .book-align {
    align-self: flex-start;
  }

  .signin-form {
    margin-left: 0;
    width: 95%;
  }

  .statistics-wrapper {
    width: 100%;
  }
}
</style>