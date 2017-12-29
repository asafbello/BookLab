<template>
      <div class="signup">

    <section class="fav-jenres">
      <h2>Choose your fav<span><i class="fa fa-star" aria-hidden="true"></i></span>rite jenres</h2>
  <div class="lables">
      <div class="jenre">
        <input type="checkbox" value="Drama" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Drama</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Biogrphy" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Biogrphy</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Novel" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Novel</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Cooking" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Cooking</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Classics" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Classics</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Thriller" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Thriller</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Fiction" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Fiction</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Sci-fi" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Sci-fi</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Science" v-model="signupDetails.favoriteJenre">
        <label for="checkbox">Science</label>
      </div>
    </div>
    </section>

        <el-form ref="form" :model="signupDetails" :rules="rules" @keyup.native.enter="signup" class="signin-form">
                <el-form-item label="Name" prop="name">
                    <el-input type="text" placeholder="name" v-model="signupDetails.name"></el-input>
                </el-form-item>
                <el-form-item label="last Name" prop="lastName">
                    <el-input type="text" placeholder="last Name" v-model="signupDetails.lastName"></el-input>
                </el-form-item>
                <el-form-item label="User Name" prop="username">
                    <el-input type="text" placeholder="username" v-model="signupDetails.username"></el-input>
                 </el-form-item>
                <el-form-item label="password" prop="pass">
                    <el-input type="password" placeholder="password" v-model="signupDetails.pass"></el-input>
                </el-form-item> 
                            <el-upload class="upload-demo"  :limit="1"     
                             :auto-upload="false"   
                            @change="submitUpload"
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
                <el-form-item>
                        <el-button type="primary"  @click.native="signup(signupDetails)">Sign Up</el-button>
                 </el-form-item>    
                </el-form>
                <!-- <input type="file" @change="submitUpload" id="file-upload" /> -->
    </div>

</template>

<script>
import { SIGNUP, SIGNIN } from "../store/modules/UserModule.js";
import moment from "moment";
import UserService from "../services/UserService.js";

export default {
  name: "SignUnPage",
  data() {
    return {
      loginDetails: { username: "", pass: "" },
      signupDetails: {
        joinedAt: moment().format("ll"),
        name: "",
        lastName: "",
        username: "",
        pass: "",
        avatar: null,
        isAdmin: false,
        uBooks: [],
        reviews: [],
        favoriteJenre: []
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
      if (formName.name === "" || formName.pass <= 2) valid = false;
      if (!this.signupDetails.avatar)
        this.signupDetails.avatar =
          "http://bbo.co.nz/wp-content/uploads/Generic-Avatar-Male.jpg";
      if (valid) {
        this.$store
          .dispatch({ type: SIGNUP, signupDetails: this.signupDetails })
          .then(_ => {
            this.$router.push("/");
            this.$message({
              message: "WELLCOME, to BookLab",
              type: "success"
            });
          })
          .catch(err => console.log(err));
      } else {
        this.$message({
          message: "please fill the form",
          type: "warning"
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
      this.loginDetails.avatar = file.url;
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload({target}) {
      var file = target.files
      UserService.uploadImage(file)
        .then(imgUrl => {
          // console.log('photo uploaded')
          this.signupDetails.avatar = imgUrl;
        })
        .catch(err => {
          console.error("error adding photo:", err);
          this.$message.error("Oops, Cant get your Avatar");
        });
    }
  }
};
</script>

<style scoped>
.lables {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.jenre {
  margin: 5px;
}
.signup {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}

.signin-form {
  display: flex;
  flex-flow: column wrap;
  margin-left: 5%;
  margin-top: 5%;
  width: 35%;
}

h3 {
  margin-top: 20px;
}

.fav-jenres {
  margin-top: 5%;
  width: 35%;
  height: 10%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: 2px solid lightyellow;
  border-radius: 15px;
}

.fav-jenres > * {
  margin: 5px;
}

.fa-star {
  color: lightyellow;
}
</style>