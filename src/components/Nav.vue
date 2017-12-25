<template>
    <div>

        <div class="line"></div>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <router-link to="/"> <el-menu-item index="3">Home</el-menu-item></router-link>
            <el-menu-item index="1">People</el-menu-item>
            <router-link to="/user/SignUpPage" v-if="!loggedInUser"><el-menu-item index="2">sign up</el-menu-item></router-link>
            <router-link to="/user/SignInPage" v-if="!loggedInUser"><el-menu-item index="4">sign In</el-menu-item></router-link>
            <el-menu-item index="1" v-if="loggedInUser">Hello {{loggedInUser.username}}</el-menu-item>


            
            </el-menu>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {}
  },
      computed : {
        loggedInUser() {
            return this.$store.state.user.loggedinUser;
        }
    }
};
</script>

<style>
.el-menu-demo {
  background-color: red;
}
</style>

