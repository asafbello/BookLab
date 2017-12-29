<template>
    <div class="login">
        <h2> Please Sign In</h2>

        <el-form ref="form"  @keyup.native.enter="login">
                    <el-form-item label="User Name">
                           <el-input type="text" placeholder="User Name" v-model="loginDetails.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                            <el-input type="password" placeholder="Password" v-model="loginDetails.pass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  class="btn" type="primary"  @click.native="login">Sign In</el-button>
                            <router-link to="/"><el-button type="secondary">Cancel</el-button></router-link>
                    </el-form-item>   
        </el-form>
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

.btn {
  margin-right: 30px;
}

@media screen and (max-width: 850px) {
 .login {
  display: flex;
  flex-flow: column wrap;
  margin: auto;
  margin-top: 10%;
  width: 95%;
}

.btn {
  margin-right: 45px;
}
}
</style>