import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import BookPage from '@/components/BookPage'
import SignUpPage from '@/components/SignUpPage'
import SignInPage from '@/components/SignInPage'
import ProfilePage from '@/components/ProfilePage'

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
      path: '/user/SignUpPage',
      name: 'SignUpPage',
      component: SignUpPage
    },
    {
      path: '/user/SignInPage',
      name: 'SignInPage',
      component: SignInPage
    },
    {
      path: '/user/:id',
      name: 'ProfilePage',
      component: ProfilePage
    }
  ]
})
ProfilePage