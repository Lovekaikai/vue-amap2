<template>
  <div>
    <div v-if="showPage">
      <div class="position" v-if="Number(signType)===1">
        <div class="amap-wrapper">
          <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
            <el-amap-marker vid="component-marker" :position="componentMarker.position"></el-amap-marker>
            <el-amap-circle v-for="(circle, index) in circles" :key="index" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></el-amap-circle>
          </el-amap>
        </div>
        <div class="bottom_btn">
          <a href="javascript:;" class="weui-btn weui-btn_primary btn" @click="signedEvent(2)">签到</a>
          <p>签到时间：
            <span>{{info.start_time}}</span>-
            <span>{{info.end_time}}</span>
          </p>
        </div>
      </div>
      <div class="Scan_sign_in" v-if="Number(signType)===2">
        <div class="content">
          <span class="rulericon rulericon-right"></span>
          <p class="sign_success">签到成功</p>
          <p class="text">活动签到成功，点击可
            <span class="watch" @click="success">查看活动详情</span>
          </p>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary btn" @click="success">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import assign from '../../mixin/assign'
import { http, jssdkInit } from '../../common/js/commonBase'

export default {
  metaInfo: {
    title: '签到'
  },
  mixins: [assign],
  data () {
    return {
      id: '',
      signType: '',
      appId: '',
      corpid: '',
      corpurl: '',
      info: {},
      wlat: '',
      wlng: '',
      zoom: 15,
      center: [121.59996, 31.197646],
      componentMarker: {
        position: [121.59996, 31.197646]
      },
      circles: [
        {
          center: [121.59996, 31.197646],
          radius: 200,
          fillOpacity: 0.5
        }
      ],
      showPage: false,
      shareMsg: {}
    }
  },
  async created () {
    this.signType = this.$route.query.sign_type
    this.id = this.$route.query.id
    this.appId = this.$route.query.appid
    this.corpid = this.$route.query.corpid
    this.corpurl = this.$route.query.corpurl
    // console.error(
    //   this.signType,
    //   this.id,
    //   this.appId,
    //   this.corpid,
    //   this.corpurl
    // )
    let isLogin = await this.getLoginState()
    // 扫码签到特殊特殊处理
    if (!isLogin) {
      let url =
        '/activity/login?pathName=Scan_sign_in2&sign_type=2&id=' +
        this.id +
        '&corpid=' +
        this.corpid +
        '&corpurl=' +
        this.corpurl +
        '&appid=' +
        this.appId
      this.$router.replace({ path: url })
    } else {
      // 获取转跳到详情页面的分享信息
      this.getShareMsg()
      if (Number(this.signType) === 1) {
        jssdkInit.initJssdkCon(['openLocation', 'getLocation'])
        // 获取活动信息
        await this.getMessage()
        await this.ref()
        this.showPage = true
      } else {
        this.signedEventCode(1)
      }
    }
  },
  methods: {
    // 获取登录状态
    getLoginState () {
      let that = this
      console.log(that)
      return new Promise(function (resolve, reject) {
        http.post('/index.php?m=login&cmd=102', {}).then(res => {
          let state = false
          if (Number(res.info.state) !== 0) {
            state = true
          }
          resolve(state)
        })
      })
    },
    // 获取详情分享需要的相关信息
    getShareMsg () {
      http.post('/index.php?app=activity&m=act&cmd=203', {}).then(res => {
        this.shareMsg.appid = res.info.appid
        this.shareMsg.corpid = res.info.corpid
        this.shareMsg.corpurl = res.info.corpurl
      })

      http
        .post('/index.php?app=activity&m=act&cmd=102', {
          data: {
            type: 1
          }
        })
        .then(res => {
          this.shareMsg.shareId = res.info.curr_user_id
        })
    },
    ref () {
      let that = this
      return new Promise(resolve => {
        that.$toast.loading({
          message: '获取定位中...',
          duration: 0
        })
        /* eslint-disable no-undef */
        wx.ready(() => {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: res => {
              that.$toast.close()
              that.wlat = parseFloat(res.latitude)
              that.wlng = parseFloat(res.longitude)
              that.changeLocation()
              resolve(true)
            }
          })
        })
      })
    },
    changeLocation () {
      http
        .post('/index.php?app=activity&m=act&cmd=118', {
          data: {
            lng: this.wlng,
            lat: this.wlat
          }
        })
        .then(res => {
          if (Number(res.errcode) === 0) {
            this.componentMarker.position = [parseFloat(res.info.lng), parseFloat(res.info.lat)]
          }
        })
    },
    signedEvent (signType) {
      let radius = this.getDistance(
        parseFloat(this.componentMarker.position[1]),
        parseFloat(this.componentMarker.position[0]),
        parseFloat(this.info.location.lat),
        parseFloat(this.info.location.lng)
      )
      if (!radius || radius > this.circles[0].radius) {
        weui.alert('不在签到范围内')
        return false
      }
      let obj = {
        act_id: this.id,
        type: signType,
        location: {
          lat: parseFloat(this.componentMarker.position[1]),
          lng: parseFloat(this.componentMarker.position[0])
        },
        enroll_id: this.info.enroll_id,
        is_outside: this.info.is_outside
      }
      http
        .post('/index.php?app=activity&m=act&cmd=114', {
          data: obj
        })
        .then(res => {
          if (Number(res.errcode) === 0) {
            weui.alert('签到成功')
            this.showPage = true
          }
        })
    },
    // 扫码签到
    signedEventCode (signType) {
      let obj = {
        act_id: this.id,
        type: signType
      }
      http
        .post('/index.php?app=activity&m=act&cmd=114', {
          data: obj
        })
        .then(res => {
          if (res.errcode === 0) {
            this.$toast.success('签到成功')
            this.showPage = true
          }
        })
    },
    success () {
      let appid = this.shareMsg.appid
      let corpid = this.shareMsg.corpid
      let corpurl = this.shareMsg.corpurl
      let shareId = this.info.shareId
      let id = this.id
      this.$router.replace({
        path:
          '/activity/activitydetail?corpid=' +
          corpid +
          '&corpurl=' +
          corpurl +
          '&appid=' +
          appid +
          '&id=' +
          id +
          '&shareId=' +
          shareId
      })
    },
    getDistance (lat1, lng1, lat2, lng2) {
      let EARTH_RADIUS = 6378137.0 // 单位M
      let PI = Math.PI

      function _getRad (d) {
        return d * PI / 180.0
      }

      let f = _getRad((lat1 + lat2) / 2)
      let g = _getRad((lat1 - lat2) / 2)
      let l = _getRad((lng1 - lng2) / 2)
      let sg = Math.sin(g)
      let sl = Math.sin(l)
      let sf = Math.sin(f)
      let s, c, w, r, d, h1, h2
      let a = EARTH_RADIUS
      let fl = 1 / 298.257
      sg = sg * sg
      sl = sl * sl
      sf = sf * sf
      s = sg * (1 - sl) + (1 - sf) * sl
      c = (1 - sg) * (1 - sl) + sf * sl
      w = Math.atan(Math.sqrt(s / c))
      r = Math.sqrt(s * c) / w
      d = 2 * w * a
      h1 = (3 * r - 1) / 2 / c
      h2 = (3 * r + 1) / 2 / s
      return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
    },
    getMessage () {
      let that = this
      return new Promise(resolve => {
        http
          .post('/index.php?app=activity&m=act&cmd=115', {
            data: {
              act_id: that.id
            }
          })
          .then(res => {
            that.info = res.info
            that.info.start_time = moment
              .unix(that.info.start_time)
              .format('YYYY-MM-DD HH:mm:ss')
            that.info.end_time = moment
              .unix(that.info.end_time)
              .format('YYYY-MM-DD HH:mm:ss')
            that.center = [
              parseFloat(that.info.location.lng),
              parseFloat(that.info.location.lat)
            ]
            console.log(that.center)
            that.circles = [
              {
                center: [
                  parseFloat(that.info.location.lng),
                  parseFloat(that.info.location.lat)
                ],
                radius: that.info.sign_scope,
                fillOpacity: 0.5
              }
            ]
            resolve(true)
          })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.amap-demo {
  width: 100%;
  height: 353px;
}

.bottom_btn {
  height: 133px;
  background: #fff;
  p {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9b9b9b;
    margin: 20px auto;
    text-align: center;
  }
  .active {
    background: #a6c5e5;
  }
}

.btn {
  margin: 30px 15px 0;
  background: #2e7ed1;
}

.Scan_sign_in {
  text-align: center;
  .rulericon-right {
    font-size: 80px;
    padding: 66px 0 30px 0;
    display: block;
  }
  .rulericon-right:before {
    color: rgb(1, 174, 41);
  }
  .sign_success {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #2d3034;
    line-height: 20px;
    margin-bottom: 15px;
  }
  .text {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    line-height: 14px;
  }
  .watch {
    color: #2e7ed1;
  }
  .btn {
    background: #2e7ed1;
    margin: 30px 15px 0;
  }
}

.weui-btn_primary:not(.weui-btn_disabled):active {
  color: hsla(0, 0%, 100%, 0.6);
  background-color: #2e7ed1;
}
</style>
