<template>
    <div>

        <div class="line"></div>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <router-link to="/"> <el-menu-item index="3">Home</el-menu-item></router-link>
            <el-menu-item index="1">Readers</el-menu-item>
            <router-link to="/user/SignUpPage" v-if="!loggedInUser"><el-menu-item index="2">sign up</el-menu-item></router-link>
            <router-link to="/user/SignInPage" v-if="!loggedInUser"><el-menu-item index="4">sign In</el-menu-item></router-link>

            <el-submenu index="5"  v-if="loggedInUser">
              <template slot="title">Hello {{loggedInUser.name}}</template>
                <el-menu-item index="5-1" v-if="loggedInUser" @click="logout">Sign Out</el-menu-item>
                <router-link to="/user/MyProfile"><el-menu-item index="5-1" v-if="loggedInUser">Go to profile</el-menu-item></router-link> 
            </el-submenu>

            </el-menu>
    </div>
</template>
<script>

import { SIGNOUT } from '../store/modules/UserModule.js';

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {},
    logout() {
      this.$store.dispatch({ type: SIGNOUT }).then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
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

