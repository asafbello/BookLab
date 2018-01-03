<template>
    <div class="main-container" v-if="loggedinUser">
  
    <el-card :body-style="{ padding: '0px' }" class="left-panel" v-if="!isEditing">
      <img :src="loggedinUser.avatar" class="profile-img">
      <div style="padding: 14px;" class="left-panel-content">
        <span>{{loggedinUser.username}}</span>
        <div class="bottom clearfix">
          <time class="time">Joined at: {{ loggedinUser.joinedAt }}</time> <br>
          <div class="profile-btns">
          <el-button type="text" class="button" @click="deleteUser(loggedinUser._id)"  v-if="!isEditing && loggedinUser._id === activeUser._id">Delete Profile</el-button><br>
          <el-button type="text" class="button"  @click="editProfile" v-if="!isEditing && loggedinUser._id === activeUser._id">Edit Profile</el-button>
          </div>
        </div>
      </div>
    </el-card>
<section class="content-wrapper" v-if="!isEditing">
  <div class="statistics-wrapper">
      <div class="statistics">
          <div class="statistics-item">
            <div class="icon-count">
              <p>{{pagesRead}}</p>
            <p>Pages read </p></div><img class="icon" src="https://png.icons8.com/dusk/64/open-book.png" title="Open Book" width="64" height="64"></div>
          <div class="statistics-item">
          <div class="icon-count">
            <p>{{loggedinUser.readList.length}}</p>
            <p>Books read </p> </div><img @click="showWishList(loggedinUser.readList)" class="icon" src="https://png.icons8.com/nolan/64/checkmark.png" title="Checkmark" width="64" height="64"></div>
          <div class="statistics-item">
            <div class="icon-count">
              <p>{{loggedinUser.wishList.length}}</p>
            <p>Books in wish list</p> </div><img @click="showWishList(loggedinUser.wishList)" class="icon" src="https://png.icons8.com/dusk/64/book-shelf.png" title="Book Shelf" width="64" height="64">
            </div> 
  </div>
        <h2>Wish List</h2>
        <hr>
      <div class="read-list">
          <book-preview class="book-preview" v-for="(book1, index) in loggedinUser.wishList.slice(0, screenWidth)" :img-url="book1.img" :key="index" @click.native="goTobookDetails(book1.forigenId)"></book-preview>
      </div>
        <h2>Books read</h2>
        <hr>
      <div class="read-list">
          <book-preview class="book-preview" v-for="(book , index) in loggedinUser.readList.slice(0, screenWidth)" :img-url="book.img" :key="index" @click.native="goTobookDetails(book.forigenId)"></book-preview>
      </div>
  </div>
<div class="right-panel jenres">

  <div class="curr-book-reading">
      <div class="book-align">
      <h3>Reading right now</h3>
      <book-preview :img-url="loggedinUser.currentlyReading.img" @click.native="goTobookDetails(loggedinUser.currentlyReading.forigenId)"></book-preview>
      </div>
      <div class="jenres" v-if="!isEditing">
        <div class="jenres-wrapper">
        <h1>Favorite jenres</h1>
        <p v-for="jenre in loggedinUser.favoriteJenre" :key="jenre">{{jenre}}</p></div>
    </div>
  </div>
</div>

<modal-component v-if="showWishListModal" :list="modalList" @closeFromCancel="showWishList"></modal-component>



</section>      

        <form class="signin-form " v-if="isEditing">
          <h4>Password</h4>
             <el-input type="password" placeholder="password" v-model="updatedUser.pass"></el-input>
          <h4>User Name</h4>
             <el-input type="text" placeholder="username" v-model="updatedUser.username"></el-input>
          <h4>Profile Image</h4>
             <el-input type="text" placeholder="Copy image URL" v-model="updatedUser.avatar"></el-input>

            <el-button type="default" v-if="isEditing" @click="isEditing = false">Cancel</el-button>
            <el-button type="default" v-if="isEditing" @click="saveUpdatedPrifile">Save</el-button>
        </form>
    </div>

