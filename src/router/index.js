import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import UserProfile from '@/components/UserProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfile
    }
  ]
})
