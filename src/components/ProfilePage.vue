<template>
    <div>
        <h3>profile</h3>
        <!-- <h2>{{loggedinUser.username}}</h2> -->

    </div>

</template>

<script>
import store from '../store/store.js'

export default {
  name: "ProfilePage",
  data() {
    return {};
  },
  computed : {
    // loggedInUser() {
    //   return this.$store.state.user.loggedinUser;
    // }
  }
};
</script>

<style scoped>

</style>