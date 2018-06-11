<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="less">
  #app {
    height: 100vh;
    .weui-loadmore__tips {
      background: rgb(245, 245, 245) !important;
    }
  }
  .activityList {
    .weui-cells {
      margin-top: 0 !important;
    }
    .weui-cells {
    background-color: #fff;
    line-height: 1.47058824;
    font-size: 17px;
    overflow: hidden;
    /* position: relative; */
    border-radius: 10px !important;
}
    .weui-action {
      .weui-check__label {
        border-radius: 1%;
        flex-direction: row-reverse !important;
        position: relative;
      }
      .weui-cell__bd {
        width: 80px;
        padding-left: 20px;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
      .weui-cell__ft {
        position: absolute;
        left: 0;
      }
    }
    .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
      display: block;
      content: "\EA08";
      color: #4c84c4 !important;
      font-size: 16px;
    }

  }

  section.sec_2 p:nth-child(2) img {
    width: 100%;
  }
  *{
        list-style-type: none;
   }
</style>
