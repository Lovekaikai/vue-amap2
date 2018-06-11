<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../common/css/color.less';
  @import '../common/css/font.less';

  .deptUserTree {
    .deptUserHead {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      .weui-search-bar__cancel-btn {
        color: @color_467db9;
      }
      .weui-search-bar_focusing:before {
        height: 0px;
        border-top: none;
      }
      .weui-search-bar_focusing:after {
        height: 0px;
      }
      .resultList {
        overflow-x: hidden;
        > div {
          width: auto;
          white-space: nowrap;
          > div {
            display: flex;
          }
        }
        .selectObjItem {
          height: 32px;
          div {
            display: flex;
            align-items: center;
            .rulericon-file:before {
              color: @color_467db9;
            }
            .selectIconSpan {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
            }
            img {
              width: 22px;
              height: 22px;
              border-radius: 2px;
            }
          }
        }
      }
    }
    .deptUserFoot {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 10;
      .deptUserFootDiv {
        display: flex;
        .deptUserFootDivL {
          flex-grow: 1;
        }
        .deptUserFootDivR {
          flex-grow: 3;
        }
      }
    }
  }

  .deptUserCenter {
    .rightIcon:before {
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
    .allDeptTitle {
      background-color: #efeff4;
    }
    .deptUserCenterLv1 {
      overflow: hidden;
      > div {
        height: auto;
      }
    }
    .deptUserCenterLv2 {
      overflow: hidden;
      z-index: 10;
      left: 0;
      top: 0;
      > div {
        height: auto;
      }
      .weui-cells:before {
        border-top: none;
      }
      .weui-cell:before {
        border-top: none;
      }
      .userListIconSpan {
        display: flex;
        align-items: center;
      }
      .userListP {
        display: flex;
        align-items: center;
      }
      .userListIconDefautl {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .userListIcon {
        width: 25px;
        height: 25px;
        margin-right: 4px;
        border-radius: 2px;
      }
      .rulericon-self:before {
        color: @color_9b9b9b;
      }
      .weui-cell-user-label {
        display: flex;
      }
    }
    .deptUserCenterLv3 {
      overflow: hidden;
      z-index: 20;
      left: 0;
      top: 0;
      > div {
        height: auto;
      }
    }
  }
</style>
<style lang="less">
  .deptUserTree[data-component="deptUserTree"] {
  }
</style>
<template>
  <div class="deptUserTree h100 w100 bg_fff bs pr" data-component="deptUserTree">
    <div class="deptUserHead w100 bg_fff" ref="deptUserHead">
      <div class="search">
        <div class="weui-search-bar" v-bind:class="{'weui-search-bar_focusing':searchObj.searchInput}">
          <div class="weui-search-bar__form">
            <div class="weui-search-bar__box">
              <i class="weui-icon-search"></i>
              <input type="search" ref="searchInput" @keyup.enter="ajaxGetSearchList"
                     class="weui-search-bar__input" v-model="searchObj.inputKey"
                     placeholder="搜索">
              <a href="javascript:" @click="outSearch" class="weui-icon-clear" id=""></a>
            </div>
            <label class="weui-search-bar__label" @click="intoSearch" id="searchText"
                   style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
              <i class="weui-icon-search"></i>
              <span>搜索</span>
            </label>
          </div>
          <a href="javascript:" @click="outSearch" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
      </div>
      <div ref="resultList" v-show="resultList.dept.length > 0 || resultList.user.length > 0" class="resultList bg_fff">
        <div class="di-b bs pl15 pr15 pt5 pb5">
          <div>
            <template v-for="(item,index) in resultList.dept">
              <div :key="index" @click="delSelctItem(item.id,1)" class="selectObjItem bs di-b bg_f5f5f5 p5 mr5">
                <div>
                <span class="selectIconSpan">
                  <span class="rulericon-file pr5 fs17"></span>
                </span>
                  <span>{{item.name}}</span>
                </div>
              </div>
            </template>
            <template v-for="(item,index) in resultList.user">
              <div :key="'user'+index" @click="delSelctItem(item.id,2)" class="selectObjItem bs di-b bg_f5f5f5 p5 mr5">
                <div v-if="item.pic_url.length > 0">
                <span class="selectIconSpan mr5">
                  <img class="" :src="item.pic_url" alt="">
                </span>
                  <span>{{item.name}}</span>
                </div>
                <div v-else>
                <span>
                  <span class="rulericon-self pr5 fs17"></span>
                </span>
                  <span>{{item.name}}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cell-br05 pt1 mt0"></div>
    </div>
    <div class="deptUserCenter h100 w100 pr bs fs17" v-bind:style="deptUserCenterPtPb">
      <div class="pr w100 h100">
        <div ref="deptUserCenterLv1" class="deptUserCenterLv1 pr w100 h100">
          <div>
            <div>
              <p @click="intoMyDept(myDept)" class="pl15 pr15 pt10 pb10 pr rightIcon">
                <span></span>
                <span>我的部门</span>
              </p>
              <div class="weui-cells weui-cell-br05 pt1 mt0"></div>
            </div>
            <div>
              <p class="pl15 pr15 pt5 pb5 fs12 c_9b9b9b allDeptTitle">企业所有部门通讯录</p>
            </div>
            <div class="allDeptDiv">
              <v-deptItem v-if="showDept" :deptList="deptList"></v-deptItem>
            </div>
          </div>
        </div>
        <div v-if="showUser" ref="deptUserCenterLv2" class="deptUserCenterLv2 pa bs w100 h100 bg_fff">
          <div class="w100">
            <div class="weui-cells mt0">
              <p class="pl15 pr15 pt5 pb5 fs12 c_9b9b9b allDeptTitle">{{userScroll.deptName}}</p>
            </div>
            <div v-if="userList.length > 0" class="userList">
              <template v-for="(item,index) in userList">
                <div :key="index">
                  <div v-if="item.treeTabShow" class="weui-cells mt0">
                    <p class="pl15 pr15 pt5 pb5 fs14 c_9b9b9b allDeptTitle">{{item.treeTab}}</p>
                  </div>
                  <div class="weui-cells weui-cells_checkbox mt0">
                    <label class="weui-cell weui-cell-user-label weui-check__label pl8" :for="'u'+item.id">
                      <div class="weui-cell__hd">
                        <input type="checkbox" name="checkbox1" class="weui-check" :value="item.id"
                               v-model="deptUserPlugSelect.deptUserSelect.user"
                               :id="'u'+item.id">
                        <i class="weui-icon-checked"></i>
                      </div>
                      <div class="weui-cell__bd">
                        <p class="userListP">
                      <span v-if="item.pic_url.length > 0" class="userListIconSpan">
                        <img class="userListIcon" :src="item.pic_url" alt="">
                      </span>
                          <span v-else class="userListIconDefautl userListIcon bg_f5f5f5">
                        <span class="rulericon-self"></span>
                      </span>
                          <span>{{item.name}}</span>
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </template>
            </div>
            <div v-else>
              <p class="c_9b9b9b pt10 fs12 ta-c">
                暂无成员
              </p>
            </div>
          </div>
        </div>
        <div v-if="searchObj.searchInput" ref="deptUserCenterLv3"
             class="deptUserCenterLv2 deptUserCenterLv3 pa bs w100 h100 bg_fff">
          <div class="w100">
            <div v-if="searchList.length > 0" class="userList">
              <template v-for="(item,index) in searchList">
                <div :key="'su'+index">
                  <div class="weui-cells weui-cells_checkbox mt0">
                    <label class="weui-cell weui-cell-user-label weui-check__label pl8" :for="'searu'+item.id">
                      <div class="weui-cell__hd">
                        <input type="checkbox" name="checkbox1" class="weui-check" :value="item.id"
                               v-model="deptUserPlugSelect.deptUserSelect.user"
                               :id="'searu'+item.id">
                        <i class="weui-icon-checked"></i>
                      </div>
                      <div class="weui-cell__bd">
                        <p class="userListP">
                      <span v-if="item.pic_url.length > 0" class="userListIconSpan">
                        <img class="userListIcon" :src="item.pic_url" alt="">
                      </span>
                          <span v-else class="userListIconDefautl userListIcon bg_f5f5f5">
                        <span class="rulericon-self"></span>
                      </span>
                          <span>{{item.name}}</span>
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </template>
            </div>
            <div v-else>
              <p class="c_9b9b9b pt10 fs12 ta-c">
                暂无搜索结果
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="deptUserFoot bg_fff w100">
      <div class="weui-cells weui-cell-br05 pt1 mt0"></div>
      <div class="deptUserFootDiv pt5 pb5 pl5 pr5">
        <div class="deptUserFootDivL pr15">
          <button v-if="!showUser && !searchObj.searchInput" @click="plugBack"
                  class="weui-btn weui-btn_default cancelDeptUser">取消
          </button>
          <button v-if="showUser && !searchObj.searchInput" @click="userListBack"
                  class="weui-btn weui-btn_default userListBack">返回
          </button>
          <button v-if="searchObj.searchInput" @click="outSearch" class="weui-btn weui-btn_default searchBack">返回
          </button>
        </div>
        <div class="deptUserFootDivR">
          <button @click="comfireSelect" class="weui-btn weui-btn_primary">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- vuex 状态管理，避免事件总线bug-->
<script>
  import { http } from '../common/js/commonBase'
  import deptItem from './deptItem.vue'
  import BScroll from 'better-scroll'

  export default {
    components: {
      'v-deptItem': deptItem
    },
    data () {
      return {
        // 头部样式
        deptUserCenterPtPb: {
          'paddingTop': '44px',
          'paddingBottom': '56px'
        },
        // 是否显示组织架构树
        showDept: false,
        // 是否显示组织架构树
        showUser: false,
        // 我的部门
        myDept: {},
        // 第一层节点数据
        deptList: [],
        // 用户数据
        userList: [],
        // 搜索数据
        searchList: [],
        // 加载的所有用户数
        allUserList: new Map(),
        // 部门Map
        allDeptList: new Map(),
        // 用户列表滚动加载控制对象
        userScroll: {
          loadId: 0,
          offset: 0,
          limit: 50,
          loadEnd: false,
          deptName: ''
        },
        // 人员列表better-scroll对象
        userScrollObj: null,
        // 部门列表better-scroll对象
        deptScrollObj: null,
        // 选中人员better-scroll对象
        deptUserSelectScrollObj: null,
        // 选中人员better-scroll对象
        searchScrollObj: null,
        // 选中的对象数组
        resultList: {
          dept: [],
          user: []
        },
        // 搜索相关
        searchObj: {
          inputKey: '',
          searchInput: false
        }
      }
    },
    computed: {
      // 插件控制部分数据
      deptUserPlugSelect: function () {
        return this.$store.state.deptUserPlugSelect
      }
    },
    props: {
      deptUserTreeConObj: {
        // 人员选择器类型 0 人员部门，1 部门,2 人员
        type: 0,
        // 人员选择器可选个数
        maxSelect: 0,
        // 第一次查询的url
        baseDeptUrl: '',
        // 查询下级部门
        deptUrl: '',
        // 查询部门人员(支持关键字查找人员,当前不支持部门查找)
        userUrl: '',
        // 初始换查找,根据Id数组精确查找部门以及人员的url
        selectedUrl: '',
        // 初始换选中的人员
        deptUserSelect: {
          dept: [],
          user: []
        }
      }
    },
    watch: {
      // 选择的值dept
      'deptUserPlugSelect.deptUserSelect.dept': {
        handler: function (nVal, oVal) {
          let user = this.deptUserPlugSelect.deptUserSelect.user
          let allSelect = user.concat(nVal)
          if (Number(this.deptUserTreeConObj.maxSelect) > 0 && allSelect.length > Number(this.deptUserTreeConObj.maxSelect)) {
            /* eslint-disable no-undef */
            weui.alert('最多只能选择' + this.deptUserTreeConObj.maxSelect + '个')
            this.deptUserPlugSelect.deptUserSelect.dept.pop()
          }
          this.getSelectDeptResult(this.deptUserPlugSelect.deptUserSelect.dept)
        },
        deep: true
      },
      // 选择的值user
      'deptUserPlugSelect.deptUserSelect.user': {
        handler: function (nVal, oVal) {
          let dept = this.deptUserPlugSelect.deptUserSelect.dept
          let allSelect = dept.concat(nVal)
          if (Number(this.deptUserTreeConObj.maxSelect) > 0 && allSelect.length > Number(this.deptUserTreeConObj.maxSelect)) {
            /* eslint-disable no-undef */
            weui.alert('最多只能选择' + this.deptUserTreeConObj.maxSelect + '个')
            this.deptUserPlugSelect.deptUserSelect.user.pop()
          }
          this.getSelectUserResult(this.deptUserPlugSelect.deptUserSelect.user)
        },
        deep: true
      },
      // 加载当前部门人入口
      'deptUserPlugSelect.loadUserData': {
        handler: async function (nVal, oVal) {
          console.log('加载部门入口')
          let that = this
          this.initScrollObj()
          if (nVal.id) {
            this.userScroll.loadId = nVal.id
            this.userScroll.deptName = nVal.name
            this.userList = []
            await this.getUserList(nVal.id)
            this.showUser = true
            this.$nextTick(() => {
              if (that.userScrollObj) {
                that.userScrollObj.destroy()
              }
              that.$nextTick(() => {
                let userScrollObj = new BScroll(that.$refs['deptUserCenterLv2'], {
                  scrollY: true,
                  click: true,
                  pullUpLoad: false,
                  bounce: false
                })
                userScrollObj.on('touchEnd', function (pos) {
                  if (pos.y < userScrollObj.maxScrollY - 25) {
                    that.getUserList(nVal.id)
                  }
                })
                that.$set(that, 'userScrollObj', userScrollObj)
              })
            })
          }
        },
        deep: true
      },
      // 部门树变化
      deptList: {
        handler: function (nVal, oVal) {
          this.deptScrollObj.refresh()
        },
        deep: true
      },
      // 返回的结果
      resultList: {
        handler: function (nVal, oVal) {
          this.getDeptUserHeadHeight()
        },
        deep: true
      },
      // 同步vuex
      deptUserPlugSelect: {
        handler: function (nVal, oVal) {
          this.$store.commit('setDeptUserPlugSelect', nVal)
        },
        deep: true
      }
    },
    methods: {
      // 动态计算告诉
      getDeptUserHeadHeight () {
        let that = this
        that.$nextTick(() => {
          let pt = window.getComputedStyle(that.$refs['deptUserHead']).height
          that.deptUserCenterPtPb.paddingTop = pt
          that.$nextTick(() => {
            if (that.deptScrollObj) {
              that.deptScrollObj.refresh()
            }
            if (that.deptUserSelectScrollObj) {
              that.deptUserSelectScrollObj.refresh()
            }
            if (that.searchScrollObj) {
              that.searchScrollObj.refresh()
            }
            if (that.userScrollObj) {
              that.userScrollObj.refresh()
            }
          })
        })
      },
      // 获取部门初始化(ps接口bug，初始部门时必须传user)
      getInitDeptSelectObj () {
        let that = this
        return new Promise(function (resolve, reject) {
          if (that.deptUserTreeConObj.deptUserSelect.dept && that.deptUserTreeConObj.deptUserSelect.dept.length > 0) {
            http.post(that.deptUserTreeConObj.selectedUrl, {
              ajax_act: '',
              data: {
                user: [0],
                dept: that.deptUserTreeConObj.deptUserSelect.dept
              }
            }).then((res) => {
              if (Number(res.errcode) === 0) {
                that.resultList.dept = res.info
              }
              resolve(true)
            })
          } else {
            resolve(true)
          }
        })
      },
      // 获取人员初始化
      getInitUserSelectObj () {
        let that = this
        return new Promise(function (resolve, reject) {
          if (that.deptUserTreeConObj.deptUserSelect.user && that.deptUserTreeConObj.deptUserSelect.user.length > 0) {
            http.post(that.deptUserTreeConObj.selectedUrl, {
              ajax_act: '',
              data: {
                user: that.deptUserTreeConObj.deptUserSelect.user
              }
            }).then((res) => {
              if (Number(res.errcode) === 0) {
                that.resultList.user = res.info
              }
              resolve(true)
            })
          } else {
            resolve(true)
          }
        })
      },
      // 获取第一第二节点数据
      getFirstLavelData () {
        let that = this
        return new Promise(function (resolve, reject) {
          /* eslint-disable no-undef */
          let loading = weui.loading('')
          http.post(that.deptUserTreeConObj.baseDeptUrl, {
            ajax_act: '',
            data: JSON.stringify({})
          }).then((res) => {
            loading.hide()
            if (Number(res.errcode) === 0) {
              for (let i in res.info.root_dept) {
                res.info.root_dept[i].open = true
              }
              resolve(res.info)
            } else {
              resolve([])
            }
          })
        })
      },
      // 人员列表滚动初始换
      initScrollObj () {
        this.userScroll = {
          loadId: 0,
          offset: 0,
          limit: 50,
          loadEnd: false,
          deptName: ''
        }
      },
      // 获取人员
      getUserList (id) {
        let that = this
        // id为undefined时不进行查找
        if (!id || that.userScroll.loadEnd || Number(that.deptUserTreeConObj.type) === 1) {
          return
        }
        return new Promise(function (resolve, reject) {
          /* eslint-disable no-undef */
          let loading = weui.loading('')
          http.post(that.deptUserTreeConObj.userUrl, {
            ajax_act: '',
            data: {
              dept: that.userScroll.loadId,
              offset: that.userScroll.offset,
              limit: that.userScroll.limit,
              name: ''
            }
          }).then((res) => {
            loading.hide()
            if (Number(res.errcode) === 0) {
              if (res.info.data.length < that.userScroll.limit) {
                that.userScroll.loadEnd = true
              }
              let userList = res.info.data
              for (let i in res.info.data) {
                that.allUserList.set('key' + res.info.data[i].id, res.info.data[i])
              }
              userList = that.userList.concat(userList)
              for (let i in userList) {
                let treeTab = userList[i].first_py.split('')[0].toUpperCase()
                if (isNaN(Number(treeTab))) {
                  userList[i].treeTab = treeTab
                } else {
                  userList[i].treeTab = '#'
                }
              }
              for (let i = 0; i < userList.length; i++) {
                if (i > 0 && userList[i].treeTab === userList[i - 1].treeTab) {
                  userList[i].treeTabShow = false
                } else {
                  userList[i].treeTabShow = true
                }
              }
              that.userList = userList
              that.userScroll.offset = that.userList.length
              resolve(true)
            }
          })
        })
      },
      // 人员列表返回部门列表
      userListBack () {
        this.showUser = false
        this.deptUserPlugSelect.loadUserData = {}
      },
      // 取消
      plugBack () {
        this.$emit('increment', {}, 'comfire-cancel')
      },
      // 获取部门选择结果
      getSelectDeptResult (dept) {
        let selectDeptList = []
        let deptList = JSON.parse(JSON.stringify(this.deptList))
        let deptListMap = this.getDeptListMap(deptList)
        for (let i in this.resultList.dept) {
          deptListMap.set('key' + this.resultList.dept[i].id, this.resultList.dept[i])
        }
        for (let i in dept) {
          let deptItem = deptListMap.get('key' + dept[i])
          selectDeptList.push(deptItem)
        }
        this.resultList.dept = selectDeptList
      },
      // 部门数据结构转单层的数据
      getDeptListMap (deptList) {
        this.allDeptList = new Map()
        this.recursionDeptItem(deptList)
        for (let i in this.resultList.dept) {
          this.allDeptList.set('key' + this.resultList.dept[i].id, this.resultList.dept[i])
        }
        return this.allDeptList
      },
      // 递归拆解部门对象
      recursionDeptItem (deptList) {
        for (let i in deptList) {
          let deptItem = JSON.parse(JSON.stringify(deptList[i]))
          delete deptItem.childs
          deptList.push(deptItem)
          this.allDeptList.set('key' + deptItem.id, deptItem)
          if (deptList[i].childs && deptList[i].childs.length > 0) {
            this.recursionDeptItem(deptList[i].childs)
          }
        }
      },
      // 获取人员选择结果
      getSelectUserResult (user) {
        let selectUserList = []
        let allUserListMap = new Map([...this.allUserList])
        for (let i in this.resultList.user) {
          allUserListMap.set('key' + this.resultList.user[i].id, this.resultList.user[i])
        }
        for (let i in user) {
          let userItem = allUserListMap.get('key' + user[i])
          selectUserList.push(userItem)
        }
        this.resultList.user = selectUserList
      },
      // 初始换部门部分滚动插件
      initDeptScrollObj () {
        let that = this
        let deptScrollObj = new BScroll(that.$refs['deptUserCenterLv1'], {
          scrollY: true,
          click: true,
          pullUpLoad: false,
          bounce: false
        })
        that.$set(that, 'deptScrollObj', deptScrollObj)
      },
      // 初始换部選中滚动插件
      initDeptUserSelectScrollObj () {
        let that = this
        let deptUserSelectScrollObj = new BScroll(that.$refs['resultList'], {
          scrollY: false,
          scrollX: true,
          click: true,
          pullUpLoad: false,
          bounce: false
        })
        that.$set(that, 'deptUserSelectScrollObj', deptUserSelectScrollObj)
      },
      // 初始换部门部分滚动插件
      initSearchScrollObj () {
        let that = this
        this.$nextTick(() => {
          if (that.searchScrollObj) {
            that.searchScrollObj.destroy()
          }
          that.$nextTick(() => {
            let searchScrollObj = new BScroll(that.$refs['deptUserCenterLv3'], {
              scrollY: true,
              click: true,
              pullUpLoad: false,
              bounce: false
            })
            that.$set(that, 'searchScrollObj', searchScrollObj)
          })
        })
      },
      // 确认选中
      comfireSelect () {
        let that = this
        let resultList = JSON.parse(JSON.stringify(that.resultList))
        this.$emit('increment', resultList, 'comfire-select')
      },
      // 进入我的部门
      intoMyDept (item) {
        this.deptUserPlugSelect.loadUserData = item
      },
      // 进入搜索
      intoSearch () {
        this.searchObj.searchInput = true
        this.$refs['searchInput'].focus()
        this.initSearchScrollObj()
      },
      // 退出搜索
      outSearch () {
        this.searchObj.inputKey = ''
        this.searchObj.searchInput = false
        this.searchList = []
      },
      // 请求搜索数据
      ajaxGetSearchList () {
        let that = this
        if (that.searchObj.inputKey.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
          return
        }
        let name = that.searchObj.inputKey.replace(/(^\s*)|(\s*$)/g, '')
        let deptId = that.deptUserPlugSelect.loadUserData.id ? that.deptUserPlugSelect.loadUserData.id : 0
        let loading = weui.loading('')
        http.post(that.deptUserTreeConObj.userUrl, {
          ajax_act: '',
          data: {
            dept: deptId,
            name: name,
            offset: 0,
            limit: 1000
          }
        }).then((res) => {
          loading.hide()
          that.searchList = res.info.data
          for (let i in res.info.data) {
            that.allUserList.set('key' + res.info.data[i].id, res.info.data[i])
          }
        })
      },
      // 点击删除
      delSelctItem (id, type) {
        if (Number(type) === 1) {
          let delIndex = 0
          for (let i in this.deptUserPlugSelect.deptUserSelect.dept) {
            if (Number(id) === Number(this.deptUserPlugSelect.deptUserSelect.dept[i])) {
              delIndex = i
              break
            }
          }
          this.deptUserPlugSelect.deptUserSelect.dept.splice(delIndex, 1)
        }
        if (Number(type) === 2) {
          let delIndex = 0
          for (let i in this.deptUserPlugSelect.deptUserSelect.user) {
            if (Number(id) === Number(this.deptUserPlugSelect.deptUserSelect.user[i])) {
              delIndex = i
              break
            }
          }
          this.deptUserPlugSelect.deptUserSelect.user.splice(delIndex, 1)
        }
      }
    },
    created () {
    },
    async mounted () {
      let that = this
      console.log('人员选择插件初始换参数', this.deptUserTreeConObj)
      // 初始换高度
      that.getDeptUserHeadHeight()
      // 初始化滚动(部门)
      that.initDeptScrollObj()
      // 初始换滚动(选中结果)
      that.initDeptUserSelectScrollObj()
      // 获取初始化话的数据
      await that.getInitDeptSelectObj()
      await that.getInitUserSelectObj()
      // 设置选中控制参数 vueX统一管理
      let deptUserPlugSelect = {
        // 人员选择器类型
        type: that.deptUserTreeConObj.type,
        // 人员选择器可选个数
        maxSelect: that.deptUserTreeConObj.maxSelect,
        // 第一次查询的url
        baseDeptUrl: that.deptUserTreeConObj.baseDeptUrl,
        // 查询下级部门
        deptUrl: that.deptUserTreeConObj.deptUrl,
        // 查询部门人员(支持关键字查找人员,当前不支持部门查找)
        userUrl: that.deptUserTreeConObj.userUrl,
        // 初始换查找,根据Id数组精确查找部门以及人员的url
        selectedUrl: that.deptUserTreeConObj.selectedUrl,
        // 初始换选中的人员或者部门id
        deptUserSelect: {
          dept: that.deptUserTreeConObj.deptUserSelect.dept,
          user: that.deptUserTreeConObj.deptUserSelect.user
        },
        // 加载的用户的部门对象
        loadUserData: {}
      }
      // vuex 保存选中控制参数
      that.$store.commit('setDeptUserPlugSelect', deptUserPlugSelect)
      // 加载第一集的节点
      let firstGetData = await that.getFirstLavelData()
      that.deptList = firstGetData.root_dept
      that.myDept = firstGetData.user_dept
      console.log('加载第一集的节点', that.deptList)
      // 显示结构树
      that.showDept = true
    },
    activated () {
    },
    deactivated () {
    },
    updated () {
    }
  }
</script>
