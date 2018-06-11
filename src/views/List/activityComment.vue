<template>
  <div class="container">
    <div class="title">
      <p id="comments-head">
        <img :src="p_comment.comment_pic_url" :onerror='logo'>
        <span class="body">
            <span>{{p_comment.comment_name}}</span><br>
        <span>{{p_comment.comment_content}}</span>
        </span>
        <span class="time" data-time="1527583648">{{p_comment.comment_time}}</span>
      </p>
      <div class="navbar"><input v-model="text" type="text" placeholder="我有话要说…" maxlength="60">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="addCommentMessage">评论</a>
      </div>
      <h5 id="notice-line">评论回复</h5>
    </div>
    <!-- /.comments -->
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="(item,index) in commentArr" :key="index">
          <div class="comment-item">
            <img :src="item.comment_pic_url" :onerror='logo'>
            <span class="body">
                <span>{{item.comment_name}}</span><br>
            <span class="content1">{{item.comment_content}}</span>
            </span>
            <span class="time">{{item.comment_time}}</span>
          </div>
        </li>
      </ul>
      <div id="rec-list" v-if="commentArr.length===0">
        <div id="comment-list">
          <div class="has-no-record"><img data-v-08dd321a="" src="data:image/png;base64,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">
            <span>暂时没有内容</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import moment from 'moment'
  // import Bscroll from 'better-scroll'
  import {
    http
  } from '../../common/js/commonBase'
  export default {
    metaInfo: {
      title: '评论列表'
    },
    props: {
      /** * 1 滚动的时候会派发scroll事件，会截流。 * 2 滚动的时候实时派发scroll事件，不会截流。 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件 */
      probeType: {
        type: Number,
        default: 1
      },
      /** * 点击列表是否派发click事件 */
      click: {
        type: Boolean,
        default: true
      },
      /** * 是否开启横向滚动 */
      scrollX: {
        type: Boolean,
        default: false
      },
      /** * 是否派发滚动事件 */
      listenScroll: {
        type: Boolean,
        default: true
      },
      /** * 列表的数据 */
      data: {
        type: Array,
        default: null
      },
      /** * 是否派发滚动到底部的事件，用于上拉加载 */
      pullup: {
        type: Boolean,
        default: true
      },
      /** * 是否派发顶部下拉的事件，用于下拉刷新 */
      pulldown: {
        type: Boolean,
        default: true
      },
      /** * 是否派发列表滚动开始的事件 */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /** * 当数据更新后，刷新scroll的延时。 */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        logo: 'this.src="' + require('../../assets/images/error_img.png') + '"',
        pid: '',
        act_id: '',
        commentArr: [],
        p_comment: {},
        text: '',
        page: '',
        page_size: '',
        totalPage: 0,
        orboolean: 0
      }
    },
    created () {
      this.pid = this.$route.params.pid
      this.act_id = this.$route.params.act_id
      this.getCommentMessage()
    },
    methods: {
      addCommentMessage () {
        if (this.orboolean !== 0) {
          return false
        }
        this.orboolean += 1
        if (this.text.replace(/\s+/g, '').length > 150) {
          this.$toast.error({
            duration: 1000,
            message: '内容不能超过150字符'
          })
        }
        let obj = {
          act_id: this.act_id,
          comment: this.text,
          pid: this.pid
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
              setTimeout(() => {
                this.text = ''
                this.page = 1
                this.getCommentMessage()
                this.orboolean = 0
              }, 1000)
            }
          })
      },
      getCommentMessage () {
        this.$toast.loading({
          duration: 1000
        })
        let obj = {
          act_id: this.act_id,
          comment_id: this.pid,
          page: this.page,
          page_size: this.page_size
        }
        http
          .post('/index.php?app=activity&m=act&cmd=107', {
            data: obj
          })
          .then(res => {
            this.totalPage = Math.ceil(
              (Number(res.info.count) + this.page_size - 1) / this.page_size
            )
            for (let index in res.info.data) {
              res.info.data[index].comment_time = this.calTime(
                res.info.data[index].comment_time
              )
            }
            res.info.p_comment.comment_time = this.calTime(
              res.info.p_comment.comment_time
            )
            if (this.page === 1) {
              this.commentArr = res.info.data
            } else {
              this.commentArr = this.commentArr.concat(res.info.data)
            }
            // console.log(this.commentArr)
            this.p_comment = res.info.p_comment
            // this.$nextTick(() => {
            //   if (!this.scroll) {
            //     this.scroll = new Bscroll(this.$refs.wrapper, {
            //       mouseWheel: {
            //         speed: 20,
            //         invert: false,
            //         easeTime: 300
            //       }
            //     })
            //     if (this.pullup) {
            //       this.scroll.on('scrollEnd', () => {
            //         // 滚动到底部
            //         if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            //           this.page++
            //           if (this.page <= this.totalPage) {
            //             this.getCommentMessage()
            //           } else {
            //           }
            //         }
            //       })
            //     }
            //     if (this.pulldown) {
            //       this.scroll.on('touchEnd', pos => {
            //         // 下拉动作
            //         if (pos.y > 10) {
            //           this.page = 1
            //           this.getCommentMessage()
            //         }
            //       })
            //     }
            //   } else {
            //     this.scroll.refresh()
            //   }
            // })
          })
      },
      calTime (sec) {
        sec = parseInt(sec) * 1000
        const now = new Date()
        const time = new Date(sec)
        let timeStr = ''
        if (now.toDateString() === time.toDateString()) {
          // 当天
          console.log('当天')
          timeStr =
            this.add0(time.getHours()) + ':' + this.add0(time.getMinutes())
        } else if (
          now.getTime() - sec > 0 &&
          now.getTime() - sec < 24 * 60 * 60 * 1000
        ) {
          console.log('昨天')
          timeStr =
            '昨天 ' +
            this.add0(time.getHours()) +
            ':' +
            this.add0(time.getMinutes())
        } else if (
          now.getTime() - sec > 24 * 60 * 60 * 1000 &&
          now.getTime() - sec < 48 * 60 * 60 * 1000
        ) {
          console.log('前天')
          timeStr =
            '前天 ' +
            this.add0(time.getHours()) +
            ':' +
            this.add0(time.getMinutes())
        } else {
          let localString = time.toLocaleString()
          timeStr = localString.substring(0, time.toLocaleString().length - 3)
        }
        return timeStr
      },
      add0 (val) {
        return val >= 10 ? val : '0' + val
      }
    }
  }
