<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../common/css/color.less';
  @import '../common/css/font.less';

  .divUl {
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        flex-direction: column;
        .rightIcon:after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #C8C8CD;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) translateY(-50%);
          position: absolute;
          top: 50%;
          right: 15px;
        }
        .weui-cells:before {
          border-top: none;
        }
        label.pl0 {
          padding-left: 0;
        }
        .namePCl {
          display: flex;
          align-items: center;
          .namePClR {
            width: e('calc(100% - 60px)');
          }
        }
        .weui-cells_checkbox .weui-cell__hd {
          padding-right: 0;
        }
        .rulericon-file:before {
          color: @color_467db9;
        }
        .rulericon-triangle_right:before, .rulericon-triangle_down:before {
          color: @color_9b9b9b;
        }
        .labelDiv[data-lv='lv1'] {
          padding-left: 10px;
        }
        .labelDiv[data-lv='lv2'] {
          padding-left: 25px;
        }
        .labelDiv[data-lv='lv3'] {
          padding-left: 40px;
        }
        .labelDiv[data-lv='lv4'] {
          padding-left: 55px;
        }
        .labelDiv[data-lv='lv5'] {
          padding-left: 70px;
        }
        .labelDiv[data-lv='lv6'] {
          padding-left: 85px;
        }
        .labelDiv[data-lv='lv7'] {
          padding-left: 100px;
        }
        .labelDiv[data-lv='lv8'] {
          padding-left: 115px;
        }
        .labelDiv[data-lv='lv9'] {
          padding-left: 130px;
        }
        .labelDiv[data-lv='lv10'] {
          padding-left: 145px;
        }
        .labelDiv[data-lv='lv11'] {
          padding-left: 160px;
        }
        .labelDiv[data-lv='lv12'] {
          padding-left: 175px;
        }
        .labelDiv[data-lv='lv13'] {
          padding-left: 190px;
        }
        .labelDiv[data-lv='lv14'] {
          padding-left: 205px;
        }
        .labelDiv[data-lv='lv15'] {
          padding-left: 220px;
        }
      }
    }
  }
</style>
<style lang="less">
  .deptUserTree[data-component="deptItem"] {
  }
</style>
<template>
  <div class="divUl">
    <ul>
      <li v-for="(item,index) in deptList" :key="index" class="liCl">
        <div class="deptUserItem">
          <div class="weui-cells weui-cells_checkbox mt0 pr">
            <template v-if="deptUserPlugSelect.type == 0">
              <div class="weui-cell weui-check__label pl0 labelDiv rightIcon" :data-lv="'lv'+item.lev">
                <div class="weui-cell__hd">
                  <label :for="'deptListItem'+item.id">
                    <input type="checkbox" class="weui-check" name="checkbox1" :value="item.id"
                           v-model="deptUserPlugSelect.deptUserSelect.dept"
                           :id="'deptListItem'+item.id">
                    <i class="weui-icon-checked"></i>
                  </label>
                </div>
                <div class="weui-cell__bd w100">
                  <p class="namePCl" @click="loadDeptUserData(item)">
                    <template v-if="(item.childs && item.childs.length > 0) || (item.has_child)">
                    <span v-if="item.open" @click.stop="showOrGetData(item,1,index)"
                          class="rulericon-triangle_down pr5"></span>
                      <span v-else @click.stop="showOrGetData(item,2,index)"
                            class="rulericon-triangle_right pr5"> </span>
                    </template>
                    <span class="namePClR hideTxt">
                      <span class="rulericon-file"></span>
                      <span>{{item.name}}</span>
                    </span>
                  </p>
                </div>
              </div>
            </template>
            <template v-else-if="deptUserPlugSelect.type == 1">
              <div class="weui-cell weui-check__label pl0 labelDiv" :data-lv="'lv'+item.lev">
                <div class="weui-cell__hd">
                  <label :for="'deptListItem'+item.id">
                    <input type="checkbox" class="weui-check" name="checkbox1" :value="item.id"
                           v-model="deptUserPlugSelect.deptUserSelect.dept"
                           :id="'deptListItem'+item.id">
                    <i class="weui-icon-checked"></i>
                  </label>
                </div>
                <div class="weui-cell__bd w100">
                  <p class="namePCl" @click="loadDeptUserData(item)">
                    <template v-if="(item.childs && item.childs.length > 0) || (item.has_child)">
                    <span v-if="item.open" @click.stop="showOrGetData(item,1,index)"
                          class="rulericon-triangle_down pr5"></span>
                      <span v-else @click.stop="showOrGetData(item,2,index)"
                            class="rulericon-triangle_right pr5"> </span>
                    </template>
                    <span class="namePClR hideTxt">
                      <span class="rulericon-file"></span>
                      <span>{{item.name}}</span>
                    </span>
                  </p>
                </div>
              </div>
            </template>
            <template v-else-if="deptUserPlugSelect.type == 2">
              <div class="weui-cell weui-check__label pl0 labelDiv rightIcon" :data-lv="'lv'+item.lev">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd w100">
                  <p class="namePCl" @click="loadDeptUserData(item)">
                    <template v-if="(item.childs && item.childs.length > 0) || (item.has_child)">
                    <span v-if="item.open" @click.stop="showOrGetData(item,1,index)"
                          class="rulericon-triangle_down pr5"></span>
                      <span v-else @click.stop="showOrGetData(item,2,index)"
                            class="rulericon-triangle_right pr5"> </span>
                    </template>
                    <span class="namePClR hideTxt">
                      <span class="rulericon-file"></span>
                      <span>{{item.name}}</span>
                    </span>
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
        <deptItem v-if="item.childs && item.childs.length > 0" v-show="item.open" :deptList="item.childs"></deptItem>
      </li>
    </ul>
  </div>
</template>

<script>
  import { http } from '../common/js/commonBase'

  export default {
    name: 'deptItem',
    data () {
      return {}
    },
    computed: {
      // 插件控制部分数据
      deptUserPlugSelect: function () {
        return this.$store.state.deptUserPlugSelect
      }
    },
    props: {
      deptList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      // 展开或者加载数据
      async showOrGetData (item, type, index) {
        let that = this
        if (Number(type) === 1) {
          that.$set(item, 'open', false)
        }
        if (Number(type) === 2) {
          if (!item.childs) {
            let childs = await that.getDeptChildBuyId(item.id)
            that.$set(item, 'childs', childs)
          }
          that.$set(item, 'open', true)
        }
      },
      // 进入部门
      loadDeptUserData (item) {
        this.deptUserPlugSelect.loadUserData = item
      },
      // 加载子部门
      getDeptChildBuyId (id) {
        let that = this
        return new Promise(function (resolve, reject) {
          /* eslint-disable no-undef */
          let loading = weui.loading('')
          http.post(that.deptUserPlugSelect.deptUrl, {
            data: {d_id: id}
          }).then((res) => {
            loading.hide()
            if (Number(res.errcode) === 0) {
              resolve(res.info)
            } else {
              resolve([])
            }
          })
        })
      }
    },
    watch: {
      deptUserPlugSelect: {
        handler: function (nVal, oVal) {
          // this.$store.commit('setDeptUserPlugSelect', nVal)
        },
        deep: true
      }
    },
    created () {
//      this.deptUserPlugSelect = this.$store.getters.getDeptUserPlugSelect
//      console.warn('created deptList', this.deptUserPlugSelect)
    }
  }
</script>
