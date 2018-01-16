<template>
  <section v-if="currProfile">
    <div class="no-user" v-if="noProfile"><h1>Sorry 404 No Profile avilable</h1></div>
      <div v-else class="main-container">
        <profile-card :profile="currProfile"
                        :isUser="isProfileOfLoggedInUser"
                        @delete="deleteUser" @edit="editProfile">
        </profile-card>
    <section class="content-wrapper">
      <div class="statistics-wrapper">
        <profile-statistics :profile="currProfile" :isUser="isProfileOfLoggedInUser">
        </profile-statistics>
      </div>
        <div>
          <h2 class="list-title">Currently Reading</h2>
          <hr>
            <div class="read-list"   >           
              <book-preview class="book-preview" 
                            :imgUrl="currProfile.currentlyReading.img"
                              @click.native="goTobookDetails(currProfile.currentlyReading.forigenId)">
                              <!-- <img src="currProfile.currentlyReading.img" alt=""> -->
                            </book-preview>
          </div>
          <h2 class="list-title">Wish List</h2>
          <hr>
            <div class="read-list">
              <book-preview class="book-preview"
                            v-for="(book1, index) in currProfile.wishList"
                            :img-url="book1.img" :key="index" @click.native="goTobookDetails(book1.forigenId)">
              </book-preview>
        </div>
          <h2 class="list-title">Books read</h2>
            <hr>
              <div class="read-list" v-for="(book , index) in currProfile.readList" :key="index">
                <!-- <img :src="book.img" alt=""> -->
                <!-- <p>{{currProfile.readList[0].review.img}}</p> -->
                <book-preview v-if="book.review" class="book-preview" 
                            :img-url="book.review.img"
                              @click.native="goTobookDetails(book.forigenId)">
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
  <div class="trivia-area">
    <h1>Where's your favourite reading spot?</h1>
      <hr>
      <img class="trivia-img" src="../assets/img/spots/beach.jpg"  >
      <hr>
      <div class="checkout-header">
        <span class="checkout-price">17%</span>
      </div>
      <img class="trivia-img" src="../assets/img/spots/home.jpg"  >
      <hr>
      <div class="checkout-header">
        <span class="checkout-price">44%</span>
      </div>
      <img class="trivia-img" src="../assets/img/spots/park.jpg" >
      <hr>
      <div class="checkout-header">
        <span class="checkout-price">39%</span>
      </div>

  </div>
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
import ProfileStatistics from "../pages/ProfileStatistics";

import {
  DELETE_USER,
  SIGNOUT,
  UPDATE_USER,
  REMOVE_FROM_WISH_LIST
} from "../store/modules/UserModule.js";
import { GET_PROFILE } from "../store/modules/ProfileModule.js";

export default {
  name: "ProfilePage",
  components: {
    ProfileCard,
    ProfileStatistics,
    bookPreview
  },

  computed: {
    currProfile() {
      console.log("inside currPurfike", this.$store.state);
      return this.$store.state.profile.currProfile;
    },
    isProfileOfLoggedInUser() {
      console.log("before the check");
      try {
        return (
          this.$store.state.user.loggedinUser._id ===
          this.$store.state.profile.currProfile._id
        );
      } catch (error) {
        return false;
      }
      // this.$store.state.user.loggedinUser._id === this.$store.state.profile.currProfile._id)
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
        readList: this.$store.state.user.loggedinUser.uBooks
      }
    };
  },
  created() {
    //GETTING PROFILE FROM PARMARS ID
    var id = this.$route.params.id;
    var self = this;
    this.$store
      .dispatch({
        type: GET_PROFILE,
        id
      })
      .then(_ => {
        console.log("finy your profile");
      })
      .catch(err => {
        self.noProfile = true;
      });
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
      console.log("editind");
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
      var userId = this.$store.state.user.loggedinUser._id;
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

.checkout-header {
  position: relative;
  margin: -15px -15px 15px;
}

.checkout-price {
  position: absolute;
  top: -14px;
  right: -14px;
  width: 40px;
  font: 14px/40px Helvetica, Arial, sans-serif;
  color: white;
  text-align: center;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
  text-indent: -1px;
  letter-spacing: -1px;
  background: #e54930;
  border: 1px solid;
  border-color: #b33323 #ab3123 #982b1f;
  border-radius: 21px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: -webkit-linear-gradient(top, #f75a3b, #d63b29);
  background-image: -moz-linear-gradient(top, #f75a3b, #d63b29);
  background-image: -o-linear-gradient(top, #f75a3b, #d63b29);
  background-image: linear-gradient(to bottom, #f75a3b, #d63b29);
  -webkit-box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
}
.checkout-price:before {
  content: '';
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  right: 3px;
  border: 2px solid #f5f8fb;
  border-radius: 18px;
  -webkit-box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 -1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 -1px 1px rgba(0, 0, 0, 0.25);
}


/* Trivia Area */

.trivia-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff99;
  margin: 0;
  padding: 0 1vw;
  width: 30%;
  /* height: 100%; */
  cursor: pointer;
  }

  .trivia-img {
    width: 50%;
    height: auto;
  }

  .trivia-area > h1 {
    border-bottom: 1px solid black;
    padding-bottom: .5vh;
  }



.read-list {
  display: flex;
  margin-top: 5%;
}

.list-title {
  background: #ffffff99;
  color: black;
  width: 33vw;
  height: 5vh;
  margin: auto;
  margin-top: 6vh; 
  margin-bottom: 1vh;
  font-size: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-preview {
  width: 100px;
  cursor: pointer;
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
  /* width: 70%; */
  flex-flow: column wrap;
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
  width: 100%;
  height: 15vh;
  color: #999;
  padding-bottom: 2%;
  background: #ffffffde;
}

.main-container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
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
    justify-content: space-around;
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

  .list-title {
    height: 9vh;
    display: flex;
    align-items: center;
  }
}
</style>