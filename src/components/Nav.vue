<template>
    <div>
        <div class="line"></div>
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item class="logo-container" index="0">
            <router-link to="/"><img class="logo" src="../assets/img/logo.png" width="125" height="125"/></router-link>
            </el-menu-item>
            <el-menu-item index="2">Readers</el-menu-item>
            <el-menu-item index="3">Browse</el-menu-item>
            <div class="user-area" v-if="!loggedInUser">
              <router-link to="/user/SignUpPage"><el-menu-item index="4">Sign Up</el-menu-item></router-link>
              <router-link to="/user/SignInPage"><el-menu-item index="5">Sign In</el-menu-item></router-link>
            </div>
            <div v-else class="user-area">
                  <i class="fa fa-user-circle fa-2x" style="color:#DDDDDD;" aria-hidden="true"></i>
              <el-submenu index="5-1">
                  <template slot="title">Hello {{loggedInUser.name}}</template>
                  <el-menu-item class="submenu-items" index="5-1" v-if="loggedInUser" @click="logout">Sign Out</el-menu-item>
                  <router-link to="/user/MyProfile"><el-menu-item index="5-1" class="submenu-items" v-if="loggedInUser">Go To Profile</el-menu-item></router-link> 
              </el-submenu>
            </div>
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
  align-items: center;
}

.submenu-items {
  display: flex;
  justify-content: flex-start;
}

</style>

