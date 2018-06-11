<template>
  <div data-page="activityList" class="activityList w100 h100" :class="{overflow:modleShow}">
    <div id="androidActionsheet" v-show="modleShow">
      <div class="weui-mask" @click="Mask"></div>
      <div class="weui-action">
        <div class="square"></div>
        <div class="weui-actionsheet__menu menu" @click="Mask">
          <wv-radio v-model="value" :options="typeList">
          </wv-radio>
        </div>
      </div>
    </div>
    <div class="weui-search-bar" id="searchBar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" v-model="dataArr.keyWord" id="searchInput" placeholder="搜索" required=""  @keyup.13="submit">
          <a href="javascript:" class="weui-icon-clear" id="searchClear" @click="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
        </label>
      </div>
      <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="cancel">取消</a>
      <i id="showAndroidActionSheet" @click="modelShow" class="rulericon rulericon-chose"></i>
    </div>
    <div class="container-main wrapper" ref="wrapper">
      <div class="content">
        <div class="weui-panel__bd item" v-for="(item,index) in List" :key="index" @click="goDetail(item.act_id)">
          <div class="weui-media-box weui-media-box_text">
            <div class="title">
              <h4 class="weui-media-box__title">{{item.title}} </h4>
              <span class="red" v-if="!Number(item.see_state)"></span>
            </div>
            <div class="state">
              <template v-if="Number(item.activity_state)===1">报名中</template>
              <template v-if="Number(item.activity_state)===2">未开始</template>
              <template v-if="Number(item.activity_state)===3">已结束</template>
              <template v-if="Number(item.activity_state)===4">进行中</template>
            </div>
            <p class="weui-media-box__desc">{{item.public_time}} </p>
            <div class="weui-media-box__desc images" v-if="item.activity_pic">
              <img :src="item.activity_pic" :onerror="logo" alt="" srcset="">
            </div>
            <p class="weui-media-box__desc">{{item.desc}}</p>
          </div>
        </div>
        <div class="page__bd" style="margin-bottom:10px">
          <div class="weui-loadmore weui-loadmore_line" v-if="is_not&&dataArr.page!==1">
            <span class="weui-loadmore__tips">已经到底啦~</span>
          </div>
          <div v-if="List.length===0">
            <div id="rec-list">
              <div id="comment-list">
                <div class="has-no-record"><img src="data:image/png;base64,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">
                  <span>暂时没有内容</span>
                </div>
              </div>
              <div id="comment-list-wrap"></div>
            </div>
          </div>
        </div>
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
    title: '活动列表'
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
      modleShow: false,
      // 图片加载失败显示默认的图片
      logo: 'this.src="' + require('../../assets/images/error_img.png') + '"',
      value: '-1',
      // 数据对象
      dataArr: {
        type: 1,
        actType: -1,
        keyWord: '',
        desc: 1,
        page: 1
      },
      // 有无数据
      is_not: false,
      // 数组
      List: [],
      // 总数
      totalRecord: 0,
      // 最大数据
      maxResult: 0,
      // 总的页数
      totalPage: 0,
      // 分类数组
      typeList: [],
      // 记录详情分享需要的信息
      shareMsg: {},
      info: {}
    }
  },
  created () {
    this.dataArr.type = this.$route.query.type
    // 获取分享需要的信息
    this.getShareMsg()
    // 获取数据
    // this.getListData()
    // 初始化滚动
    this.$nextTick(() => {
      this.initScroll()
    })
    this.getType()
  },
  methods: {
    submit () {
      this.dataArr.page = 1
      this.List = []
      this.initScroll()
    },
    // 获取详情分享需要的相关信息
    getShareMsg () {
      http.post('/index.php?app=activity&m=act&cmd=203', {}).then(res => {
        this.shareMsg = res.info
      })
    },
    Mask () {
      this.modleShow = false
    },
    modelShow () {
      this.modleShow = true
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    // 清除输入的文本
    searchClear () {
      this.dataArr.keyWord = ''
    },
    // 跳转
    goDetail (id) {
      let appid = this.shareMsg.appid
      let corpid = this.shareMsg.corpid
      let corpurl = this.shareMsg.corpurl
      let shareId = this.info.curr_user_id
      this.$router.push({
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
    // 取消
    cancel () {
      this.dataArr.keyWord = ''
    },
    getType () {
      http.post('/index.php?app=activity&m=act&cmd=101').then(res => {
        if (res.errcode === 0) {
          res.info.unshift({
            type_name: '全部',
            id: '-1'
          })
          for (var i = 0; i < res.info.length; i++) {
            this.typeList.push({
              label: res.info[i].type_name,
              value: res.info[i].id
            })
          }
          this.typeList[1].value = `${res.info[1].id}`
          console.log(this.typeList)
        } else {
          this.$toast.fail('分类获取失败')
        }
      })
    },
    initScroll () {
      this.$toast.loading({
        duration: 1000
      })
      http
        .post('/index.php?app=activity&m=act&cmd=102', {
          data: this.dataArr
        })
        .then(res => {
          if (res.errcode === 0) {
            this.info = res.info
            this.$nextTick(() => {
              for (let key in res.info.data) {
                res.info.data[key].public_time = moment
                  .unix(res.info.data[key].public_time)
                  .format('YYYY-MM-DD HH:mm')
              }
              this.totalPage = Math.ceil(
                (Number(res.info.count) + 20 - 1) / 20
              )
              if (this.dataArr.page === 1) {
                this.List = res.info.data
              } else {
                this.List = this.List.concat(res.info.data)
              }
              if (res.info.data.length === 0) {
                this.is_not = true
              }
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
                if (this.pullup) {
                  this.scroll.on('scrollEnd', () => {
                    // 滚动到底部
                    if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                      this.dataArr.page++
                      if (this.dataArr.page < this.totalPage) {
                        this.initScroll()
                      } else {
                        if (this.List.length === 0) {
                          this.is_not = false
                        } else {
                          this.is_not = true
                        }
                      }
                    } else {
                      this.is_not = false
                    }
                  })
                }
                if (this.pulldown) {
                  this.scroll.on('touchEnd', pos => {
                    // 下拉动作
                    if (pos.y > 10) {
                      this.dataArr.page = 1
                      this.initScroll()
                    }
                  })
                }
              }
            })
          }
        })
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    List (val) {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    },
    value (val) {
      this.dataArr.actType = val
      this.dataArr.page = 1
      this.List = []
      this.initScroll()
      this.modleShow = false
    },
    'dataArr.keyWord' (val) {
      this.dataArr.keyWord = val
      this.dataArr.page = 1
      this.List = []
      this.initScroll()
    }
  },
  mounted () {
    document.documentElement.scrollTop = 0
    /* eslint-disable no-undef */
    weui.searchBar('#searchBar')
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../common/css/color.less";
@import "../../common/css/font.less";
.overflow{
  overflow:hidden;
}
.activityList {
  background: rgb(245, 245, 245);
  height: 100%;
  .state {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #999;
  }
}

#searchBar {
  position: fixed;
  width: 100vw;
  padding-right: 40px;
  z-index: 1000;
  #showAndroidActionSheet {
    position: absolute;
    right: 14px;
    top: 14px;
    color: #9b9b9b;
    border-radius: 64px;
  }
}

.container-main {
  padding-top: 45px;
  height: 100%;
  position: relative;
  .item {
    border: 1px solid @color_f5f5f5;
    background: #fff;
    margin-top: 20px;
  }
  .item:first-child {
    margin-top: 0px;
  }
}

.content {
  position: absolute;
  width: 100%;
}

#androidActionsheet {
  position: relative;
}

.weui-action {
  .weui-cell__bd {
    padding-left: 20px;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .weui-check__label {
    flex-direction: row-reverse !important;
  }
  max-height: 700px;
  position: fixed;
  right: 15px;
  top: 45px !important;
  backface-visibility: hidden;
  z-index: 5000;
  width: 150px;
  background-color: #efeff4;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.weui-mask {
  z-index: 1001;
}

.square {
  position: absolute;
  top: -4px;
  right: 4px;
  content: "";
  width: 20px;
  height: 15px;
  background: white;
  transform: rotate(45deg);
}

.menu {
  overflow-y: scroll;
  max-height: 180px;
}

.images {
  text-align: center;
  margin: 11px 0 8px 0;
  img {
    height: 190px;
  }
}

.title {
  position: relative;
  h4 {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 40px);
  }
}

.red {
  width: 10px;
  height: 10px;
  background: #f43530;
  display: inline-block;
  position: absolute;
  top: 0;
  right: calc(100);
  border-radius: 14px;
}

.weui-loadmore_line {
  margin-top: 20px;
}

.weui-loadmore_line .weui-loadmore__tips {
  background: rgb(245, 245, 245);
}

#rec-list {
  background-color: #f6f6f6;
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
.manage_sign_in .weui-panel {
  margin-top: 10px;
}
</style>
