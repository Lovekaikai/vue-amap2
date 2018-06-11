import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 人员选择器选择状态管理（同时使用的之后一个）
  deptUserPlugSelect: {},
  // 登录用户信息
  userMsg: {}
}

const mutations = {
  setDeptUserPlugSelect (state, select) {
    state.deptUserPlugSelect = select
  },
  setDeptUserPlugSelectInit (state, dept) {
    state.deptUserPlugSelect = {}
  },
  setUserMsg (userMsg) {
    window.localStorage.setItem('sanChiKeJiLswbxUserMsg', JSON.stringify(userMsg))
    state.userMsg = userMsg
  }
}

const actions = {
}

const getters = {
  getUserMsg (state) {
    let xswjyuserMsg = window.localStorage.getItem('sanChiKeJiLswbxUserMsg')
    if (xswjyuserMsg) {
      xswjyuserMsg = JSON.parse(xswjyuserMsg)
      mutations.setUserMsg(state, xswjyuserMsg)
    }
    return state.userMsg
  },
  getDeptUserPlugSelect (state) {
    return state.deptUserPlugSelect
  },
  getLoadDeptUser (state) {
    return state.loadDeptUser
  }
}

// 导出store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
