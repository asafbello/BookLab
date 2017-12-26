<template>
      <div class="signup">
        <h3>New User? Signup</h3>

        <form class="signin-form" @submit.prevent="signup">
             <el-input type="text" placeholder="name" v-model="signupDetails.name"></el-input>
             <el-input type="text" placeholder="username" v-model="signupDetails.username"></el-input>
             <el-input type="text" placeholder="Copy image URL" v-model="signupDetails.avatar"></el-input>
             <el-input type="password" placeholder="password" v-model="signupDetails.pass"></el-input>
            <button type="submit">Signup</button>
            <!-- <el-button type="submit">Sign Up</el-button> -->
        </form>
    </div>

</template>

<script>

import { SIGNUP, SIGNIN} from '../store/modules/UserModule.js';
import moment from 'moment'


export default {
  name: 'SignUnPage',
  data() {
        return {
            loginDetails: { username: '', pass: '' },
            signupDetails: {joinedAt: moment().format('ll') , name: '', username: '', pass: '', avatar: null, isAdmin: false, uBooks: [], friends: [], readList: [], reviews: [] }
        }
    },
    methods: {
        signup() {
            if(!this.signupDetails.avatar) this.signupDetails.avatar = 'http://www.nanigans.com/wp-content/uploads/2014/07/Generic-Avatar.png'
            this.$store.dispatch({type: SIGNUP, signupDetails: this.signupDetails})
                .then(_ => { this.$router.push('/') })
                .catch(err => console.log(err));
        },
        login() {
            this.$store.dispatch({type: SIGNIN, signinDetails: this.loginDetails})
            .then(_ => { this.$router.push('/') })
            .catch(err => {
                console.log(err);
                // EventBusService.$emit(SHOW_MSG,
                //     { type: 'danger', txt: err.response.data.error })
            });

        }
    }
} 
</script>

<style scoped>
.signin-form {
  display: flex;
  flex-flow: column wrap;
  /* justify-content: space-between; */
  margin: auto;
  margin-top: 10%;
  width: 35%;
  /* height: 40%; */
}
</style>