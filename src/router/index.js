import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import BookPage from '@/components/BookPage'
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
      path: '/book/:googleBookId',
      name: 'BookPage',
      component: BookPage
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfile
    }
  ]
})
