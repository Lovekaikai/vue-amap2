import http from './http'

/* 企业微信jssdk提供的Api
onMenuShareAppMessage
onMenuShareWechat
startRecord
stopRecord
onVoiceRecordEnd
playVoice
pauseVoice
stopVoice
onVoicePlayEnd
uploadVoice
downloadVoice
chooseImage
previewImage
uploadImage
downloadImage
previewFile
getNetworkType
openLocation
getLocation
onHistoryBack
hideOptionMenu
showOptionMenu
hideMenuItems
showMenuItems
hideAllNonBaseMenuItem
showAllNonBaseMenuItem
closeWindow
scanQRCode
selectEnterpriseContact
openEnterpriseChat
chooseInvoice
*/

export default {
  // 初始换jssdk
  initJssdkCon (jsApiList) {
    /* eslint-disable no-undef */
    http.post('/index.php?app=activity&m=act&cmd=201', {
      data: JSON.stringify({
        url: window.location.href
      })
    }).then((res) => {
      console.log(res)
      if (Number(res.errcode) === 0) {
        console.log(res.info.app_id)
        console.warn('jssdk配置', res)
        /* eslint-disable no-undef */
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.info.app_id, // 必填，企业微信的corpID
          timestamp: res.info.time, // 必填，生成签名的时间戳
          nonceStr: res.info.nonce_str, // 必填，生成签名的随机串
          signature: res.info.sign, // 必填，签名，见附录1
          jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          console.warn('jssdk初始化成功')
        })
        wx.error(function (res) {
          console.warn('jssdk验证失败')
          weui.topTips('jssdk初始化失败', 3000)
        })
      }
    })
  }
}
