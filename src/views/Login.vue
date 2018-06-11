<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
<template>
  <div class="loginPage w100 h100 pr">
  </div>
</template>

<script>
  import { http, evnBase } from '../common/js/commonBase'

  export default {
    data () {
      return {}
    },
    metaInfo: {
      title: ''
    },
    watch: {
      $router (to, from) {
        console.log(to.path)
        console.log(from.path)
      }
    },
    methods: {
      loginTest (test) {
        return new Promise(function (resolve, reject) {
          /* eslint-disable no-undef */
          let loading = weui.loading('')
          http.post('/debug.php?test=' + test, {}).then((res) => {
            loading.hide()
            if (Number(res.errcode) === 0) {
              resolve(true)
            } else {
              resolve(true)
            }
          })
        })
      },
      // 进入test模式
      async intoTestModel () {
        let test = this.$route.query.test || ''
        if (test.toString().length === 0) {
          return false
        }
        await this.loginTest(test)
        this.intoApp()
      },
      // 检查是否登录
      checkLogin () {
        return new Promise(function (resolve, reject) {
          /* eslint-disable no-undef */
          let loading = weui.loading('')
          http.post('/index.php?a=spaCheckLogin', {}).then((res) => {
            loading.hide()
            if (Number(res.errcode) === 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        })
      },
      // 微信登录
      wxLogin () {
        // 获取code
        let corpurl = this.$route.query.corpurl
        let corpid = this.$route.query.corpid
        let code = this.$route.query.code
        let state = this.$route.query.state
        let pathName = this.$route.query.pathName
        console.log(corpurl, corpid, code, state, pathName)
        let domain = evnBase.apiUrlBase
        domain = window.location.host
        let appLoginUrl = domain + '/activity/login?pathName=' + pathName
        let query = this.$route.query
        for (let i in query) {
          if (i !== 'pathName') {
            appLoginUrl = appLoginUrl + '&' + i + '=' + query[i]
          }
        }
        let appLoginUrlEncode = encodeURIComponent(appLoginUrl)
        let wxBaseLoginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
        let wxloginParam = 'appid=' + corpid + '&redirect_uri=' + appLoginUrlEncode + '&response_type=code&scope=SCOPE&agentid=AGENTID&state=STATE#wechat_redirect'
        let wxLoginUrl = wxBaseLoginUrl + wxloginParam
        console.warn('跳转地址redirect_uri', appLoginUrl, '微信获取code地址', wxLoginUrl)
        window.location.replace(wxLoginUrl)
      },
      // 应用登录
      appLogin (code, corpurl, corpid, appid) {
        return new Promise(function (resolve, reject) {
          /* eslint-disable no-undef */
          let loading = weui.loading('')
          http.post('/index.php?m=login&cmd=101', {
            data: JSON.stringify({
              code: code,
              corpurl: corpurl,
              corpid: corpid,
              app_id: appid
            })
          }).then((res) => {
            loading.hide()
            if (Number(res.errcode) === 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        })
      },
      // 进入应用
      intoApp () {
        console.log('登录页面参数pathName', this.$route.query.pathName)
        console.log('登录页面参数uParam', JSON.stringify(this.$route.query))
        let pathName = this.$route.query.pathName || ''
        console.warn('登录后转调页面', pathName)
        if (pathName.length === 0) {
          /* eslint-disable no-undef */
          weui.alert('找不到路径')
          return false
        }
        let uParam = {}
        let query = this.$route.query
        for (let i in query) {
          if (i !== 'pathName' && i !== 'corpurl' && i !== 'corpid' && i !== 'code' && i !== 'state') {
            uParam[i] = query[i]
          }
        }
        this.$router.replace({name: pathName, query: uParam})
      }
    },
    beforeRouteEnter (to, from, next) {
      console.warn('beforeEach', to, from)
      next()
    },
    async created () {
      console.warn('页面参数', JSON.stringify(this.$route.query))
      if (evnBase.EVN === 'pro') {
        let test = this.$route.query.test || ''
        if (test.toString().length > 0) { // 开发测试环境
          this.intoTestModel()
        } else { // 生产环境
          let code = this.$route.query.code || ''
          console.warn('code', code)
          if (code.toString().length === 0) {
            this.wxLogin()
          } else {
            let corpurl = this.$route.query.corpurl
            let corpid = this.$route.query.corpid
            let appid = this.$route.query.appid
            let isLogin = await this.appLogin(code, corpurl, corpid, appid)
            if (isLogin) {
              this.intoApp()
            }
          }
        }
      } else { // 开发测试环境
        this.intoTestModel()
      }
    }
  }
</script>
