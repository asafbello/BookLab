<template>
    <div>
        <div class="line"></div>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item class="logo-container" index="0">
            <img class="logo" src="../assets/img/logo.png" width="125" height="125"/>
            </el-menu-item>
            <el-menu-item index="2">Readers</el-menu-item>
            <el-menu-item index="3">Browse</el-menu-item>
            <div class="user-area">
              <router-link to="/user/SignUpPage" v-if="!loggedInUser"><el-menu-item index="4">sign up</el-menu-item></router-link>
              <router-link to="/user/SignInPage" v-if="!loggedInUser"><el-menu-item index="5">sign In</el-menu-item></router-link>
            </div>
            <el-submenu index="6" v-if="loggedInUser">
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

.logo {
  align-items: center;
  margin-top: -33px;
  margin-right: -33px;
  /* margin-left: -20px; */
}

.user-area {
  display: flex;
  justify-content: flex-end;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
}
</style>

