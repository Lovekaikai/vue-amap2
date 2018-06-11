import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../views/Login.vue')
const ListIndex = () => import('../views/list/Index.vue')
const signDetail = () => import('../views/List/activitySign_up.vue')
const activityDetail = () => import('../views/List/activityDetail.vue')
const ScanSignIn2 = () => import('../views/List/Scan_sign_in_2.vue')
const activityAlbum = () => import('../views/List/activityAlbum.vue')
const manageSignIn = () => import('../views/List/manage_sign_in.vue')
const activityComment = () => import('../views/List/activityComment.vue')
const activitySignDao = () => import('../views/List/activitySignDao.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/activity/login'
    },
    {
      path: '/',
      redirect: '/activity/login'
    },
    {
      path: '/activity/login',
      name: 'activityLogin',
      component: Login,
      meta: {keepAlive: false}
    },
    {
      path: '/activity/activitySignDao/:id',
      name: 'activitySignDao',
      component: activitySignDao,
      meta: { keepAlive: false }
    },
    {
      path: '/activity/activityComment/:act_id/:pid',
      name: 'activityComment',
      component: activityComment,
      meta: { keepAlive: false }
    },
    {
      path: '/activity/list',
      name: 'activityListIndex',
      component: ListIndex,
      meta: {keepAlive: false}
    },
    {
      path: '/activity/sign_detail/:id',
      name: 'activitysignDeatil',
      component: signDetail,
      meta: { keepAlive: false }
    },
    {
      path: '/activity/activitydetail',
      name: 'activityDetail',
      component: activityDetail,
      meta: { keepAlive: false }
    },
    {
      path: '/activity/Scan_sign_in_2',
      name: 'Scan_sign_in2',
      component: ScanSignIn2,
      meta: { keepAlive: false }
    },
    {
      path: '/activity/activityAlbum/:atlas_id',
      name: 'activityAlbum',
      component: activityAlbum,
      meta: { keepAlive: false }
    },
     {
       path: '/activity/manageSignIn/:id',
       name: 'manageSignIn',
       component: manageSignIn,
       meta: { keepAlive: false }
    }
  ]
})
