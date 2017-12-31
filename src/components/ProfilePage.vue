<template>
    <div class="main-container" v-if="loggedinUser">
  
    <el-card :body-style="{ padding: '0px' }" class="left-panel" v-if="!isEditing">
      <img :src="loggedinUser.avatar" class="profile-img">
      <div style="padding: 14px;" class="left-panel-content">
        <span>{{loggedinUser.username}}</span>
        <div class="bottom clearfix">
          <time class="time">Joind at: {{ loggedinUser.joinedAt }}</time> <br>
          <div class="profile-btns">
          <el-button type="text" class="button" @click="deleteUser(loggedinUser._id)">Delete Profile</el-button><br>
          <el-button type="text" class="button"  @click="editProfile" v-if="!isEditing">Edit Profile</el-button>
          </div>
        </div>
      </div>
    </el-card>

<section class="content-wrapper" v-if="!isEditing">
      <div class="statistics">
          <div class="statistics-item">
            <div class="icon-count">
              <p>{{pagesRead}}</p>
            <p>Pages read </p></div><i class="fa fa-book" aria-hidden="true"></i></div>
          <div class="statistics-item">
          <div class="icon-count">
            <p>{{loggedinUser.reviews.length}}</p>
            <p>Books read </p> </div><i class="fa fa-check" aria-hidden="true"></i></div>
          <div class="statistics-item">
            <div class="icon-count">
              <!-- <p>{{loggedinUser.readList.length}}</p> --> <p>0</p>
            <p>Books in read list</p> </div><i class="fa fa-calendar-minus-o" aria-hidden="true"></i></div> 
      </div>
<div class="right-panel jenres">

  

  <div class="curr-book-reading">
      <div class="book-align" v-if="loggedinUser.reviews.length != 0">
      <h3>Reading right now</h3>
      <book-preview :img-url="loggedinUser.reviews[0].review.img" ></book-preview>
      </div>
      <div class="jenres" v-if="!isEditing">
        <div class="jenres-wrapper">
        <h1>Favorite jenres</h1>
        <p v-for="jenre in loggedinUser.favoriteJenre" :key="jenre">{{jenre}}</p></div>
    </div>
  </div>

</div>
     <div class="reviews">

    <!-- <book-preview @click.native="showReview(review.review.id)" v-for="(review, idx)  in loggedinUser.reviews"  
                    :key="idx"
                    :img-url="review.review.img" ></book-preview>  -->

    <!-- <el-card v-for="(review , idx) in loggedinUser.reviews" :key="idx" :body-style="{ padding: '0px' }" class="review-cards" v-if="!isEditing && loggedinUser.reviews.length > 0">
      <img :src="review.review.img" class="image">
      <div style="padding: 14px;" class="left-panel-content">
        <div class="bottom clearfix">
          <time class="time">My rate: {{ review.review.rate }}</time> <br>
          <el-button type="text" class="button"  @click="showReview(review.review.id)" v-if="!isEditing">
            Expand
          </el-button>
          <el-button type="text" class="button"  @click="deleteReview(loggedinUser.reviews[0].review.id)">
            Delete
          </el-button>
        </div>
      </div>
    </el-card> -->
  </div>
</section>      

        <form class="signin-form "  v-if="isEditing">

          <h4>Name</h4>
             <el-input type="text" placeholder="name" v-model="updatedUser.name"></el-input>
          <h4>User Name</h4>
             <el-input type="text" placeholder="username" v-model="updatedUser.username"></el-input>
          <h4>Password</h4>
             <el-input type="password" placeholder="password" v-model="updatedUser.pass"></el-input>
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

import {
  DELETE_USER,
  SIGNOUT,
  UPDATE_USER
} from "../store/modules/UserModule.js";

export default {
  name: "ProfilePage",
  components: {
    bookPreview
  },

  computed: {
    loggedinUser() {
      return this.$store.state.user.loggedinUser;
    }
  },
  data() {
    return {
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
    // if(!this.loggedinUser) return;
    var pagesCount = this.loggedinUser.reviews.reduce((acu, curr) => {
      return acu + curr.review.pages;
    }, 0);
    this.pagesRead = pagesCount;
  },
  methods: {
    showReview(id) {
      console.log("id: ", id);
      this.$router.push(`/book/${id}/BookReviewPage`);
    },

    deleteReview(bookId) {
      console.log("bookid ", bookId);
      console.log(" this.updatedUser.reviews ", this.updatedUser);
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

       this.$confirm('This will permanently delete the Profile. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$router.push("/");
          this.$store.dispatch({ type: DELETE_USER, userId });
          this.$store.dispatch({ type: SIGNOUT, userId });
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    }
  }
};
</script>

<style scoped>

.right-panel jenres {
  display: flex;

}

.curr-book-reading > * {
  padding:  10px;
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
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  color: #999;
}

.content-wrapper {
  display: flex;
  width: 70%;
  flex-flow: row wrap;
  margin-right: 2%;
  margin-top: 2%;
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

.main-container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}

.statistics {
  display: flex;
  justify-content: space-between;
  width: 50%;
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

.left-panel {
  width: 95%;
  height: 25%;
  margin-top: 6%;
}

.el-card {
  margin: 0;
}

.content-wrapper {
  display: flex;
  width: 95%;
  flex-flow: column wrap;
  /* margin-right: 2%; */
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
}

.right-panel {
  flex-flow: row wrap
}

.right-panel  {
  width: 100%;
}

.book-align {
  align-self: flex-start;
}

.signin-form  {
  margin-left: 0;
  width: 95%;
}
}
</style>