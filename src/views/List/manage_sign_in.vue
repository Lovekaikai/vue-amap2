<template>
  <div>
    <div class="manage_sign_in">
      <div class="content">
        <div class="weui-panel">
          <div class="weui-panel__hd title">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label"><span class="red">*</span>姓名</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" v-model="user_name" placeholder="请输入姓名" type="text">
              </div>
            </div>
          </div>
          <div class="weui-panel__hd title" v-for="(item,index) in arr1" :key="index">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label"><span class="red">*</span>{{item.name}}</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" :placeholder='"请输入"+item.name' v-model="item.val" type="text">
              </div>
            </div>
          </div>
        </div>
        <div class="weui-cells manage_people" v-if="Number(can_family)">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>随行人员</p>
            </div>
            <div class="weui-cell__ft clearfix">
              <wv-number-spinner v-model="number1" @change="onChange" :max="info.activity.family_limited"></wv-number-spinner>
            </div>
          </div>
        </div>
        <div class="weui-panel" v-for="(itemfamily,index1) in family" :key="index1">
          <div class="weui-panel__hd title" v-for="(item,index) in itemfamily" :key="index">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label"><span class="red">*</span>{{item.name}}</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" :placeholder='"请输入"+item.name' v-model="item.val" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary btn" @click="confirm">确定</a>
  </div>
</template>
<script>
import { http } from '../../common/js/commonBase'
export default {
  metaInfo: {
    title: '活动报名'
  },
  data () {
    return {
      user_name: '',
      id: '',
      info: {},
      number1: 0,
      can_family: '',
      enroll_custom: [],
      arr: [],
      family: [],
      arr1: []
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getSignMess()
  },
  methods: {
    facouc () {},
    getSignMess () {
      http
        .post('/index.php?app=activity&m=act&cmd=108', {
          data: { id: this.id }
        })
        .then(res => {
          this.info = res.info
          this.user_name = res.info.user_info.name
          this.can_family = this.info.activity.can_family
          this.enroll_custom = this.info.activity.enroll_custom
          this.arr.push({ name: '人员姓名', value: '' })
          for (let index = 0; index < this.enroll_custom.length; index++) {
            this.arr.push({ name: this.enroll_custom[index], val: '' })
            this.arr1.push({ name: this.enroll_custom[index], val: '' })
          }
        })
    },
    confirm () {
      var arrmsg = []
      for (let i = 0; i < this.family.length; i++) {
        let obj = {}
        obj['name'] = this.family[i][0].val
        obj['custom'] = this.family[i].slice(1, this.family[i].length)
        arrmsg.push(obj)
      }

      var obj1 = {
        id: this.id,
        name: this.user_name,
        custom_msg: this.arr1,
        family_msg: arrmsg
      }
      console.log(obj1)

      if (this.trim(this.user_name).length === 0) {
        this.$toast.fail({
          duration: 1000,
          message: '姓名不能为空'
        })
        return false
      }

      for (var key in this.arr1) {
        if (this.trim(this.arr1[key].val).length === 0) {
          this.$toast.fail({
            duration: 1000,
            message: this.arr1[key].name + '不能为空'
          })
          return false
        }
      }
      for (var key2 in arrmsg) {
        if (arrmsg[key2].name === undefined) {
          this.$toast.fail({
            duration: 1000,
            message: '随行人员名字不能为空'
          })
          return false
        }
        for (let i in arrmsg[key2].custom) {
          if (this.trim(arrmsg[key2].custom[i].val).length === 0) {
            this.$toast.fail({
              duration: 1000,
              message: arrmsg[key2].custom[i].name + '不能为空'
            })
            return false
          }
        }
      }
      http
        .post('/index.php?app=activity&m=act&cmd=109', { data: obj1 })
        .then(res => {
          if (Number(res.errcode) === 0 || Number(res.errcode) === -1) {
            this.$toast.success({
              duration: 1000,
              message: '报名成功'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
    },
    trim (str) {
      return str.replace(/ /g, '')
    },
    onChange (val) {
      if (val === this.info.activity.limited) {
        this.$toast.fail({
          duration: 1000,
          message: '人数超过' + this.info.activity.limited
        })
        return false
      } else {
        console.log('添加')
        if (this.family.length < val) {
          for (var i = 0; i < val - this.family.length; i++) {
            let arrTmp = JSON.parse(JSON.stringify(this.arr))
            this.family.push(arrTmp)
          }
        } else {
          this.family.splice(val, 1)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.manage_sign_in {
  .red{
        width: 5px;
    height: 5px;
    display: inline-block;
    color: red;
    margin-right: 5px;
  }
  .weui-input {
    font-size: 14px;
  }
  .weui-panel {
    margin-top: 5px;
  }

  padding-bottom: 10px;
  background: #f5f5f5;
}
.content {
  .department {
    font-family: PingFangSC-Regular;
    font-size: 17px;
    color: #9b9b9b;
    line-height: 24px;
  }
}
.title {
  padding: 15px 0;
  font-family: PingFangSC-Regular;
  background: #ffffff;
  box-shadow: inset 0 0 0 0 #d9d9d9;
  font-size: 17px;
  color: #000000;
  border: 1px soild red;
  line-height: 24px;
  padding: 0 15px 0;
}
.manage_people {
  .weui-cell__ft {
    text-align: center;
    .left {
      width: 46px;
      height: 26px;
      background: #ffffff;
      border: 0 solid #d4d4d4;
      border-radius: 2px;
      border: 0.5px solid #d4d4d4;
      display: inline-block;
    }
    .people {
      width: 46px;
      height: 26px;
      display: inline-block;
      border: 0.5px solid #d4d4d4;
      vertical-align: middle;
    }
    .right {
      width: 46px;
      height: 26px;
      background: #ffffff;
      border: 0 solid #d4d4d4;
      border-radius: 2px;
      border: 0.5px solid #d4d4d4;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .man_name {
    padding: 0;
    .weui-label {
      font-family: PingFangSC-Regular;
      font-size: 17px;
      color: #000000;
      line-height: 24px;
    }
  }
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.btn {
  margin: 30px 15px 0;
  margin-bottom: 100px;
}
.weui-btn_primary {
  background: #2f7dcd;
  border-radius: 5px;
}
.weui-btn_primary:not(.weui-btn_disabled):active {
  color: hsla(0, 0%, 100%, 0.6);
  background-color: #2f7dcd;
}
</style>
