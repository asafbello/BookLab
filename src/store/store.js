import UserModule from './modules/UserModule.js'
import BookModule from './modules/BookModule.js'
import ReviewModule from './modules/ReviewModule';
import Vuex from 'vuex';
import Vue from 'vue'


Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
      user : UserModule,
      book: BookModule,
      review: ReviewModule
    },
    // strict : !isProduction
    strict : true
  })