// 提交 mutations是更改Vuex状态的唯一合法方法
export const updateTime = (state, timeObj) => {
  state.timeObj = timeObj // 把方法传递过来的参数，赋值给state中的timeObj
}
export const userData = (state,userInfo) => {
  state.userInfo = userInfo
}
export const updateColor = (state,color) => {
  state.color = color
}
