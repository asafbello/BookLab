import UserModule from './modules/UserModule.js'
import BookModule from './modules/BookModule.js'
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
      user : UserModule,
      book: BookModule,
    },
    // strict : !isProduction
    strict : true
  })