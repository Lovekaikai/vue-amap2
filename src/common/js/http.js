import axios from 'axios'
import router from '../../router'
import evnBase from './evnBase'
import qs from 'qs'

console.log(router, qs)

axios.defaults.baseURL = evnBase.apiUrlBase

// 添加请求拦截器
axios.interceptors.request.use(
  function (request) {
    // 参数序列化(post请求)
    if (request.method === 'post' && !(request.data instanceof FormData)) {
      // console.log('post请求', request, request.data, qs.stringify(request.data))
      request.data = qs.stringify(request.data)
    }
    return request
  },
  function (error) {
    console.error(error)
    // return Promise.reject(error)
    return error
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    let responseData = response.data
    /* 旧版本企业号不做区分，后期优化
    // 超时，无权限，系统异常等统一处理
    if (Number(responseData.errcode) === -90004) { // 超时或者账号禁用
      Message({message: responseData.errmsg, type: 'error'})
      // 重新登录页面
      setTimeout(() => {
        router.push({path: '/login'})
      }, 3500)
    } else if (Number(responseData.errcode) === -90007) { // 无权限页面(当前阶段没有)
      Message({message: responseData.errmsg, type: 'error'})
      // location.href = evnBase.routerBase
    } else if (Number(responseData.errcode) !== 0) { // 其他错误
      Message({message: responseData.errmsg, type: 'error'})
    }
    */
    if (Number(responseData.errcode) !== 0) {
      if (responseData.errmsg) {
        /* eslint-disable no-undef */
        weui.alert(responseData.errmsg)
      } else {
        weui.alert(responseData)
      }
    }
    return responseData
  },
  function (error) {
    console.error(error)
    weui.alert('网络异常')
    // return Promise.reject(error)
    return error
  }
)

export default axios
