<template>
  <div class="activityDetail" v-show="activityDetailShow" :class="{detail:shareBoolean}">
    <div class="activityImg" v-show="shareBoolean" @click="shareBoolean = false">
      <img
        src="data:image/png;base64,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"
        alt="" srcset="">
    </div>
    <div class="Qr_code" v-if="Number(info.is_admin)&&Number(info.sign_type)===1&&!!Number(info.is_sign)">
      <div class="title_code_div pt20">
        <div class="title_code">
          <!-- <qrcode v-if="signQrcode.length>0" :id="signQrcode" :value="signQrcode" :options="{size:120}"></qrcode> -->
          <img :src="signQrcode" alt="" srcset="" :onerror='logo' @click="previewImage(signQrcode)">
        </div>
      </div>
      <p>活动签到二维码</p>
    </div>
    <article class="weui-article">
      <h1>{{info.title}}</h1>
      <section class="content">
        <div class="content_title">
          <span class="title">{{com_info['name']}}&nbsp;&nbsp;{{info.public_time_f}}</span>
          <span class="title title_right">
            <i class="rulericon rulericon-eye"></i>
            <span>{{info.see_num}}</span>
          </span>
        </div>
        <section class="sec_2">
          <p>
            <img :src="info.pic_url" :onerror='logo' alt="" srcset="">
          </p>
          <p v-html="info.activity_describe"></p>
          <p>
            <span class="text">报名截止：</span>{{info.enroll_time_f }}
          </p>
          <p>
            <span class="text">活动时间：</span>{{info.start_time_f }}--{{info.end_time_f}}
          </p>
          <p>
            <span class="text">活动地点：</span> {{info.place}}
          </p>
        </section>
        <section class="sec_3" v-if="shareId!==''&&Number(info.is_outside_user)&&info.share_user">
          <div class="card_content">
            <h3>{{info.share_user.com_name}}</h3>
            <div class="right_img">
              <img :src="info.share_user.pic_url" alt="" srcset="">
            </div>
            <h2>Aiden</h2>
            <p>{{info.share_user.name}}</p>
            <p>{{info.share_user.position}}</p>
            <p>{{info.share_user.email}}</p>
            <p>{{info.share_user.mobile}}</p>
          </div>
        </section>
      </section>
    </article>
    <div class="activity_mess">
      <span class="mess" @click="giveFive">
        <i class="rulericon rulericon-like_border big  "
           :class="{ 'rulericon-like_border1':Number(info.is_follow)}"></i>
        <span>{{info.follow_num}}</span>
      </span>
      <span class="mess">
        <i class="rulericon rulericon-get_border big"></i>
        <span>{{info.comment_num}}</span>
      </span>
      <span class="mess">
        <i class="rulericon rulericon-image_border big"></i>
        <span>{{info.image_num}}</span>
      </span>
      <span class="mess share" @click="shareBoolean = true" v-if="Number(info.is_outside)">
        <i class="rulericon rulericon-share  big"></i>
      </span>
    </div>
    <!-- 内部活动内部人员 -->
    <!--  -->
    <div v-if="!Number(info.is_outside_user)&&!Number(info.is_outside)">
      <!-- <div class="sign_signed" v-if="info.enroll_time>nowTime&&info.start_time>nowTime&&!Number(info.is_enroll)">
              <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="lastSign"> 抢先报名</a>
              <div>{{info.enroll_time_f }}</div>
              <div>还剩
                <span class="remain">{{Number(info.limited) - Number(info.enroll_num)}}</span>个名额
              </div>
            </div>
            <div class="sign_signed3" v-if="nowTime>info.enroll_time&&!Number(info.is_enroll)&&nowTime<info.end_time">
              <div class="text">活动进行中</div>
            </div>
            <div class="sign_signed3" v-if="nowTime>info.end_time">
              <div class="text">活动已结束</div>
            </div>
            <div class="sign_signed4" v-if="Number(info.enroll_sign_time)!==0&&nowTime<Number(info.end_time)&&Number(info.is_enroll)&&Number(info.sign_state)">
              <div class="text">{{info.enroll_sign_time_f}} 已签到</div>
            </div>
            <div class=" sign_signed5_ne" v-if="nowTime>Number(info.start_time)&&Number(info.end_time)>nowTime&&!Number(info.sign_state)&&!!Number(info.is_enroll)" :class="{canter:!Number(info.is_sign)}">
              <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="mySignIn()" v-if="Number(info.is_sign)"> 我要签到</a>
              <span class="text">活动进行中</span>
            </div>
              <div class=" sign_signed5_ne" v-if="!timeAfterObj.startTimeAfterNow && Number(info.is_enroll) && !timeAfterObj.signTimeAfterNow && !Number(info.sign_state) ">
                <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="cancelSign"> 取消报名</a>
                <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="mySignIn()"> 我要签到</a>
              </div>
              <div class="sign_signed2" v-if="!!Number(info.is_enroll)&&(nowTime-Number(info.enroll_sign_time)===nowTime)&&!Number(info.sign_state)&&nowTime<Number(info.start_time)" :class="{canter:nowTime>info.enroll_time}">
              <a href="javascript:;" class="weui-btn  last_sign_btn" @click="cancelSign" v-if="info.enroll_time>nowTime"> 取消报名</a>
              <span class="text">活动未开始签到</span>
            </div> -->
      <template v-if="!Number(info.is_enroll)">
        <!--活动在可以报名阶段-->
        <div class="sign_signed" v-if="!timeAfterObj.enrollTimeAfterNow">
          <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="lastSign"> 抢先报名</a>
          <div>{{info.enroll_time_f }}</div>
          <div>还剩
            <span class="remain">{{Number(info.limited) - Number(info.enroll_num)}}</span>个名额
          </div>
        </div>
        <!--已过报名时间，但是活动未开始-->
        <div class="sign_signed3" v-if="timeAfterObj.enrollTimeAfterNow && !timeAfterObj.startTimeAfterNow">
          <div class="text">已过报名时间</div>
        </div>
        <!--活动开始-->
        <div class="sign_signed3" v-if="timeAfterObj.startTimeAfterNow && !timeAfterObj.endTimeAfterNow">
          <div class="text">活动进行中</div>
        </div>
        <!--活动结束-->
        <div class="sign_signed3" v-if="timeAfterObj.endTimeAfterNow">
          <div class="text">活动已结束</div>
        </div>
      </template>
      <!--已报名-->
      <template v-else>
        <!--需要签到-->
        <template v-if="Number(info.is_sign)">
          <!--未到签到时间-->
          <template v-if="!timeAfterObj.signTimeAfterNow">
            <div class="sign_signed2">
              <a href="javascript:;" class="weui-btn  last_sign_btn" @click="cancelSign">取消报名</a>
              <span class="text">活动未开始签到</span>
            </div>
          </template>
          <!--已到签到时间-->
          <template v-else>
            <template v-if="!Number(info.sign_state)&&!timeAfterObj.endTimeAfterNow">
              <div class="cancel_sign" v-if="!timeAfterObj.startTimeAfterNow">
                <a href="javascript:;" class="weui-btn  last_sign_btn cancel" @click="cancelSign">取消报名</a>
                <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="mySignIn()"> 我要签到</a>
              </div>
              <div class="sign_signed2" v-if="timeAfterObj.startTimeAfterNow&& !timeAfterObj.endTimeAfterNow">
                <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="mySignIn()"> 我要签到</a>
                <span class="text">活动进行中</span>
              </div>
            </template>
            <template v-else>
              <div class="sign_signed2 over" v-if="!timeAfterObj.startTimeAfterNow">
                <span class="text" style="color:#0082ef;">{{info.enroll_sign_time_f}}&nbsp;&nbsp;已签到</span>
              </div>
              <div class="sign_signed2 over" v-if="timeAfterObj.startTimeAfterNow && !timeAfterObj.endTimeAfterNow">
                <div class="text"><span class="text"
                                        style="color:#0082ef;">{{info.enroll_sign_time_f}}&nbsp;&nbsp;已签到</span></div>
              </div>
              <div class="sign_signed2 over" v-if="timeAfterObj.endTimeAfterNow">
                <div class="text">活动已结束</div>
              </div>
            </template>
          </template>
        </template>
        <!--不需要签到-->
        <template v-else>
          <!--活动未开始-->
          <div class="sign_signed2" v-if="!timeAfterObj.startTimeAfterNow">
            <a href="javascript:;" class="weui-btn  last_sign_btn" @click="cancelSign">取消报名</a>
          </div>
          <!--活动开始-->
          <div class="sign_signed3" v-if="timeAfterObj.startTimeAfterNow && !timeAfterObj.endTimeAfterNow">
            <div class="text">活动进行中</div>
          </div>
          <!--活动结束-->
          <div class="sign_signed3" v-if="timeAfterObj.endTimeAfterNow">
            <div class="text">活动已结束</div>
          </div>
        </template>
      </template>
    </div>
    <!--未报名-->

    <!--
              外部内部人员
            -->
    <!-- {{Number(info.is_outside)&&!Number(info.is_outside_user)}} -->
    <div v-if="Number(info.is_outside)&&!Number(info.is_outside_user)">
      <div class="sign_signed" v-if="info.enroll_time>nowTime&&info.start_time>nowTime&&!Number(info.is_enroll)">
        <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="lastSign"> 抢先报名</a>
        <div>{{info.enroll_time_f }}</div>
        <div>还剩
          <span class="remain">{{Number(info.limited) - Number(info.enroll_num)}}</span>个名额
        </div>
      </div>
      <div class="sign_signed3" v-if="nowTime>info.enroll_time&&!Number(info.is_enroll)&&nowTime<info.end_time">
        <div class="text">活动进行中</div>
      </div>
      <div class="sign_signed2" v-if="!!Number(info.is_enroll)&&info.end_time>nowTime"
           :class="{canter:nowTime>info.enroll_time}">
        <a href="javascript:;" class="weui-btn  last_sign_btn" @click="cancelSign" v-if="info.enroll_time>nowTime">
          取消报名</a>
        <span class="text" v-if="info.start_time>nowTime">活动未开始</span>
        <span class="text" v-if="nowTime>info.start_time">活动进行中</span>
      </div>
      <div class="sign_signed3" v-if="nowTime>info.end_time">
        <div class="text">活动已结束</div>
      </div>
    </div>
    <!--
              外部活动外部人员
              -->
    <div v-if="Number(info.is_outside_user)&&Number(info.is_outside)">
      <div class="sign_signed" v-if="info.enroll_time>nowTime&&info.start_time>nowTime&&!Number(info.is_enroll)">
        <a href="javascript:;" class="weui-btn weui-btn_primary last_sign_btn" @click="lastSign"> 抢先报名</a>
        <div>{{info.enroll_time_f }}</div>
        <div>还剩
          <span class="remain">{{Number(info.limited) - Number(info.enroll_num)}}</span>个名额
        </div>
      </div>
      <!-- {{nowTime >info.start_time&&!Number(info.is_enroll)}} -->
      <div class="sign_signed3" v-if="nowTime>info.enroll_time&&!Number(info.is_enroll)&&nowTime<info.end_time">
        <div class="text">活动进行中</div>
      </div>
      <div class="sign_signed2" v-if="!!Number(info.is_enroll)&&info.end_time>nowTime"
           :class="{canter:nowTime>info.enroll_time}">
        <a href="javascript:;" class="weui-btn  last_sign_btn" @click="cancelSign"
           v-if="info.enroll_time>nowTime">取消报名</a>
        <span class="text" v-if="info.start_time>nowTime">活动未开始</span>
        <span class="text" v-if="nowTime>info.start_time">活动进行中</span>
      </div>
      <div class="sign_signed3" v-if="nowTime>info.end_time">
        <div class="text">活动已结束</div>
      </div>
    </div>
    <div class="signedPeople" @click="signed">
      <div class="number">共{{info.enroll_num}}人已报名</div>
      <span class="rulericon rulericon-angle_right"></span>
      <div class="signed_img">
        <img v-for="(item,index) in pic_url" :key="index" :src="item" v-if="item" alt="" srcset=""/>
      </div>
    </div>
    <div class="signedPeople" @click="signedDao" v-if="Number(info.is_admin)&&Number(info.is_sign)">
      <div class="number">共{{signAll}}人已签到</div>
      <span class="rulericon rulericon-angle_right"></span>
      <div class="signed_img">
        <img v-for="(item,index) in signList" :key="index" :src="item.enroll_pic_url" alt="" srcset=""/>
      </div>
    </div>
    <div class="comment">
      <div class="comment-text">
        <div class="cLine  cLine-box">
          <span class="left"></span>
        </div>
        <div class="cLine">评论区</div>
        <div class="cLine cLine-box">
          <span class="right"></span>
        </div>
      </div>
      <div class="comment-item one" v-for="(item,index) in MoreCommentArr" :key="index">
        <div class="weui-media-box  weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="item.comment_pic_url" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.comment_name}}</h4>
            <p class="weui-media-box__desc">{{item.comment_time}}</p>
          </div>
        </div>
        <div class="weui-media-box__bd comment-content">
          {{item.comment_content}}
        </div>
        <div class="weui-media-box__bd comment-child-content">
          <div class="child-content" v-if="item.child_cnt>0">
            <span>{{item.child.comment_name}}</span>：
            <span>{{item.child.comment_content}}</span>
          </div>
          <div class="reply_content" @click="commentParent(item.id)">共{{item.child_cnt}}条回复></div>
        </div>
      </div>
      <div v-if="MoreCommentArr.length===0">
        <div id="rec-list">
          <div id="comment-list">
            <div class="has-no-record"><img :error="logo"
                                            src="data:image/png;base64,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">
              <span>暂时没有内容</span>
            </div>
          </div>
          <div id="comment-list-wrap"></div>
        </div>
      </div>
      <div class="moreWatch" @click="moreWatch" v-if="commentLength>(MoreComment.page*MoreComment.page_size)">加载更多>>></div>
    </div>
    <div class="album">
      <p>
        <i class="rulericon rulericon-image_border big"></i>
        <span>活动相册</span>
      </p>
      <div id="album-body" v-if="imageLength>0">
        <div class="img-pre-wrap" v-for="(item,index) in message.image" :key="index">
          <div class="img-pre-bar"><img :src="item.file_url" :onerror="logo"></div>
        </div>
        <div @click="uploadImage" class="img-pre-wrap" style="position: absolute;">
          <div style="width: 100%; height:100%;display: inline-block; padding-top: 90px; text-align: center;">
            <span style="color: #9b9b9b;">查看更多</span>
          </div>
        </div>
      </div>
      <div id="not_image" v-if="imageLength===0" @click="uploadImage">
        <div class="box">
          <i class="rulericon rulericon-camera"></i>
        </div>
        <p class="upImage">上传照片</p>
      </div>
    </div>
    <p class="last">已经到底啦~</p>
    <div class="navbar">
      <input type="text" placeholder="我有话要说…" v-model="text" maxlength="60">
      <a href="javascript:;" class="weui-btn weui-btn_primary" @click="addCommentMessage">评论</a>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import assign from '../../mixin/assign'
  // import Qrcode from '@xkeshi/vue-qrcode'
  import { http, jssdkInit } from '../../common/js/commonBase'

  export default {
    metaInfo: {
      title: '活动详情'
    },
    mixins: [assign],
    data () {
      return {
        logo: 'this.src="' + require('../../assets/images/error_img.png') + '"',
        // 获取详情参数
        orShow: false,
        shareBoolean: false,
        canObj: {
          id: '',
          share_id: ''
        },
        text: '',
        info: {},
        com_info: {},
        orGive: false,
        nowTime: Date.now(),
        message: {},
        imageLength: '',
        commentLength: '',
        pic_url: [],
        orboolean: 0,
        comment: '',
        commentInfo: {},
        shareId: '',
        signAll: 0,
        signQrcode: '',
        signList: [],
        giveFiveArr: [],
        // 确认登录之后再显示详情
        activityDetailShow: false,
        MoreComment: {
          act_id: '',
          comment_id: 0,
          page: 1,
          page_size: 2
        },
        changePage: true,
        MoreCommentArr: [],
        // 時間與當前時間對比
        timeAfterObj: {}
      }
    },
    beforeRouteUpdate (to, from, next) {
      /* eslint-disable no-undef */
      weui.alert(JSON.stringify(from))
      if (from.path === '/activity/Scan_sign_in_2') {
        this.getDetail()
      }
      next()
    },
    async created () {
      // 获取分享share_id
      this.shareId = this.$route.query.shareId
      console.log(this.$route.query.shareId)
      // 分享入口重新登录
      let isLogin = await this.getLoginState()
      //  let isLogin = true
      if (!isLogin) {
        // 沒有登录，跳到登录页面进行重新登录
        let pathName = 'activityDetail'
        let corpurl = this.$route.query.corpurl
        let corpid = this.$route.query.corpid
        let appid = this.$route.query.appid
        let id = this.$route.query.id
        let path =
          '/activity/login?corpid=' +
          corpid +
          '&corpurl=' +
          corpurl +
          '&appid=' +
          appid +
          '&id=' +
          id +
          '&pathName=' +
          pathName
        this.$router.replace({
          path: path
        })
      } else {
        // 初始化jssdk
        jssdkInit.initJssdkCon([
          'scanQRCode',
          'onMenuShareAppMessage',
          'previewImage',
          'shareAppMessage'
        ])
        this.canObj.share_id = this.$route.query.shareId
        // 活动的id
        this.canObj.id = this.$route.query.id
        // 获取活动详情
        await this.getDetail()
        // 获取评论，图片，报名人数
        await this.getMessage()
        this.getMoreComment()
        this.getShareAppMessage()
        if (Number(this.info.is_admin) === 1) {
          await this.getSignList()
        }
      }
    },
    mounted () {
      // 分享
      this.share({
        title: '1', // 分享标题
        desc: '2', // 分享描述
        link: '3', // 分享链接
        imgUrl: '4', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          console.log('分享')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    },
    methods: {
      previewImage (url) {
        /* eslint-disable no-undef */
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: [url] // 需要预览的图片http链接列表
        })
      },
      getShareAppMessage () {
        // let that = this
        // return new Promise(resolve => {
        //   wx.invoke(
        //     'shareAppMessage',
        //     {
        //       title: '', // 分享标题
        //       desc: '', // 分享描述
        //       link: '', // 分享链接
        //       imgUrl: '' // 分享封面
        //     },
        //     function (res) {
        //       if (res.err_msg === 'shareAppMessage:ok') {
        //         resolve(console.log(res))
        //         that.getShare()
        //       }
        //     }
        //   )
        // })
      },
      getShare () {
        http
          .post('/index.php?app=activity&m=act&cmd=117', {
            data: {
              act_id: this.canObj.id
            }
          })
          .then(res => {
            if (Number(res.errcode) === 0) {
            }
          })
      },
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
      // 分享
      share (obj) {
        /* eslint-disable no-undef */
        wx.ready(() => {
          wx.onMenuShareAppMessage(obj)
        })
      },
      // 报名列表
      signed () {
        this.$router.push({
          path: '/activity/sign_detail/' + this.canObj.id
        })
      },
      signedDao () {
        if (!Number(this.info.is_admin)) {
          return false
        }
        this.$router.push({
          path: '/activity/activitySignDao/' + this.canObj.id
        })
      },
      // 抢先报名
      lastSign () {
        if (Number(this.info.enroll_num) === Number(this.info.limited)) {
          this.$toast.fail('报名人数已满')
          return false
        }
        this.$router.push({
          path: '/activity/manageSignIn/' + this.canObj.id
        })
      },
      // 跳转到评论详情
      commentParent (val) {
        let pid = val
        this.$router.push({
          path: '/activity/activityComment/' + this.canObj.id + '/' + pid
        })
      },
      // 获取活动详情
      getDetail (val) {
        if (!val) {
          this.$toast.loading({
            duration: 1000
          })
        }
        let that = this
        return new Promise(function (resolve, reject) {
          http
            .post('/index.php?app=activity&m=act&cmd=103', {
              data: that.canObj
            })
            .then(res => {
              if (res.errcode === 0) {
                resolve(true)
                that.info = res.info
                // weui.alert(JSON.stringify(that.info))
                let nowDateLong = that.nowTime
                that.activityDetailShow = true
                let enrollTimeAfterNow = moment(nowDateLong).isAfter(
                  moment.unix(that.info.enroll_time)
                )
                let startTimeAfterNow = moment(nowDateLong).isAfter(
                  moment.unix(that.info.start_time)
                )
                let endTimeAfterNow = moment(nowDateLong).isAfter(
                  moment.unix(that.info.end_time)
                )
                let publicTimeAfterNow = moment(nowDateLong).isAfter(
                  moment.unix(that.info.public_time)
                )
                let signTimeAfterNow = moment(nowDateLong).isAfter(
                  moment.unix(that.info.sign_time)
                )
                let enrollTignTimeAfterNow = moment(nowDateLong).isAfter(
                  moment.unix(that.info.enroll_sign_time)
                )
                that.timeAfterObj = {
                  enrollTimeAfterNow: enrollTimeAfterNow,
                  startTimeAfterNow: startTimeAfterNow,
                  endTimeAfterNow: endTimeAfterNow,
                  publicTimeAfterNow: publicTimeAfterNow,
                  signTimeAfterNow: signTimeAfterNow,
                  enrollTignTimeAfterNow: enrollTignTimeAfterNow
                }
                that.signQrcode = res.info.sign_qrcode
                that.info.public_time_f = moment
                  .unix(that.info.public_time)
                  .format('YYYY-MM-DD HH:mm')
                that.info.enroll_time_f = moment
                  .unix(that.info.enroll_time)
                  .format('YYYY-MM-DD HH:mm')
                that.info.start_time_f = moment
                  .unix(that.info.start_time)
                  .format('YYYY-MM-DD HH:mm')
                that.info.end_time_f = moment
                  .unix(that.info.end_time)
                  .format('YYYY-MM-DD HH:mm')
                that.info.enroll_sign_time_f = moment
                  .unix(that.info.enroll_sign_time)
                  .format('YYYY-MM-DD HH:mm')
                that.info.enroll_time = that.changTime(that.info.enroll_time)
                that.info.start_time = that.changTime(that.info.start_time)
                that.info.end_time = that.changTime(that.info.end_time)
                that.info.sign_time = that.changTime(that.info.sign_time)
                that.com_info = that.info.com_info
              } else {
                that.$toast.fail({
                  duration: 1000,
                  message: '获取详情失败'
                })
              }
            })
        })
      },
      // 装换时间
      changTime (val) {
        return val * 1000
      },
      // 获取签到页面
      getSignAll () {
        http
          .post('/index.php?app=activity&m=act&cmd=115', {
            data: {
              act_id: this.canObj.id
            }
          })
          .then(res => {
            this.signAll = res.info
          })
      },
      // 跳转到图片页面
      uploadImage () {
        this.$router.push({
          path: '/activity/activityAlbum/' + this.message.atlas_id
        })
      },
      // 定位
      mySignIn (val) {
        if (Number(this.info.sign_type) === 2) {
          this.$router.push({
            path: '/activity/Scan_sign_in_2/' + this.canObj.id
          })
          let uParam = {
            id: this.canObj.id,
            sign_type: 1
          }
          this.$router.push({
            name: 'Scan_sign_in2',
            query: uParam
          })
        } else {
          // let that = this
          /* eslint-disable no-undef */
          wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 0, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              // that.getSign()
            },
            error: function (res) {
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                alert('版本过低请升级')
              }
            }
          })
        }
      },
      // 活动签到
      getSign () {
        let obj = {
          act_id: this.canObj.id,
          type: this.info.sign_type
        }
        http
          .post('/index.php?app=activity&m=act&cmd=114', {
            data: obj
          })
          .then(res => {
            if (Number(res.errcode) === 0) {
              this.$router.push({
                path: '/activity/Scan_sign_in_2/' + this.canObj.id
              })
            }
          })
      },
      // 点赞
      giveFive () {
        if (Number(this.info.is_follow)) {
          this.$toast.success('已点赞')
          return false
        }
        http
          .post('/index.php?app=activity&m=act&cmd=111', {
            data: {
              act_id: this.canObj.id
            }
          })
          .then(res => {
            if (res.errcode === 0) {
              this.$toast.success('点赞成功')
              this.getDetail('givefive')
            } else {
              this.$toast.fail({
                duration: 1000,
                message: '点赞失败'
              })
            }
          })
      },
      // 取消报名
      cancelSign () {
        console.log('asdas')
        let obj = {
          data: {
            act_id: this.canObj.id
          }
        }
        http.post('/index.php?app=activity&m=act&cmd=110', obj).then(res => {
          if (res.errcode === 0) {
            this.$toast.success({
              duration: 1000,
              message: '取消报名成功'
            })
            this.changePage = false
            this.orboolean = 0
            this.text = ''
            this.MoreCommentArr.unshift(res.info)
          }
        })
      },
      // 获取详情
      getMessage () {
        let that = this
        return new Promise(function (resolve, reject) {
          http
            .post('/index.php?app=activity&m=act&cmd=104', {
              data: {
                id: that.canObj.id
              }
            })
            .then(res => {
              that.pic_url = []
              for (let key in res.info.enroll) {
                that.pic_url.push(res.info.enroll[key].pic_url)
              }
              that.message = res.info
              that.imageLength = res.info.image.length
              resolve(true)
            })
        })
      },
      // 添加评论
      addCommentMessage () {
        if (this.orboolean !== 0) {
          return false
        }
        this.orboolean += 1
        if (this.text.replace(/\s+/g, '').length === 0) {
          this.$toast.error({
            duration: 1000,
            message: '内容不能为空'
          })
        }
        if (this.text.replace(/\s+/g, '').length > 150) {
          this.$toast.error({
            duration: 1000,
            message: '内容不能超过150字符'
          })
        }
        let obj = {
          act_id: this.canObj.id,
          comment: this.text,
          pid: ''
        }
        http
          .post('/index.php?app=activity&m=act&cmd=112', {
            data: obj
          })
          .then(res => {
            if (res.errcode === 0) {
              this.$toast.success({
                duration: 1000,
                message: '评论成功'
              })
              this.changePage = false
              this.orboolean = 0
              this.getMoreComment()
              this.text = ''
            }
          })
      },
      // 获取已经签到列表
      getSignList () {
        let obj = {
          act_id: this.canObj.id,
          type: 2,
          page: '',
          page_size: ''
        }
        let that = this
        return new Promise(function (resolve, reject) {
          http
            .post('/index.php?app=activity&m=act&cmd=116', {
              data: obj
            })
            .then(res => {
              if (Number(res.errcode) === 0) {
                that.signAll = res.info.count
                that.signList = res.info.data
                resolve(true)
              }
            })
        })
      },
      getMoreComment () {
        this.$toast.loading({
            duration: 1000
        })
        let obj = {
          act_id: this.canObj.id,
          comment_id: 0,
          page: this.MoreComment.page,
          page_size: this.MoreComment.page_size
        }
        http
          .post('/index.php?app=activity&m=act&cmd=107', {
            data: obj
          })
          .then(res => {
            if (Number(res.errcode) === 0) {
              for (var key in res.info.data) {
                res.info.data[key].comment_time = moment
                  .unix(res.info.data[key].comment_time)
                  .format('YYYY-MM-DD HH:mm')
              }
              if (this.MoreComment.page === 1) {
                this.MoreCommentArr = res.info.data
              } else {
                this.MoreCommentArr = this.MoreCommentArr.concat(res.info.data)
              }
              this.commentLength = res.info.count
            }
          })
      },
      moreWatch () {
        if (
          this.commentLength >
          this.MoreComment.page * this.MoreComment.page_size
        ) {
          this.MoreComment.page += 1
          this.getMoreComment()
        }
      }
      // 分享
    }
  }
