<template>
    <div class="login">
        <h2> Please Sign In</h2>

        <el-form ref="form" :model="loginDetails" :rules="rules" @keyup.native.enter="login(loginDetails)">
                    <el-form-item label="User Name">
                           <el-input type="text" placeholder="User Name" v-model="loginDetails.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                            <el-input type="password" placeholder="Password" v-model="loginDetails.pass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  class="btn" type="primary"  @click.native="login(loginDetails)">Sign In</el-button>
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
      loginDetails: { username: "", pass: "" },
            rules: {
        name: [
          {
            required: true,
            message: "Please input Your name",
            trigger: "blur"
          }
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
    login(formName) {
      let valid = true;
      if (formName.username <= 1 || formName.pass <= 2) valid = false;
      if (valid) {
      this.$store
        .dispatch({ type: SIGNIN, signinDetails: this.loginDetails })
        .then(_ => {
////////////////////need to fix, promise always then and never catch///////////////////////
          
          this.$router.push("/");
        })
        .catch(err => console.log('carch'));
      }  else {
        this.$message({
          message: "please fill the form",
          type: "warning"
        });
        return false;
      }
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