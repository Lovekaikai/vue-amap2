/* 前端根据控制不同环境配置文件的读写 */
'use strict'
let fs = require('fs')
let path = require('path')
module.exports = {
  w: function (type) {
    console.log('开始调整当前编译配置……')
    let file = ''
    if (type === 'dev') {
      file = path.join(__dirname, '../src/evnBaseRW/dev/evnBase.js')
    } else if (type === 'buildDev') {
      file = path.join(__dirname, '../src/evnBaseRW/buildDev/evnBase.js')
    } else if (type === 'buildPro') {
      file = path.join(__dirname, '../src/evnBaseRW/buildPro/evnBase.js')
    } else if (type === 'buildPre') {
      file = path.join(__dirname, '../src/evnBaseRW/buildPre/evnBase.js')
    } else if (type === 'buildDevLocal') {
      file = path.join(__dirname, '../src/evnBaseRW/buildDevLocal/evnBase.js')
    }
    let to = path.join(__dirname, '../src/common/js/evnBase.js')
    fs.writeFileSync(to, fs.readFileSync(file))
    console.log('结束调整当前编译配置……')
  }
}
