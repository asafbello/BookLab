<template>
    <div class="login">
        <h3>Login</h3>
        <form @submit.prevent="login">
            <input type="text" v-model="loginDetails.username" placeholder="User Name" />
            <input type="password" v-model="loginDetails.pass" placeholder="password">
            <button type="submit">Login!!!!</button>
        </form>
    </div>

</template>

<script>

import { SIGNIN} from '../store/modules/UserModule.js';


export default {
  name: 'SignInPage',
  data() {
        return {
            loginDetails: { username: '', pass: '' },
        }
    },
    methods: {
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

</style>