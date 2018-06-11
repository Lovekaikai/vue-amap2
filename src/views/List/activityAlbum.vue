<template>
  <div class="activityAlbum">
    <div class="background_album">
      <img :src="imgInfo.atlas_pic" :onerror="logo" alt="" srcset="">
    </div>
    <div class="album_item" v-show="true">
      <div class="item" v-for="(item,index) in imgInfo.data" :key="index">
        <div class="title clearfix">
          <span class="item_time">{{index}}</span>
          <span class="item_count">{{item.length}}张</span>
        </div>
        <div class="album">
          <ul class="clearfix">
            <!-- {{item.url}} -->
            <li v-for="(item1,index1) in item" :key="index1">
              <img :src="item1.url" alt="" :onerror="logo" srcset="" @click="previewImage(item1.url)">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="not_album" v-if="imgInfo.count==='0'">
      <div class="icon">
        <div class="img">
          <span class="rulericon rulericon-camera"></span>
          <span class="rulericon rulericon-image"></span>
          <span class="rulericon rulericon-image"></span>
        </div>
      </div>
      <p class="not_pt">相册暂无图片</p>
      <p class="upd_pt">你可以直接点击下面按钮上传图片或者进入我的相册审核已上传的图片</p>
    </div>
    <a href="javascript:;" @click="uploadImg" class="weui-btn weui-btn_primary btn">上传照片</a>
  </div>
</template>
<script>
import { http, jssdkInit } from '../../common/js/commonBase'
import assign from '../../mixin/assign'
export default {
  metaInfo: {
    title: '活动相册'
  },
  mixins: [assign],
  data () {
    return {
      logo: 'this.src="' + require('../../assets/images/error_img.png') + '"',
      info: {
        atlas_id: '',
        in_time: 1,
        page: '',
        page_size: ''
      },
      imgInfo: {},
      imgArr: []
    }
  },
  methods: {
    getImage () {
      http
        .post('/index.php?app=activity&m=act&cmd=106', { data: this.info })
        .then(res => {
          if (res.errcode === 0) {
            this.imgInfo = res.info
            for (var key in res.info.data) {
              for (var k in res.info.data[key]) {
                this.imgArr.push(res.info.data[key][k].url)
              }
            }
          }
        })
    },
    async uploadImg () {
      let fileList = await this.jssdkChooseImg()
      for (let i in fileList) {
        let serverId = await this.jssdkUploadImg(fileList[i])
        this.getToServer(serverId)
      }
    },
    jssdkChooseImg () {
      return new Promise(function (resolve, reject) {
        /* eslint-disable no-undef */
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，
            // weui.alert(JSON.stringify(res))
            resolve(localIds)
          },
          fail (res) {
            weui.topTips(res.errMsg, 3000)
          }
        })
      })
    },
    previewImage (url) {
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: this.imgArr // 需要预览的图片http链接列表
      })
    },
    jssdkUploadImg (file) {
      return new Promise(function (resolve, reject) {
        wx.uploadImage({
          localId: file, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId // 返回图片的服务器端ID
            resolve(serverId)
          },
          fail (res) {
            weui.topTips(res.errMsg, 3000)
          }
        })
      })
    },
    getToServer (serverId) {
      let that = this
      http
        .post('/index.php?app=activity&m=act&cmd=202', {
          data: {
            media_id: serverId
          }
        })
        .then(res => {
          that.saveAcImg(res.data)
          // console.log(res)
        })
    },
    saveAcImg (obj) {
      http
        .post('/index.php?app=activity&m=act&cmd=113', {
          data: {
            atlas_id: this.info.atlas_id,
            file: {
              file_name: 'activityImg',
              file_url: obj.path,
              file_key: obj.file_hash,
              file_ext: obj.ext
            }
          }
        })
        .then(res => {
            if (Number(res.errcode) === 0) {
               weui.alert('上传成功，待审核')
            } else {
               weui.alert('上传失败')
            }
        })
    },
    getMessage () {
      let url = location.href
      http
        .post('/index.php?app=activity&m=act&cmd=201', {
          data: {
            url: url
          }
        })
        .then(res => {
          //  console.log(res)
        })
    }
  },
  created () {
    this.getMessage()
    jssdkInit.initJssdkCon(['chooseImage', 'previewImage', 'uploadImage'])
    this.info.atlas_id = this.$route.params.atlas_id
    this.getImage()
  }
}
</script>
<style scoped lang="less">
.background_album {
  height: 153px;
  width: 100%;
  box-shadow: 0px 1px #f3f2f2;
  /* border-bottom: 1px solid rgb(46, 46, 46); */
  border-radius: 1px;
  text-align: center;
  overflow: hidden;
  img {
    display: inline-block;
    width: 100%;
  }
}
.album_item {
  padding: 10px 15px 0;
  .item {
    overflow: hidden;
    span.item_time {
      float: left;
      font-family: STHeitiSC-Medium;
      font-size: 14px;
      color: #000000;
    }
    span.item_count {
      float: right;
      font-family: STHeitiSC-Medium;
      font-size: 14px;
      color: #9b9b9b;
    }
    .album {
      ul {
        list-style: none;
        margin: 14px 0 20px;
        width: 100%;
        box-sizing: border-box;
        li {
          float: left;
          width: 22%;
          height: 80px;
          margin: 1%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.btn {
  background: #2f7dcd;
  border-radius: 5px;
  margin: 30px 15px 194px 15px;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  background: #2f7dcd;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.not_album {
  height: 200px;
  .icon {
    width: 150px;
    height: 65px;
    margin: 23px auto;
    .img {
      position: relative;
      margin: 0 auto;
      text-align: center;
    }
    .rulericon-camera {
      font-size: 75px;
    }
    .rulericon-image:before {
      content: "\E987";
      color: #8c8a8a;
    }
    .rulericon-image {
      transform: rotate(-20deg);
    }
    .rulericon-image:nth-child(2) {
      position: absolute;
      top: 15px;
      left: 105px;
      font-size: 30px;
      z-index: -1;
    }
    .rulericon-image:nth-child(3) {
      position: absolute;
      top: 30px;
      left: 100px;
      font-size: 30px;
      z-index: 102;
      z-index: -1;
    }
  }
  .not_pt {
    text-align: center;
    font-family: STHeitiSC-Light;
    font-size: 24px;
    color: #9b9b9b;
  }
  .upd_pt {
    width: 238px;
    margin: 10px auto 0;
    text-align: center;
    font-family: STHeitiSC-Light;
    font-size: 14px;
    color: #9b9b9b;
    line-height: 16px;
  }
}
</style>
