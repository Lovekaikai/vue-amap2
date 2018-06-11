// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import vueMeta from 'vue-meta'
import VueAMap from 'vue-amap'

import './common/css/common.less'
import './common/css/color.less'
import './common/css/font.less'

import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
Vue.use(WeVue)
Vue.config.productionTip = false
Vue.use(vueMeta)

// 高德地图的引入
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd064bd124a2a9e5d3a82f9be1d9e0830',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

console.log('初始换')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
