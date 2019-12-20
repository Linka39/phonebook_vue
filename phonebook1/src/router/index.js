import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import PhoneBook from '@/pages/PhoneBook'
import Add from '@/pages/components/Add'
import Detail from '@/pages/components/Detail'

Vue.use(Router);

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
    },{
      path: '/add',
      name: 'Add',
      component: Add
    },{
    //加上冒号，实现路由动态传参
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
