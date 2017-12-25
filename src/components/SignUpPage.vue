<template>
      <div class="signup">
        <h3>New User? Signup</h3>

        <form @submit.prevent="signup">
            <input type="text" placeholder="name" v-model="signupDetails.name" />
            <input type="text" placeholder="username" v-model="signupDetails.username" />
            <input type="password" placeholder="password" v-model="signupDetails.pass" />
            <button type="submit">Signup</button>
        </form>
    </div>

</template>

<script>

import { SIGNUP} from '../store/modules/UserModule.js';


export default {
  name: 'SignInPage',
  data() {
        return {
            loginDetails: { username: '', pass: '' },
            signupDetails: { name: '', username: '', pass: '', avatar: null, isAdmin: false, bookReviews: [], bookRates: [], friends: [], readList: []   }
        }
    },
    methods: {
        signup() {
            this.$store.dispatch({type: SIGNUP, signupDetails: this.signupDetails})
                .then(_ => { this.$router.push('/') })
                .catch(err => console.log(err));
        },
        // login() {
        //     this.$store.dispatch({type: SIGNIN, signinDetails: this.loginDetails})
        //     .then(_ => { this.$router.push('/') })
        //     .catch(err => {
        //         console.log(err);
        //         EventBusService.$emit(SHOW_MSG,
        //             { type: 'danger', txt: err.response.data.error })
        //     });

        // }
    }
} 
</script>

<style scoped>

</style>