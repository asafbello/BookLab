<template>
    <div class="main-container">
  
    <el-card :body-style="{ padding: '0px' }" class="left-panel" v-if="!isEditing">
      <img :src="loggedinUser.avatar" class="image">
      <div style="padding: 14px;" class="left-panel-content">
        <span>{{loggedinUser.username}}</span>
        <div class="bottom clearfix">
          <time class="time">Joind at: {{ loggedinUser.joinedAt }}</time> <br>
          <el-button type="text" class="button" @click="deleteUser(loggedinUser._id)">Delete Profile</el-button><br>
          <el-button type="text" class="button"  @click="editProfile" v-if="!isEditing">Edit Profile</el-button>
        </div>
      </div>
    </el-card>

<section class="content-wrapper">
      <div class="statistics" v-if="!isEditing">
          <div class="statistics-item"><p>Pages read </p><i class="fa fa-book" aria-hidden="true"></i></div>
          <div class="statistics-item"><p>Books read </p><i class="fa fa-check" aria-hidden="true"></i></div>
          <div class="statistics-item"><p>Books in read list</p> <i class="fa fa-calendar-minus-o" aria-hidden="true"></i></div> 
      </div>
   <div class="jenres">
     <div class="jenres-wrapper">
     <h1>Favorie jenres</h1>
     <p v-for="jenre in loggedinUser.favoriteJenre">{{jenre}}</p></div>
     </div>
  </section>      

        <form class="signin-form "  v-if="isEditing">

    <el-card :body-style="{ padding: '0px' }" class="profile-pic-edit" v-if="isEditing">
      <img :src="loggedinUser.avatar" class="image">
      <div style="padding: 14px;" class="left-panel-content">
        <span>{{loggedinUser.username}}</span>
        <div class="bottom clearfix">
          <time class="time">Joind at: {{ loggedinUser.joinedAt }}</time> <br>
        </div>
      </div>
    </el-card>

          <h4>Name</h4>
             <el-input type="text" placeholder="name" v-model="updatedUser.name"></el-input>
          
          <h4>Last Name</h4>
             <el-input type="text" placeholder="last name" v-model="updatedUser.lastName"></el-input>

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

import {
  DELETE_USER,
  SIGNOUT,
  UPDATE_USER
} from "../store/modules/UserModule.js";

export default {
  name: "ProfilePage",
  computed: {
    loggedinUser() {
      return this.$store.state.user.loggedinUser;
    }
  },
  data() {
    return {
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
        readList: this.$store.state.user.loggedinUser.readList,
        joinedAt: this.$store.state.user.loggedinUser.joinedAt
      }
    };
  },
  created() {
    var id = this.$route.params.id;
  },
  methods: {
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
      this.$router.push("/");
      this.$store.dispatch({ type: DELETE_USER, userId });
      this.$store.dispatch({ type: SIGNOUT, userId });
    }
  }
};
</script>

<style scoped>
.jenres {
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  color: #999;
}

.content-wrapper {
  display: flex;
  width: 70%;
  flex-flow: row wrap;
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
  margin-top: 6%;
  margin-right: 15%;
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
</style>