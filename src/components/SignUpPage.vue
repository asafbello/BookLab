<template>
      <div class="signup">
        <h3>New User? Signup</h3>
        <el-form ref="form" :model="signupDetails" :rules="rules" @keyup.native.enter="signup" class="signin-form">
                <el-form-item label="Name" prop="name">
                    <el-input type="text" placeholder="name" v-model="signupDetails.name"></el-input>
                </el-form-item>
                <el-form-item label="User Name" prop="username">
                    <el-input type="text" placeholder="username" v-model="signupDetails.username"></el-input>
                 </el-form-item>
                                        <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"><i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
                        </el-upload>
                <el-form-item label="Upload Your Picture" prop="avatar">
                    <el-input type="text" placeholder="Copy image URL" v-model="signupDetails.avatar"></el-input>
                </el-form-item>    
                <el-form-item label="password" prop="pass">
                    <el-input type="password" placeholder="password" v-model="signupDetails.pass"></el-input>
                </el-form-item> 
                <el-form-item>
                        <el-button type="primary"  @click.native="signup(signupDetails)">Sign Up</el-button>
                 </el-form-item>    
                </el-form>
    </div>

</template>

<script>
import { SIGNUP, SIGNIN } from "../store/modules/UserModule.js";
import moment from "moment";

export default {
  name: "SignUnPage",
  data() {
    return {
      loginDetails: { username: "", pass: "" },
      signupDetails: {
        joinedAt: moment().format("ll"),
        name: "",
        username: "",
        pass: "",
        avatar: null,
        isAdmin: false,
        uBooks: [],
        friends: [],
        readList: [],
        reviews: []
      },
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
    signup(formName) {
        let valid = true;
        if (formName.name === '' || formName.pass <= 2) valid = false
      if (!this.signupDetails.avatar)
        this.signupDetails.avatar =
          "http://www.nanigans.com/wp-content/uploads/2014/07/Generic-Avatar.png";
        if (valid) {
          this.$store
            .dispatch({ type: SIGNUP, signupDetails: this.signupDetails })
            .then(_ => {
              this.$router.push("/")
                this.$message({
          message: 'WELLCOME, to BookLab',
          type: 'success'
        });
            })
            .catch(err => console.log(err));
        } else {
          this.$message({
          message: 'please fill the form',
          type: 'warning'
        });
          return false;
        }
    },
    login() {
      this.$store
        .dispatch({ type: SIGNIN, signinDetails: this.loginDetails })
        .then(_ => {
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.loginDetails.avatar = file.url
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        handlePreview(file) {
        console.log(file);
      },
  }
};
</script>

<style scoped>
.signin-form {
  display: flex;
  flex-flow: column wrap;
  margin: auto;
  margin-top: 5%;
  width: 35%;
}
</style>