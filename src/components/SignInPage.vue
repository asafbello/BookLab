<template>
    <div class="login">
          <el-form ref="form" :model="loginDetails"  class="login-form" :rules="rules"> 
             <h2> Sign In to BookLab</h2>
            <el-form-item label="Your BookLab User Name" prop="username">
                <el-input type="text" v-model="loginDetails.username" placeholder="User Name"></el-input>
            </el-form-item>
             <el-form-item label="Your Password" prop="pass">
                <el-input  type="password" v-model="loginDetails.pass" placeholder="Password"></el-input>
             </el-form-item>
            <el-form-item>
                 <el-button type="primary" @click.native="login">Sign In To  BookLab</el-button>
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
      loginDetails: {
        username: null,
        pass: null
      },
      rules: {
        username: [
          { required: true, message: "Please input user name", trigger: "blur" }
        ],
        pass: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur"
          },
          { min: 2, message: "Your password need to be at least 2" }
        ]
      }
    };
  },
  methods: {
    login() {
      if (!this.loginDetails.pass && !this.loginDetails.username) {
        this.$message({
          message: "Please fill your username and pssowrd",
          type: "warning"
        });
      } else {
        this.$store
          .dispatch({ type: SIGNIN, signinDetails: this.loginDetails })
          .then(res => {
            this.$router.push("/");
          })
          .catch(err => {
            this.$message.error("Sorry, wrong username or password");
          });
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-flow: column wrap;
  margin: auto;
  margin-top: 10%;
  width: 35%;
}
.login-form {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.login-form * {
  /* margin: 1vw; */
  width: 100%;
}

@media screen and (max-width: 650px) {
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