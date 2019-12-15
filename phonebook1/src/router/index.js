import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import PhoneBook from '@/pages/PhoneBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/phoneBook',
      name: 'PhoneBook',
      component: PhoneBook
    }
  ]
})
