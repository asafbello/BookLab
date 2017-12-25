<template>
    <!-- <div class="login">
        <h3>Login</h3>
        <form @submit.prevent="login">
            <input type="text" v-model="loginDetails.username" placeholder="User Name" />
            <input type="password" v-model="loginDetails.pass" placeholder="password">
            <button type="submit">Login!!!!</button>
        </form>
    </div> -->
    <div class="login">
        <h2> Please Sign In</h2>
        <form @submit.prevent="login" class="login-form">
            <el-input type="text" v-model="loginDetails.username" placeholder="User Name"></el-input>
            <el-input  type="password" v-model="loginDetails.pass" placeholder="password"></el-input>
            <!-- <el-button type="primary">Sign In</el-button> -->
            <button type="submit">Login!!!!</button>
            
        </form>
    </div>
</template>

<script>
import { SIGNIN } from "../store/modules/UserModule.js";

export default {
  name: "SignInPage",
  data() {
    return {
      loginDetails: { username: "", pass: "" }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch({ type: SIGNIN, signinDetails: this.loginDetails })
        .then(_ => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          // EventBusService.$emit(SHOW_MSG,
          //     { type: 'danger', txt: err.response.data.error })
        });
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-flow: column wrap;
  /* justify-content: space-between; */
  margin: auto;
  margin-top: 10%;
  width: 35%;
  /* height: 40%; */
}
.login-form {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>