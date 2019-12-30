/*
vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import * as getters from './getters.js' // 导入响应的模块，*相当于引入了这个组件下所有导出的事例
import * as actions from './actions.js'
import * as mutations from './mutations.js'

Vue.use(Vuex)
// 首先声明一个需要全局维护的状态 state
const state = {
  userInfo: {}, // 用户信息
  color:''
}

//引入模块,持久化存储数据
const store = new Vuex.Store({
  plugins:[createPersistedState({
    storage:window.sessionStorage,
    reducer(state) {
      return {
        userInfo: state.userInfo
      }
    }
  })],
  state,    // 共同维护的一个状态，state里面可以是很多个全局状态
  getters,  // 获取数据并渲染
  actions,  // 数据的异步操作
  mutations  // 处理数据的唯一途径，state的改变或赋值只能在这里
})

export default store // 导出store并在 main.js中引用注册。