</script>
<style lang="less" scoped>
  .detail {
    overflow: hidden;
    height: 100vh;
  }

  .activityDetail {
    .activityImg {
      img {
        position: absolute;
        right: 0;
      }
      background-color: #040303;
      opacity: 0.9;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1000;
    }
    .canter {
      text-align: center;
      .text {
        line-height: 22px;
      }
    }
    .remain {
      color: red;
    }
    #comment-list {
      padding: 10px 3%;
    }
    .moreWatch {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9b9b9b;
      letter-spacing: 0;
      line-height: 16px;
      margin-top: 12px;
    }
    .has-no-record {
      width: 100%;
      text-align: center;
      margin-top: 35%;
    }
    .has-no-record img {
      display: block;
      margin: 0 auto;
      width: auto;
      margin-bottom: 10px;
      opacity: 0.3;
    }
    #not_image {
      p.upImage {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9b9b9b;
        letter-spacing: -0.34px;
        margin-bottom: 20px;
        text-align: center;
        padding: 0;
      }
      overflow: hidden;
      .rulericon-camera {
        font-size: 26px;
      }
      .box {
        padding-top: 5px;
        width: 80px;
        height: 75px;
        margin: 29px auto 8px;
        background: #eeeeee;
        border-radius: 50%;
        line-height: 80px;
        text-align: center;
      }
    }
    #album-body {
      position: relative;
      overflow-y: hidden;
      white-space: nowrap;
    }
    #album-body .img-pre-wrap {
      display: inline-block;
      width: 33%;
      max-width: 33%;
      height: 180px;
      max-height: 180px;
      margin-right: 1%;
      overflow: hidden;
      background-color: #f6f6f6;
    }
    #album-body .img-pre-bar {
      display: table-cell;
      height: 180px;
      max-height: 180px;
      vertical-align: middle;
    }
    #album-body img {
      width: 100%;
      max-width: 100%;
    }
    img {
      vertical-align: middle;
    }
    .tab {
      overflow-x: scroll;
      width: 100%;
      background: yellow;
    }
    .wrapper {
      width: 100%;
      list-style: none;
      height: 100px;
      overflow-x: scroll;
      padding: 0;
    }
    .tabitem {
      // flex:0 0 60px;
      width: 20%;
      background: yellow;
    }
    .rulericon-like_border1::before {
      color: red;
    }
    .Qr_code {
      height: 202px;
      width: 100%;
      overflow: hidden;
      background: #fff;
      margin-bottom: 20px;
      p {
        text-align: center;
        padding: 5px 0 20px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9b9b9b;
      }
      .title_code_div {
        text-align: center;
      }
      .title_code {
        display: inline-block;
        background: #ffffff;
        border: 1px solid #e6e6e6;
        border-radius: 8px;
        img {
          display: block;
          width: 120px;
          height: 120px;
          padding: 10px;
        }
      }
    }
    background: #f2f2f2;
    .content {
      .sec_2 {
        img {
          width: 100%;
          display: inline-block;
        }
      }
      margin-bottom: 0 !important;
      .card_content {
        width: 100%;
        height: 228px;
        position: relative;
        background: #ffffff;
        border: 0 solid #d9d9d9;
        border-radius: 6px;
        border: 1px solid #d9d9d9;
        h3 {
          font-family: PingFangSC-Medium;
          font-size: 17px;
          color: #9b9b9b;
          line-height: 24px;
          margin: 20px 0 0 20px;
          width: calc(100% - 101px);
        }
        p {
          margin: 0 0 0 20px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #9b9b9b;
          line-height: 22px;
        }
        h2 {
          margin: 20px 0 0 20px;
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #2d3034;
        }
        .right_img {
          position: absolute;
          right: 20px;
          top: 20px;
          img {
            width: 56px;
            height: 56px;
            border-radius: 4px;
            display: block;
          }
        }
      }
    }
    .content_title {
      position: relative;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9b9b9b;
      line-height: 22px;
      .title_right {
        position: absolute;
        right: 0;
      }
    }
    .weui-article {
      padding-bottom: 0 !important;
      background: #ffffff;
    }
    .sec_2 {
      margin-bottom: 0 !important;
      margin-top: 10px;
      .text {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9b9b9b;
        letter-spacing: -0.34px;
      }
      p:last-child {
        margin-bottom: 0 !important;
        padding-bottom: 10px;
      }
    }
    .sec_3 {
      margin-bottom: 0 !important;
      padding-bottom: 10px;
    }
    .activity_mess {
      background: #ffffff;
      height: 42px;
      line-height: 42px;
      margin: 0;
      border: 1px solid #eeeeee;
      .share {
        float: right;
        padding-right: 10px;
      }
      span.mess {
        padding-left: 15px;
        .big {
          font-size: 20px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          padding-left: 6px;
        }
      }
      .share:last-child {
        float: right;
        padding-right: 15px;
        font-size: 17px;
      }
    }
    .sign_signed {
      overflow: hidden;
      padding: 18px 0 0 16px;
      .last_sign_btn {
        margin-right: 13px;
        float: left;
        width: 120px;
        background: #2f7dcd;
        color: #fff;
      }
    }
    .sign_signed2 {
      overflow: hidden;
      padding: 18px 0 0 16px;
      .last_sign_btn {
        margin-right: 13px;
        float: left;
        width: 120px;
        color: #2f7dcd;
        border: 1px solid #2f7dcd;
      }
      .text {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #9b9b9b;
        line-height: 40px;
      }
    }
    .sign_signed3 {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9b9b9b;
      line-height: 22px;
      padding: 18px 0 0 0;
    }
    .sign_signed4 {
      text-align: center;
      padding: 18px 0 0 16px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #3c7fc8;
      line-height: 16px;
    }
    .sign_signed5 {
      overflow: hidden;
      text-align: center;
      padding: 18px 0 0 16px;
      .weui-btn_primary {
        background: #2f7dcd;
      }
      .last_sign_btn {
        margin-right: 13px;
        float: left;
        width: 120px;
      }
      .last_sign_btn:nth-child(1) {
        color: #ffffff;
        border: 1px solid #2f7dcd;
      }
      .weui-btn + .weui-btn {
        margin-top: 0 !important;
      }
    }
    .weui-btn_primary {
      background: #2f7dcd;
      color: #fff !important;
    }
    .sign_signed5_ne {
      overflow: hidden;
      padding: 18px 0 0 16px;
      line-height: 50px;
      .weui-btn_primary {
        background: #2f7dcd;
      }
      span {
        color: #9b9b9b;
      }
      .last_sign_btn {
        margin-right: 13px;
        float: left;
        width: 120px;
      }
      .last_sign_btn:nth-child(1) {
        color: #ffffff;
        border: 1px solid #2f7dcd;
      }
      .weui-btn + .weui-btn {
        margin-top: 0 !important;
      }
    }
    .signedPeople {
      background: #ffffff;
      margin: 16px 0;
      height: 80px;
      padding: 0 15px;
      overflow: hidden;
      .number {
        float: left;
        padding: 30px 0;
      }
      .signed_img {
        float: right;
        overflow: hidden;
        position: relative;
        height: 60px;
        margin: 13px 0;
        img {
          margin: 5px 0;
          display: block;
          width: 42px;
          height: 42px;
          border-radius: 50px;
          float: right;
        }
        img:nth-child(2) {
          position: relative;
          left: 5px;
        }
        img:nth-child(3) {
          position: relative;
          left: 5px;
        }
        img:nth-child(4) {
          position: relative;
          left: 5px;
        }
        img:nth-child(5) {
          position: relative;
          left: 5px;
        }
      }
      .rulericon-angle_right {
        line-height: 80px;
        float: right;
      }
    }
  }
