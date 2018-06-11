const location = global.location
export default {
  beforeRouteEnter (to, from, next) {
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign(to.fullPath)
    } else {
      next()
    }
  }
}
