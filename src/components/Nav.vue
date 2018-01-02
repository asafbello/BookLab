<template>
    <div>
        <div class="line"></div> 
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item class="logo-container" index="1" >
            <router-link to="/"><img  @mouseover="toglleLogo" :class="{flip:show}" class="animated logo" src="../assets/img/logo.png"/></router-link>
            </el-menu-item>
            <el-menu-item index="1-2">Readers</el-menu-item>
            <el-menu-item index="1-3">Browse</el-menu-item>
            <div class="user-area" v-if="!loggedInUser">
              <router-link to="/user/SignUpPage"><el-menu-item index="4">Sign Up</el-menu-item></router-link>
              <router-link to="/user/SignInPage"><el-menu-item index="5">Sign In</el-menu-item></router-link>
            </div>
            <div v-else class="user-area">
              <router-link :to="'/user/' + loggedInUser._id"><el-menu-item index="5-0" v-if="isUser">Hello {{loggedInUser.username}}</el-menu-item></router-link>
              <el-submenu index="5-1">
                  <template slot="title"><i  class="fa fa-user-circle-o fa-2x userIcon" aria-hidden="true"></i></template>
                  <el-menu-item class="submenu-items" index="5-1" v-if="loggedInUser" @click="logout">Sign Out</el-menu-item>
                  <router-link :to="{path:'/user/' + loggedInUser._id}"><el-menu-item index="5-1" class="submenu-items" v-if="loggedInUser">Go To Profile</el-menu-item></router-link> 
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
      activeIndex2: "1",
      show: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {},
    logout() {
      this.$store.dispatch({ type: SIGNOUT }).then(() => {
        this.$router.push("/");
      });
    },
    toglleLogo(){
      // this.show = false
      // this.show = true
      // setTimeout(() => {this.show = false}, 3);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user.loggedinUser;
    },
       isUser() {
      return this.$store.getters.isUser;
    },
  }
};
</script>

<style>
.logo {
  max-height: 7vh;
}
.user-area {
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
}

.submenu-items {
  display: flex;
  justify-content: flex-start;
}

.fa:hover{
  cursor: pointer;
}
</style>

