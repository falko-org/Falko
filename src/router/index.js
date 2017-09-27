import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import LoginRegister from '@/components/LoginRegister'
import HomePage from '@/components/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },

    {
      path: '/loginregister',
      name: 'LoginRegister',
      component: LoginRegister
    },

    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
