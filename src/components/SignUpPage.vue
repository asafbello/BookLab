<template>
      <div class="signup">

    <section class="fav-jenres">
      <h2>Choose your fav<span><i class="fa fa-star" aria-hidden="true"></i></span>rite jenres</h2>
  <div class="lables">
      <div class="jenre">
        <input type="checkbox" value="Drama" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/rupaul-filled.png"> Drama</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Biogrphy" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/person-in-a-mirror-filled.png"> Biogrphy</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Novel" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/two-hearts-filled.png"> Novel</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Cooking" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/chef-hat.png"> Cooking</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Classics" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/mark-twain-filled.png"> Classics</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Thriller" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/film-noir-filled.png"> Thriller</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Fiction" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/walter-white.png"> Fiction</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Sci-fi" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"> <img src="https://png.icons8.com/cotton/20/000000/martian.png"> Sci-fi</label>
      </div>
      <div class="jenre">
        <input type="checkbox" value="Science" v-model="signupDetails.favoriteJenre">
        <label for="checkbox"><img src="https://png.icons8.com/ios/20/000000/microscope.png"> Science</label>
      </div>
    </div>
           <el-button class="sign-up-btn-mobie" type="primary"  @click.native="signup(signupDetails)">Sign Up</el-button>
    </section>
        <el-form ref="form" :model="signupDetails" :rules="rules" @keyup.native.enter="signup" class="signin-form">
                <el-form-item label="Name" prop="name">
                    <el-input type="text" placeholder="name" v-model="signupDetails.name"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="pass">
                    <el-input type="password" placeholder="password" v-model="signupDetails.pass"></el-input>
                </el-form-item> 
                <el-form-item label="User Name" prop="username">
                    <el-input type="text" placeholder="username" v-model="signupDetails.username"></el-input>
                 </el-form-item>
                            <el-upload class="upload-demo"  :limit="1"     
                             :auto-upload="false"   
                            @change.native="submitUpload"
                                           drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"><i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
                        </el-upload> 
                <el-form-item label="Choose  Me" prop="avatar" v-if="avatar"> 
                        <el-button type="primary"  @click.native="setRandomAvatar"> <img  :src="randomAvatar" class="image mini-img" /> </el-button>                   
                </el-form-item>    
                <el-form-item class="sign-up-btn-desktop">
                        <el-button type="primary"  @click.native="signup">Sign Up</el-button>
                 </el-form-item>    
                </el-form>
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
        joinedAt: moment().format('LL'),
        joinedAtNaaman: Date.now(),
        name: "",
        lastName: "",
        username: "",
        pass: "",
        avatar: "http://bbo.co.nz/wp-content/uploads/Generic-Avatar-Male.jpg",
        isAdmin: false,
        wishList: [],
        readList: [],
        currentlyReading: '',
        reviews: [],
        favoriteJenre: []
      },
      avatar: true,
      rules: {
        name: [
          {
            required: true,
            message: "Please input Your name",
            trigger: "blur"
          },
          { max: 24, message: "Your name needs to be at most 12 characters" }
        ],
        username: [
          {
            required: true,
            message: "Please input Your name",
            trigger: "blur"
          },
          { max: 12, message: "Your user name needs to be at most 12 characters" }
        ],
        pass: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur"
          },
          { min: 2, message: "Your password needs to be at least 2" }
        ]
      }
    };
  },
  methods: {
    signup() {
      let valid = true;
      if (this.signupDetails.name === "" || this.signupDetails.pass <= 2 || this.signupDetails.name.length > 12 || this.signupDetails.username.length > 12)
        valid = false;
      if (valid) {
        this.$store
          .dispatch({ type: SIGNUP, signupDetails: this.signupDetails })
          .then(_ => {
            this.$router.push("/");
            this.$message({
              message: "Welcome to BookLub",
              type: "success"
            });
          })
          .catch(err => this.$message.error("Sorry, cant sign you in"));
      } else {
        this.$message({
          message: "please fill the form correctly",
          type: "warning"
        });
        return false;
      }
      console.log(this.signupDetails);
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
    submitUpload({ target }) {
      var file = target.files;
      UserService.uploadImage(file)
        .then(imgUrl => {
          console.log("photo uploaded", imgUrl);
          this.signupDetails.avatar = imgUrl;
          console.log(this.signupDetails);
          this.avatar = false;
        })
        .catch(err => {
          console.error("error adding photo:", err);
          this.$message.error("Oops, Cant get your Avatar");
        });
    },
    setRandomAvatar() {
      this.signupDetails.avatar = this.randomAvatar;
    }
  },
  computed: {
    randomAvatar() {
      return `https://robohash.org/${this.signupDetails.name || "book"}`;
    }
  }
};
</script>

<style scoped>
.lables {
  display: flex;
  flex-flow: column wrap;
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
  /* display: flex;
  flex-flow: column wrap;
  margin-left: 5%;
  margin-top: 5%;
  width: 35%; */
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
  color: gold;
}

.sign-up-btn-mobie {
  display: none;
}

/* ////////////  mobile query  //////////////// */

@media screen and (max-width: 768px) {
  .signup {
    flex-flow: column-reverse wrap;
    margin-right: unset !important;
    /* margin-top: 2%; */
    width: 100%;
  }

  .signin-form {
    width: 95%;
    margin: auto;
  }

  .fav-jenres {
    flex-direction: row;
    width: 100%;
  }
  .mini-img {
    width: 30%;
    height: 30%;
  }

  .fav-jenres > * {
    margin: 15px;
  }

  .sign-up-btn-desktop {
    display: none;
  }

  .sign-up-btn-mobie {
    display: block;
  }

  .lables {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  .lables > * {
    margin: 15px;
  }
}
</style>