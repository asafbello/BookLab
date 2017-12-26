<template>
    <div class="left-panel">
        <h1>{{loggedinUser.username}}  </h1>
        <img :src="loggedinUser.avatar" alt="No pic avalible" class="profile-img">
        <button class="edit-btn" @click="editProfile" v-if="!isEditing"> Edit Profile</button>
        <!-- <button class="edit-btn" v-if="isEditing">Save</button> -->
        <button class="edit-btn"  @click="deleteUser(loggedinUser._id)">Delete Profile</button>
        <form class="signin-form"  v-if="isEditing">
             <el-input type="text" placeholder="name" v-model="updatedUser.name"></el-input>
             <el-input type="text" placeholder="last name" v-model="updatedUser.lastName"></el-input>
             <el-input type="text" placeholder="username" v-model="updatedUser.username"></el-input>
             <el-input type="password" placeholder="password" v-model="updatedUser.pass"></el-input>
             <el-input type="text" placeholder="Copy image URL" v-model="updatedUser.avatar"></el-input>
            <button v-if="isEditing" @click="saveUpdatedPrifile">Save</button>
            <button  v-if="isEditing" @click="isEditing = false">Cancel</button>
        </form>
    </div>

</template>

<script>
import store from "../store/store.js";
import {DELETE_USER, SIGNOUT, UPDATE_USER} from '../store/modules/UserModule.js';

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
      updatedUser : {
        username:  this.$store.state.user.loggedinUser.username,
        name:  this.$store.state.user.loggedinUser.name,
        lastName:  this.$store.state.user.loggedinUser.lastName,
        pass:  this.$store.state.user.loggedinUser.pass,
        avatar:  this.$store.state.user.loggedinUser.avatar,
        isAdmin: '',
        bookReviews:  this.$store.state.user.loggedinUser.bookReviews,
        bookRates:  this.$store.state.user.loggedinUser.bookRates,
        friends:  this.$store.state.user.loggedinUser.friends,
        readList:  this.$store.state.user.loggedinUser.readList,
        shelf:  this.$store.state.user.loggedinUser.shelf
}
    };
  },
  created() {
    var id = this.$route.params.id;
  },
  methods: {
    
    editProfile (userId, updatedUser) {
      this.isEditing = !this.isEditing
    },

    saveUpdatedPrifile() {
      var userId = this.$store.state.user.loggedinUser._id;
      //  console.log('userId: ', userId);
      //  console.log('updatedUser: ', this.updatedUser);
       this.$store.dispatch({ type: UPDATE_USER, userId, updatedUser: this.updatedUser })
       this.isEditing = !this.isEditing
        
    },

    deleteUser(userId) {
      // console.log('id ', userId)
      this.$router.push("/");
      this.$store.dispatch({ type: DELETE_USER, userId })
      this.$store.dispatch({ type: SIGNOUT, userId })
      console.log('delete');
    }
  }
};
</script>

<style scoped>
input{
  border: none;
  background: inherit;
}
.left-panel {
  width: 30%;
  margin-top: 6%;
  margin-left: 3%;
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
</style>