webpackJsonp([9],{"1iZw":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),s=i.n(a),n=i("oyxo"),l={metaInfo:{title:"活动报名"},data:function(){return{user_name:"",id:"",info:{},number1:0,can_family:"",enroll_custom:[],arr:[],family:[],arr1:[]}},created:function(){this.id=this.$route.params.id,this.getSignMess()},methods:{facouc:function(){},getSignMess:function(){var t=this;n.b.post("/index.php?app=activity&m=act&cmd=108",{data:{id:this.id}}).then(function(e){t.info=e.info,t.user_name=e.info.user_info.name,t.can_family=t.info.activity.can_family,t.enroll_custom=t.info.activity.enroll_custom,t.arr.push({name:"人员姓名",value:""});for(var i=0;i<t.enroll_custom.length;i++)t.arr.push({name:t.enroll_custom[i],val:""}),t.arr1.push({name:t.enroll_custom[i],val:""})})},confirm:function(){for(var t=this,e=[],i=0;i<this.family.length;i++){var a={};a.name=this.family[i][0].val,a.custom=this.family[i].slice(1,this.family[i].length),e.push(a)}var s={id:this.id,name:this.user_name,custom_msg:this.arr1,family_msg:e};if(0===this.trim(this.user_name).length)return this.$toast.fail({duration:1e3,message:"姓名不能为空"}),!1;for(var l in this.arr1)if(0===this.trim(this.arr1[l].val).length)return this.$toast.fail({duration:1e3,message:this.arr1[l].name+"不能为空"}),!1;for(var r in e){if(void 0===e[r].name)return this.$toast.fail({duration:1e3,message:"随行人员名字不能为空"}),!1;for(var c in e[r].custom)if(0===this.trim(e[r].custom[c].val).length)return this.$toast.fail({duration:1e3,message:e[r].custom[c].name+"不能为空"}),!1}n.b.post("/index.php?app=activity&m=act&cmd=109",{data:s}).then(function(e){0!==Number(e.errcode)&&-1!==Number(e.errcode)||(t.$toast.success({duration:1e3,message:"报名成功"}),setTimeout(function(){t.$router.go(-1)},1e3))})},trim:function(t){return t.replace(/ /g,"")},onChange:function(t){if(t===this.info.activity.limited)return this.$toast.fail({duration:1e3,message:"人数超过"+this.info.activity.limited}),!1;if(this.family.length<t)for(var e=0;e<t-this.family.length;e++){var i=JSON.parse(s()(this.arr));this.family.push(i)}else this.family.splice(t,1)}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"manage_sign_in"},[i("div",{staticClass:"content"},[i("div",{staticClass:"weui-panel"},[i("div",{staticClass:"weui-panel__hd title"},[i("div",{staticClass:"weui-cell"},[t._m(0),t._v(" "),i("div",{staticClass:"weui-cell__bd"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.user_name,expression:"user_name"}],staticClass:"weui-input",attrs:{placeholder:"请输入姓名",type:"text"},domProps:{value:t.user_name},on:{input:function(e){e.target.composing||(t.user_name=e.target.value)}}})])])]),t._v(" "),t._l(t.arr1,function(e,a){return i("div",{key:a,staticClass:"weui-panel__hd title"},[i("div",{staticClass:"weui-cell"},[i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[i("span",{staticClass:"red"},[t._v("*")]),t._v(t._s(e.name))])]),t._v(" "),i("div",{staticClass:"weui-cell__bd"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"item.val"}],staticClass:"weui-input",attrs:{placeholder:"请输入"+e.name,type:"text"},domProps:{value:e.val},on:{input:function(i){i.target.composing||t.$set(e,"val",i.target.value)}}})])])])})],2),t._v(" "),Number(t.can_family)?i("div",{staticClass:"weui-cells manage_people"},[i("div",{staticClass:"weui-cell"},[t._m(1),t._v(" "),i("div",{staticClass:"weui-cell__ft clearfix"},[i("wv-number-spinner",{attrs:{max:t.info.activity.family_limited},on:{change:t.onChange},model:{value:t.number1,callback:function(e){t.number1=e},expression:"number1"}})],1)])]):t._e(),t._v(" "),t._l(t.family,function(e,a){return i("div",{key:a,staticClass:"weui-panel"},t._l(e,function(e,a){return i("div",{key:a,staticClass:"weui-panel__hd title"},[i("div",{staticClass:"weui-cell"},[i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[i("span",{staticClass:"red"},[t._v("*")]),t._v(t._s(e.name))])]),t._v(" "),i("div",{staticClass:"weui-cell__bd"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"item.val"}],staticClass:"weui-input",attrs:{placeholder:"请输入"+e.name,type:"text"},domProps:{value:e.val},on:{input:function(i){i.target.composing||t.$set(e,"val",i.target.value)}}})])])])}))})],2)]),t._v(" "),i("a",{staticClass:"weui-btn weui-btn_primary btn",attrs:{href:"javascript:;"},on:{click:t.confirm}},[t._v("确定")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"weui-cell__hd"},[e("label",{staticClass:"weui-label"},[e("span",{staticClass:"red"},[this._v("*")]),this._v("姓名")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"weui-cell__bd"},[e("p",[this._v("随行人员")])])}]};var c=i("VU/8")(l,r,!1,function(t){i("WiLN")},"data-v-03e25f10",null);e.default=c.exports},WiLN:function(t,e){}});