.cancel_sign{
  a{
    display:inline-block !important;
  }
  .cancel{
    border:1px solid rgb(57, 125, 203);
    color:rgb(57, 125, 203);
    margin-left:15px;
  }
}
  .comment {
    position: relative;
    margin-top: 20px;
    background: #ffffff;
    padding-bottom: 10px;
  }

  .comment #rec-list {
    min-height: 100px;
  }

  .comment .reply {
    position: absolute;
    bottom: 5px;
    right: 15px;
    color: #80c269;
  }

  .comment .has-no-record {
    width: 100%;
    text-align: center;
    margin-top: 0;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .comment .weui-media-box_appmsg {
    border: none;
  }

  .comment .comment-text {
    text-align: center;
    padding: 10px 60px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comment .comment-text .cLine {
    flex: 1;
    width: 33.3%;
    position: relative;
  }

  .comment .comment-text .cLine .left {
    position: absolute;
    right: -6px;
    top: -1px;
    width: 2px;
    height: 2px;
    background: #eeeeee;
    display: block;
  }

  .comment .comment-text .cLine .right {
    position: absolute;
    left: -6px;
    top: -1px;
    width: 2px;
    height: 2px;
    background: #eeeeee;
    display: block;
  }

  .cLine-box {
    border: 1px solid #eeeeee;
    height: 0;
  }

  .comment .weui-media-box__title {
    font-family: PingFangSC-Regular;
    font-size: 17px;
    color: #000000;
    width: 100%;
    letter-spacing: 0;
    padding-bottom: 5px;
  }

  .comment .weui-media-box__desc {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0;
    line-height: 16px;
  }

  .comment .weui-media-box_appmsg img {
    width: 42px;
    height: 42px;
    display: block;
  }

  .comment .weui-media-box_appmsg .weui-media-box__hd {
    margin-right: 0.8em;
    width: 42px;
    height: 42px;
    line-height: 60px;
    text-align: center;
    line-height: 42px;
  }

  .comment-content {
    padding: 0 14px 10px 66px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    letter-spacing: 0;
    line-height: 16px;
    word-wrap: break-word;
  }

  .comment-item:last-child .bottom-line:last-child {
    display: none;
  }

  .comment .one:nth-child(2) .weui-media-box {
    padding: 10px 14px 20px;
  }

  .comment .one {
    position: relative;
  }

  .bottom-line {
    border: 0.5px solid #eeeeee;
    margin: 0 32px;
  }

  .comment-child-content {
    background: red;
    margin: 0 14px 0 66px;
    background: #f2f2f2;
    .child-content {
      margin: 10px 0 0 10px;
    }
    .reply_content {
      padding: 5px 5px 5px 10px;
      color: #0082ef;
    }
  }

  .album {
    padding-bottom: 24px;
    margin-top: 20px;
    background: #ffffff;
    p {
      padding: 8px 0 15px 15px;
      span {
        padding-left: 7.3px;
      }
    }
    .clearfix:before,
    .clearfix:after {
      content: "";
      display: block;
      clear: both;
    }
    ul {
      list-style: none;
      li {
        float: left;
        width: 100px;
        list-style: none;
        height: 100px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .last {
    padding: 15px 0;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: -0.34px;
    padding-bottom: 65px;
  }

  .navbar {
    height: 54px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(153, 153, 153, 0.5);
  }

  .navbar .weui-btn {
    width: 68px;
    height: 46px;
    position: absolute;
    top: 4px;
    right: 4px;
    background: #2f7dcd;
  }

  .navbar .weui-btn_primary:not(.weui-btn_disabled):active {
    color: hsla(0, 0%, 100%, 0.6);
    background-color: #2f7dcd;
  }

  .navbar input {
    resize: none;
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    white-space: wrap;
    word-break: break-all;
    border-right: 0.5px solid #eeeeee;
    text-indent: 20px;
    font-size: 18px;
  }

  .over {
    text-align: center;
  }
</style>
