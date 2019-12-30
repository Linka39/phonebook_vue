import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router);

export default new Router({
  mode:'history',
  base:'/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/pages/Login'],resolve)
    },{
      path: '/phoneBook',
      name: 'PhoneBook',
      meta:{
        title:"联系人界面"
      },
      component: resolve => require(['@/pages/PhoneBook'],resolve)
    },{
      path: '/add',
      name: 'Add',
      meta:{
        title:"联系人新增"
      },
      component: resolve => require(['@/pages/components/Add'],resolve)
    },{
      path: '/myGame',
      name: 'MyGame',
      meta:{
        title:"game测试"
      },
      component: resolve => require(['@/pages/game/MyGame'],resolve)
    },{
    //加上冒号，实现路由动态传参
      path: '/detail/:id',
      name: 'Detail',
      meta:{
        title:"联系人信息"
      },
      component: resolve => require(['@/pages/components/Detail'],resolve)
    }
  ]
})
