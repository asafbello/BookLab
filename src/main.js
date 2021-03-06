// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/main.css'

import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import store from './store/store.js'
import router from './router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lodash from 'lodash'
import moment from 'moment'
import locale from 'element-ui/lib/locale/lang/en'
import './filters/filters.js'
import './css/lib/font-awesome/css/font-awesome.css'


Vue.use(ElementUI,  { locale })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