</template>

<script>
import ShelfCmp from "./ShelfCmp";
import store from "../store/store.js";
import bookPreview from "./BookPreview";
import ModalComponent from "./ModalComponent";

import {
  DELETE_USER,
  SIGNOUT,
  UPDATE_USER,
  GET_USER,
  REMOVE_FROM_WISH_LIST
} from "../store/modules/UserModule.js";

export default {
  name: "ProfilePage",
  components: {
    bookPreview,
    ModalComponent
  },

  computed: {
    loggedinUser() {
      // return this.$store.state.user.loggedinUser;
      return this.$store.state.user.currProfile;
    },

    activeUser() {
      return this.$store.state.user.loggedinUser;
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
      modalList: "",
      showWishListModal: false,
      pagesRead: 0,
      userImg: null,
      userId: this.$store.state.user.loggedinUser._id,
      isEditing: false,
      updatedUser: {
        username: this.$store.state.user.loggedinUser.username,
        name: this.$store.state.user.loggedinUser.name,
        lastName: this.$store.state.user.loggedinUser.lastName,
        pass: this.$store.state.user.loggedinUser.pass,
        avatar: this.$store.state.user.loggedinUser.avatar,
        isAdmin: "",
        reviews: this.$store.state.user.loggedinUser.bookReviews,
        friends: this.$store.state.user.loggedinUser.friends,
        readList: this.$store.state.user.loggedinUser.uBooks,
        joinedAt: this.$store.state.user.loggedinUser.joinedAt
      }
    };
  },
  created() {
    var id = this.$route.params.id;
    this.$store
      .dispatch({
        type: GET_USER,
        id: id
      })
      .then(x => {
        var pagesCount = this.$store.state.user.currProfile.readList.reduce(
          (acu, curr) => {
            return acu + curr.pages;
          },
          0
        );
        this.pagesRead = pagesCount;
      });
  },
  methods: {
    goTobookDetails(id) {
      console.log('id: ', id);
      // this.$router.push(`/book/${this.loggedinUser.currentlyReading._id}`);
      this.$router.push(`/book/${id}`);
    },

    showWishList(listType) {
      document.addEventListener("keyup", evt => {
        if (evt.keyCode === 27) {
          this.showWishListModal = false;
        }
      });
      this.modalList = listType;
      this.showWishListModal = !this.showWishListModal;
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
      this.isEditing = !this.isEditing;
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

    deleteUser(userId) {
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

.profile-btns {
  display: flex;
  flex-direction: column;
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

.shelf {
  width: 30%;
}

.statistics-item {
  display: flex;
  flex-direction: column-reverse;
  color: #999;
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

.statistics {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-self: flex-start;
}

.fa {
  font-size: 5em;
}

input {
  border: none;
  background: inherit;
}
.left-panel {
  width: 15%;
  margin-top: 6%;
  margin-left: 3%;
  align-self: flex-start;
}

.left-panel-content {
  display: flex;
  flex-flow: column;
}

.left-panel-content > * {
  margin-bottom: 5px;
}

.left-panel > * {
  margin-bottom: 10px;
}

h1 {
  font-size: 2em;
}

h2 {
  margin-top: 5%;
}

.profile-img {
  width: 100%;
}

.edit-btn {
  width: 100%;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix {
  display: flex;
  flex-direction: column;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* ////////////  mobile query  //////////////// */

@media screen and (max-width: 768px) {
  .main-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
  }

  .statistics-wrapper {
    width: 100%;
  }

  .left-panel {
    width: 95%;
    height: 25%;
    margin-top: 6%;
    margin: auto;
  }

  .content-wrapper {
    display: flex;
    width: 95%;
    flex-flow: column wrap;
    justify-content: space-between;
    margin-top: 2%;
  }

  .statistics {
    width: 100%;
    justify-content: space-around;
    margin-top: 1%;
  }

  .profile-img {
    margin-top: 2%;
    width: 40%;
  }

  .profile-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
}
</style>