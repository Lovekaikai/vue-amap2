<template>
  <div class="activityDetail">
    <div class="weui-panel weui-panel_access sign_people">
      <div class="left">签到人数</div>
      <div class="right">{{count || 0}}/{{info.count}}人</div>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="(item,index) in data" :key="index" v-if="Number(info.is_outside_act)===0">
          <div  class="weui-panel__bd">
            <div  class="weui-media-box weui-media-box_small-appmsg">
              <div  class="weui-cells">
                <a  href="javascript:;" class="weui-cell weui-cell_access">
                  <div  class="weui-cell__hd"><img :onerror="logo" :src="item.enroll_pic_url" /></div>
                  <div  class="weui-cell__bd weui-cell_primary">
                    <p >{{item.enroll_name}}</p>
                    <p >{{item.phone}}</p>
                  </div>
                  <span  class="weui-cell__ft enroll_time" v-if="Number(item.sign_state)">
                    {{item.sign_time_f}}
                  </span>
                  <span class="weui-cell__ft btn" v-if="!Number(item.sign_state)">
                    未签到
                  </span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li v-for="(item,index) in data" :key="index" v-if="Number(info.is_outside_act)===1">
          <div  class="weui-panel__bd">
            <div  class="weui-media-box weui-media-box_small-appmsg">
              <div  class="weui-cells">
                <a  href="javascript:;" class="weui-cell weui-cell_access">
                  <div  class="weui-cell__hd"><img :onerror="logo" :src="item.enroll_pic_url" /></div>
                  <div  class="weui-cell__bd weui-cell_primary">
                    <p >{{item.enroll_name}}</p>
                    <p >{{item.phone}}</p>
                  </div>
                  <span  class="weui-cell__ft enroll_time" v-if="Number(item.sign_state)">
                    {{item.sign_time}}
                  </span>
                  <span class="weui-cell__ft btn" v-if="!Number(item.sign_state)">
                    <wv-button type="warn" :mini="true" @click="signed(item)">签到</wv-button>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div  id="rec-list" v-if="Number(info.count)===0">
        <div  id="comment-list">
          <div  class="has-no-record"><img  src="data:image/png;base64,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">
            <span >暂时没有内容</span>
          </div>
        </div>
        <div  id="comment-list-wrap"></div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import Bscroll from 'better-scroll'
import { http } from '../../common/js/commonBase'
export default {
  metaInfo: {
    title: '签到列表'
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
      obj: {
        act_id: '',
        type: 0,
        page_size: 15,
        page: 1
      },
      data: [],
      info: {},
      count: 0
    }
  },
  created () {
    this.obj.act_id = this.$route.params.id
    this.loadData()
  },
  mounted () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: {
    loadData () {
      this.$toast.loading({
        duration: 1000
      })
      http
        .post('/index.php?app=activity&m=act&cmd=116', {
          data: this.obj
        })
        .then(res => {
          console.log(res)
          if (res.errcode === 0) {
            this.totalPage = Math.ceil(
              (Number(res.info.count) + this.obj.page_size - 1) /
              this.obj.page_size
            )
            this.info = res.info
            if (this.obj.page === 1) {
              this.data = res.info.data
            } else {
              this.data = this.data.concat(res.info.data)
            }
            for (let index in this.data) {
              // 计算报名人员
              this.data[index].sign_time_f = moment
                .unix(Number(this.data[index].sign_time))
                .format('YYYY-MM-DD HH:mm:ss')
            }

            this.count = this.data.length
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                mouseWheel: {
                  speed: 20,
                  invert: false,
                  easeTime: 300
                }
              })
              // 是否派发滚动到底部事件，用于上拉加载
              // 是否派发滚动到底部事件，用于上拉加载
              if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                  // 滚动到底部
                  if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                    this.obj.page++
                      if (this.obj.page < this.totalPage) {
                        this.loadData()
                      }
                  }
                })
              } // 是否派发顶部下拉事件，用于下拉刷新
              if (this.pulldown) {
                this.scroll.on('touchEnd', pos => {
                  // 下拉动作
                  if (pos.y > 50) {
                    this.obj.page = 1
                    this.loadData()
                  }
                })
              }
            }
          }
        })
    },
    signed (val) {
      console.log(val)
      let obj = {
        act_id: this.obj.act_id,
        type: 3,
        location: {
          lat: '',
          lng: ''
        },
        is_outside: this.obj.is_outside,
        enroll_id: val.enroll_id
      }
      console.log(obj)
      http
        .post('/index.php?app=activity&m=act&cmd=114', { data: obj })
        .then(res => {
          if (res.errcode === 0) {
           /* eslint-disable no-undef */
            weui.alert('签到成功')
            this.loadData()
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.activityDetail {
  height: 100%;
  position: relative;
  .weui-panel_access {
    top: 0;
    z-index: 1000;
    left: 0;
    position: fixed;
    width: 100vw;
    padding: 14px 0 10px;
    color: #808080;
    font-size: 13px;
    .left {
      float: left;
      padding-left: 15px;
    }
    .right {
      position: absolute;
      padding-right: 15px;
      right: 0;
    }
  }
  .wrapper {
    height: 100vh;
    padding-top: 50px;
    position: relative;
    .content {
      padding-bottom: 200px;
      position: absolute;
      .weui-cell_primary {
        padding-left: 10px;
      }
      li {
        width: 100vw;
      }
      img {
        display: block;
        width: 42px;
        height: 42px;
      }
      .weui-btn_mini {
        background: rgb(57, 125, 203);
      }
      .weui-cell_access .weui-cell__ft:after {
        display: none;
      }

      .weui-cell_access:active {
        background: #fff;
      }
    }
  }
}
#rec-list {
  background-color: #fff;
}
#comment-list {
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
.enroll_time {
  position: relative;
  top: -18px;
  font-size: 13px;
  padding: 0;
}
.weui-panel__bd {
  img {
    width: 42px;
    height: 42px;
  }
  .weui-cell_primary {
    padding-left: 10px;
  }
}
.btn::after {
  display: none;
}
.weui-btn_warn {
  background-color: rgb(57, 125, 203);
}
.weui-cell_access:active {
  background: #fff;
}
</style>
