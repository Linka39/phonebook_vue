// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
// commit 提交；timeObj即为点击后传递过来的参数，此时是修改的值
// 存储时间值
export function modifyTime({ commit }, timeObj) {
  return commit('updateTime', timeObj)
}
// 存储用户信息
export function modifyUserData({ commit },userInfo) {
  return commit('userData',userInfo)
}
// 存储颜色信息
export function modifyColor({ commit },color) {
  return commit('updateColor',color)
}
