<template>
    <div class="left-panel">
        <h1>{{loggedinUser.name}} {{loggedinUser.lastName}} </h1>
        <img :src="loggedinUser.avatar" alt="No pic avalible" class="profile-img">
        <button class="edit-btn"> Edit Profile</button>
        <button class="edit-btn"  @click="deleteUser(loggedinUser._id)">Delete Profile</button>
  <!-- <el-button type="text" @click="open2">Delete Profile</el-button> -->
    </div>


    

</template>

<script>
import store from "../store/store.js";
import {DELETE_USER, SIGNOUT} from '../store/modules/UserModule.js';

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
      userId: this.$store.state.user.loggedinUser._id
    };
  },
  created() {
    var id = this.$route.params.id;
    console.log(id);
  },
  methods: {
    deleteUser(userId) {
      console.log('id ', userId)
      this.$router.push("/");
      this.$store.dispatch({ type: DELETE_USER, userId })
      this.$store.dispatch({ type: SIGNOUT, userId })
      console.log('delete');
    }
  }
};
</script>

<style scoped>
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