</script>
<style lang="less" scoped>
  .wrapper {
    position: relative;
    // height: 95vh;
  }
  .content {
    margin-top: 120px;
    position: absolute;
    li {
      width: 100vw;
      // padding: 0 15px;
    }
    li:last-child {
      margin-bottom: 140px;
    }
  }
  .container {
    .title {
      position: fixed;
      z-index: 1000;
      width: 100vw;
      box-shadow: 0 1px #f6f6f6;
    }
    .content1 {
      word-break: break-all;
    }
    background-color: #f6f6f6;
    .navbar {
      height: 54px;
      position: fixed;
      z-index: 1000;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #ffffff;
      -webkit-box-shadow: 0 1px 4px 0 rgba(153, 153, 153, 0.5);
      box-shadow: 0 1px 4px 0 rgba(153, 153, 153, 0.5);
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
    .navbar .weui-btn {
      width: 68px;
      height: 46px;
      position: absolute;
      top: 4px;
      right: 4px;
      background: #2f7dcd;
    }
  }
  #comments-head {
    padding: 10px 3% 22px;
    line-height: 26px;
    background-color: #ffffff;
    position: relative;
  }
  // #comments-head:before {
  //   content: "";
  //   position: absolute;
  //   bottom: 0;
  //   left: 10%;
  //   border: 12px solid transparent;
  //   border-bottom: 12px solid #f6f6f6;
  // }
  #comments-head img {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 35px;
    height: 35px;
  }
  #comments-head .time {
    position: absolute;
    top: 10px;
    right: 3%;
    color: #9b9b9b;
  }
  #comments-head .body {
    display: inline-block;
    padding-left: 45px;
    text-align: justify;
  }
  #comments-head .body span:last-child {
    color: #4a4a4a;
  }
  #notice-line {
    padding-left: 3%;
    margin-bottom: 0;
  }
  #comment-list {
    margin-bottom: 54px;
    padding: 10px 3%;
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
  h5 {
    background: #fff;
  }
  .comment-item {
    position: relative;
    padding: 10px 0;
  }
  .comment-item img {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 35px;
    height: 35px;
  }
  .comment-item .body {
    display: inline-block;
    padding-left: 60px;
    text-align: justify;
    padding-right: 30px;
  }
  .comment-item .time {
    position: absolute;
    top: 10px;
    right: 30px;
    color: #9b9b9b;
  }
  .comment-item:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e7e7e7;
  }
</style>
