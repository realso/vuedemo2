webpackJsonp([11],{"+9g/":function(e,n,t){"use strict";var a=t("aA9S"),r=t.n(a),o=t("3cXf"),i=t.n(o),u=t("rVsN"),s=t.n(u),c=t("aozt"),l=t.n(c),p=t("IcnI");l.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",l.a.defaults.headers.get["Content-Type"]="application/x-www-form-urlencoded";var d=function(e){if("string"==typeof e)return e;var n="";for(var t in e)n+=encodeURIComponent(t)+"="+encodeURIComponent(e[t])+"&";return n};l.a.defaults.transformRequest=[d];var m=[],f=l.a.CancelToken,h=function(e){for(var n in m)m[n].u===""+e.url+e.method+d(e.data)&&(m[n].f("您的手速太快了"),m.splice(n,1))};l.a.interceptors.request.use(function(e){if(function(e){var n=!1;1==e.data.ISCHECKREPEAT&&(n=!!m.find(function(n){return n.u===""+e.url+e.method+d(e.data)}));return n}(e))throw new Error("请求已提交,无须重复提交！");return h(e),e.cancelToken=new f(function(n){m.push({u:""+e.url+e.method+d(e.data),f:n})}),e},function(e){return s.a.reject(e)}),l.a.interceptors.response.use(function(e){return h(e.config),e},function(e,n){return s.a.reject(e)});var v=function(e){var n="";switch(e){case"upload":n=getURL("url")+"/upload/file.aspx?appId=2";break;case"url":n="http://218.22.251.156/gj-app-2/data2.aspx?appId=2",p.a.state.user.userInfo.sessionID&&(n+="&sessionID="+p.a.state.user.userInfo.sessionID);break;case"socket":n="ws://ydzl.gujing.net:9091";break;default:alert("类型："+e+"不存在！")}return n},b=function(e){return new s.a(function(n,t){l.a.post(v("url"),e).then(function(e){e||t(new Error("请求异常")),"-201"==e.data.resulttype&&(t(new Error("登陆超时")),$app.$router.replace("/loginout")),"-100"==e.data.resulttype||"-101"==e.data.resulttype?(console.error(e),t(new Error(e.data.message))):"-105"==e.data.resulttype?(console.error(e),t(new Error("内部错误"))):n(e.data)}).catch(function(e){t(e)})})};n.a={getUrl:v,postData:b,open:function(e){var n={};return e.sqlId?(n.tp="query6",n.json=encodeURIComponent(i()({params:e}))):(e.tp="query1",n=e),b(n)},openTables:function(e){var n={},t={};return e.forEach(function(e){var n=e.path,a=e.para;a=function(e){var n={where:"",orderBy:"",pageSize:20,pageIndex:1,groupBy:"",egg:"",having:""};return n=r()(n,e)}(a),e.para=a,a.scmName=a.scmName||a.modalName,t[n]=e}),n.tp="query4",n.json=encodeURIComponent(i()(t)),b(n)},getNewID:function(e,n){return b({tp:"getid",modalName:e,col:n})},call:function(e){var n={tp:"call",ISCHECKREPEAT:e.ISCHECKREPEAT,json:encodeURIComponent(i()({para:e}))};return b(n)}}},"+wDA":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/jiesuan1",name:"jiesuan1",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("zAJM"))}.bind(null,t)).catch(t.oe)},meta:{keepAlive:!0},redirect:"/jiesuan1/add/main",children:[{path:"/jiesuan1/add/main",name:"/jiesuan1/add/main",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("HlNc"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"日结算"},meta:{keepAlive:!0}},{path:"/jiesuan1/add/set",name:"/jiesuan1/add/set",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("l7V2"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"设置项目"},meta:{keepAlive:!0}},{path:"/jiesuan1/add/empsel",name:"/jiesuan1/add/empsel",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("eX0N"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择店长",refStore:{mutation:"jiesuan1/setEmp",path:"MAIN"}},meta:{keepAlive:!0}},{path:"/jiesuan1/add/snodesel",name:"/jiesuan1/add/snodesel",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{action:"jiesuan1/setSnode",path:"MAIN"}},meta:{keepAlive:!0}},{path:"/jiesuan1/detail/jiesuanribao",name:"/jiesuan1/detail/jiesuanribao",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("gasv"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"结算日报"},meta:{keepAlive:!0}},{path:"/jiesuan1/detail/main",name:"/jiesuan1/detail/main",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("4g9L"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"明细"},meta:{keepAlive:!0}}]}},"0nQ+":function(e,n){},"5hyc":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/",name:"main",component:function(e){return Promise.all([t.e(3),t.e(0)]).then(function(){return e(t("uUni"))}.bind(null,t)).catch(t.oe)},redirect:"/main1",meta:{isMain:1},children:[{path:"/main1",name:"main1",component:function(e){return Promise.all([t.e(3),t.e(0)]).then(function(){return e(t("EY4z"))}.bind(null,t)).catch(t.oe)}},{path:"/main2",name:"main2",component:function(e){return Promise.all([t.e(3),t.e(0)]).then(function(){return e(t("5A94"))}.bind(null,t)).catch(t.oe)},meta:{keepAlive:!1}},{path:"/main3",name:"main3",component:function(e){return Promise.all([t.e(3),t.e(0)]).then(function(){return e(t("n8qx"))}.bind(null,t)).catch(t.oe)}},{path:"/main4",name:"main4",component:function(e){return Promise.all([t.e(3),t.e(0)]).then(function(){return e(t("BRKW"))}.bind(null,t)).catch(t.oe)}}]}},"8cs5":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("IcnI");n.default=[{path:"/login",name:"login",component:function(e){return t.e(8).then(function(){return e(t("jT7l"))}.bind(null,t)).catch(t.oe)}},{path:"/loginout",name:"loginout",beforeEnter:function(e,n,t){a.a.dispatch("user/loginOut").then(function(){t({path:"/login",replace:!0})})}}]},EcNX:function(e,n){},FAxC:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=[{path:"/bvsale",name:"bvsale",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("32Ge"))}.bind(null,t)).catch(t.oe)},redirect:"/bvsale/add/main",meta:{level:0},children:[{path:"/bvsale/add/main",name:"/bvsale/add/main",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("xIW9"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"订货单"},meta:{level:1}},{path:"/bvsale/add/mat",name:"/bvsale/add/mat",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("t1gn"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"物料"},meta:{level:2}},{path:"/bvsale/add/jsnodesel",name:"/bvsale/add/jsnodesel",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("eYLe"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营网点",refStore:{action:"bvsale/changeSnode",path:"MAIN"}},meta:{level:2}}]},{path:"/bvsale/list",name:"/bvsale/list",meta:{level:0},component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("za3j"))}.bind(null,t)).catch(t.oe)},redirect:"/bvsale/list/main",children:[{path:"/bvsale/list/main",name:"/bvsale/list/main",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("UOUA"))}.bind(null,t)).catch(t.oe)},props:function(e){return{TITLE:"订货管理",_DATA:new Date}}},{path:"/bvsale/list/jsnodesel",name:"/bvsale/list/jsnodesel",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("eYLe"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营网点"}}]},{path:"/bvsale/list1",name:"/bvsale/list1",meta:{level:0},component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("R7OH"))}.bind(null,t)).catch(t.oe)},redirect:"/bvsale/list1/main",children:[{path:"/bvsale/list1/main",name:"/bvsale/list1/main",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("sMG5"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"订货状况"}},{path:"/bvsale/list1/jsnodesel",name:"/bvsale/list1/jsnodesel",component:function(e){return Promise.all([t.e(2),t.e(0)]).then(function(){return e(t("eYLe"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营网点"}}]}]},G8Rg:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/zhishiku",name:"zhishiku",component:function(e){return t.e(9).then(function(){return e(t("12f7"))}.bind(null,t)).catch(t.oe)}}},IcnI:function(e,n,t){"use strict";var a,r,o=t("IvJb"),i=t("9rMa"),u=t("lC5x"),s=t.n(u),c=t("J0Oq"),l=t.n(c),p=t("+9g/"),d=(a=l()(s.a.mark(function e(n){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.tp="login",e.abrupt("return",p.a.postData(n));case 2:case"end":return e.stop()}},e,this)})),function(e){return a.apply(this,arguments)}),m=(r=l()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n={}).tp="loadmenu",e.abrupt("return",p.a.postData(n));case 3:case"end":return e.stop()}},e,this)})),function(){return r.apply(this,arguments)}),f={namespaced:!0,state:{},mutations:{INIT_DATA:function(e){},SET_DATA:function(e,n){}},getters:{},actions:{}},h={namespaced:!0,state:{userInfo:{},form_email:"",form_password:"",form_recordPass:!0},mutations:{INIT_DATA:function(e){e.userInfo={}},SET_DATA:function(e,n){e.userInfo=n||{}},SET_LOGINSTATUS:function(e){var n=e.userInfo,t="";"2"==n.status?e.ISLOGIN=!0:t="0"==n.ISUSE?"用户已停用！":3==n.status?"用户名不存在！":"用户名密码不匹配！",e.ERRMESSAGE=t}},getters:{isLogin:function(e){return 2==e.userInfo.status}},actions:{login:function(e,n){var t=this,a=e.commit;return l()(s.a.mark(function e(){var r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(n);case 2:r=e.sent,a("SET_DATA",r.data),a("SET_LOGINSTATUS");case 5:case"end":return e.stop()}},e,t)}))()},loginOut:function(e){(0,e.commit)("SET_DATA",null)}}},v={namespaced:!0,state:{pcode:{}},mutations:{INIT_DATA:function(e){e.pcode={}},SET_DATA:function(e,n){e.pcode={},(n=n||[]).forEach(function(n){e.pcode[n.PCODE||n.FUNCID]=n})}},getters:{},actions:{loadData:function(){var e=l()(s.a.mark(function e(n){var t,a=n.commit;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m();case 2:t=e.sent,a("SET_DATA",(t.data||{}).items);case 4:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}()}},b=t("jTNT");o.a.use(i.b);var j=new i.b.Store({modules:{user:h,app:f,permission:v},getters:{userInfo:function(e){return e.user.userInfo},pcode:function(e){return e.permission.pcode}},plugins:[Object(b.a)({paths:["user","permission"]})]});n.a=j},MlRp:function(e,n){},MzL1:function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("ZLEe"),r=t.n(a),o=t("IvJb"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("rs-views")],1)},staticRenderFns:[]};var u=t("C7Lr")({name:"App",data:function(){return{}}},i,!1,function(e){t("UNqR")},null,null).exports,s=t("zO6J"),c=t("IcnI");o.a.use(s.a);var l,p=[],d=t("Xnq/");(l=d).keys().map(l).forEach(function(e){e.default instanceof Array?p=p.concat(e.default):p.push(e.default)});var m=new s.a({routes:p});m.beforeEach(function(e,n,t){e.matched&&0!=e.matched.length?-1!=["login","404","503"].indexOf(e.name)||c.a.getters["user/isLogin"]?!n.name&&"main1"!=e.name&&c.a.getters["user/isLogin"]?t({name:"main1",replace:!0}):t():t({path:"/login",query:{redirect:e.fullPath}}):t({path:"/404"})}),s.a.prototype.goBack=function(e){this.isBack=!0,this.isForce=e||!1,this.go(-1)};var f,h,v,b=m,j=t("JIbx"),T={getWeek:function(e){return e?e+" "+Object(j.e)(e):""},toFixed:function(e,n){if("0"==e||""!=e)return parseFloat(e||0).toFixed(n)},datePart:function(e,n){return Object(j.b)(e,n)}},g=t("IHPB"),I=t.n(g),A=t("rVsN"),E=t.n(A),w=t("lC5x"),y=t.n(w),P=t("J0Oq"),k=t.n(P),_=t("9Q01"),L=t.n(_);o.a.prototype.$isPower=function(e){return!!this.$store.getters.pcode[e]},o.a.prototype.$alert=(f=k()(y.a.mark(function e(n,t){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",L.a.MessageBox.alert(n,t));case 1:case"end":return e.stop()}},e,this)})),function(e,n){return f.apply(this,arguments)}),o.a.prototype.$confirm=(h=k()(y.a.mark(function e(n,t){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",L.a.MessageBox.confirm(n,t));case 1:case"end":return e.stop()}},e,this)})),function(e,n){return h.apply(this,arguments)}),o.a.prototype.$busy=function(e){return this.$indicator.open(e)},o.a.prototype.$free=function(){return this.$indicator.close()},o.a.prototype.$callAsync=(v=k()(y.a.mark(function e(n){var t=this,a=n.method,r=n.params,o=n.timeOut;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.$busy(),e.abrupt("return",new E.a(function(e,n){setTimeout(k()(y.a.mark(function o(){return y.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:a.apply(void 0,I()(r)).then(function(n){e(n)}).catch(function(e){t.$toast(e.message),n(e)}).then(function(){t.$free()});case 1:case"end":return o.stop()}},o,t)})),o||0)}));case 2:case"end":return e.stop()}},e,this)})),function(e){return v.apply(this,arguments)}),o.a.prototype.$callAction=function(e){var n=this,t=e.action,a=e.param,r=e.successText,o=e.errorText,i=e.successCall,u=e.errorCall,s=(e.isBusy,e.isSuccessBack),c=e.isErrorBack,l=e.timeOut;setTimeout(k()(y.a.mark(function e(){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.$indicator.open(),n.$store.dispatch(t,a).then(function(){n.$indicator.close(),r&&n.$toast({message:r,position:"bottom"}),i&&i(),s&&n.$router.goBack(!0)}).catch(function(e){n.$indicator.close(),n.$toast({message:o||e.message||"加载失败",position:"bottom"}),u&&u(),c&&n.$router.goBack(!0)});case 2:case"end":return e.stop()}},e,n)})),l||0)};var S=t("0nQ+"),N=t.n(S),x=(t("MzL1"),t("EcNX"),t("RFxO"),{name:"rs-views",data:function(){return{transitionName:"slide-left"}},activated:function(){},watch:{$route:function(e,n){var t=!1;if(e.meta.time&&e.meta.time<n.meta.time&&(t=!0),t){if(this.$parent.$parent==this.$root){if(e.matched[0].instances.default==n.matched[0].instances.default)return}else if(this.$parent!==e.matched[0].instances.default&&e.matched[0].instances.default)return;this.transitionName="slide-right",e.meta.time=(new Date).getTime(),n.meta.time=0,setTimeout(function(){e.matched[0].instances.default!=n.matched[0].instances.default&&(n.matched[0].instances.default.destroy=!0)},600)}else e.meta.time=(new Date).getTime(),this.transitionName="slide-left";this.$router.isBack=!1}}}),$={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticStyle:{height:"100%",width:"100%"}},[n("transition",{attrs:{name:this.transitionName}},[n("keep-alive",[n("router-view")],1)],1)],1)},staticRenderFns:[]};var O=t("C7Lr")(x,$,!1,function(e){t("MlRp")},null,null).exports,M={name:"rs-view",data:function(){return{destroy:!1}},activated:function(){this.destroy=!1,console.log("view.activated")},deactivated:function(){var e=this;setTimeout(function(){e.destroy=!0},300),console.log("view.deactivated")},destroyed:function(){console.log("view.destroyed")}},D={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._t("default")],2)},staticRenderFns:[]},R=t("C7Lr")(M,D,!1,null,null,null).exports,C=function e(n){arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.installed||(n.component(O.name,O),n.component(R.name,R))};"undefined"!=typeof window&&window.Vue&&C(window.Vue);var q={install:C,Views:O};o.a.use(L.a),o.a.use(N.a),o.a.use(q),o.a.config.productionTip=!1,r()(T).forEach(function(e){o.a.filter(e,T[e])}),window.$app=new o.a({el:"#app",router:b,store:c.a,components:{App:u},template:"<App/>"})},RFxO:function(e,n){},TADB:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/jiesuan",name:"jiesuan",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("/HFg"))}.bind(null,t)).catch(t.oe)},redirect:"/jiesuan/add/main",children:[{path:"/jiesuan/add/main",name:"/jiesuan/add/main",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("8Kpb"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"日结算"},meta:{keepAlive:!0}},{path:"/jiesuan/add/set",name:"jiesuan/add/set",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("lGY5"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"设置项目"},meta:{keepAlive:!0}},{path:"/jiesuan/add/empsel",name:"/jiesuan/add/empsel",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("eX0N"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择店长",refStore:{mutation:"jiesuan/setEmp",path:"MAIN"}},meta:{keepAlive:!0}},{path:"/jiesuan/add/snodesel",name:"/jiesuan/add/snodesel",component:function(e){return Promise.all([t.e(1),t.e(0)]).then(function(){return e(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{action:"jiesuan/setSnode",path:"MAIN"}},meta:{keepAlive:!0}}]}},UKIM:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/jiesuandongtai",name:"jiesuandongtai",component:function(e){return Promise.all([t.e(0),t.e(6)]).then(function(){return e(t("QqvW"))}.bind(null,t)).catch(t.oe)},redirect:"/jiesuandongtai/main/jiesuandongtai",children:[{path:"/jiesuandongtai/main/jiesuandongtai",name:"/jiesuandongtai/main/jiesuandongtai",component:function(e){return Promise.all([t.e(0),t.e(6)]).then(function(){return e(t("mwFl"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"结算动态表"},meta:{keepAlive:!0}},{path:"/jiesuandongtai/main/snodesel",name:"/jiesuandongtai/main/snodesel",component:function(e){return Promise.all([t.e(0),t.e(6)]).then(function(){return e(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{mutation:"jiesuandongtai/setSnode",path:"QRYADV"}},meta:{keepAlive:!0}},{path:"/jiesuandongtai/main/detail",name:"/jiesuandongtai/main/detail",component:function(e){return Promise.all([t.e(0),t.e(6)]).then(function(){return e(t("67tS"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"明细"},meta:{keepAlive:!0}}]}},UNqR:function(e,n){},"Xnq/":function(e,n,t){var a={"./T404/router.js":"i6qi","./bvsale/router.js":"FAxC","./dongtai/router.js":"i3V+","./jiesuan.1/router.js":"+wDA","./jiesuan/router.js":"TADB","./jiesuandongtai/router.js":"UKIM","./jiesuanribao/router.js":"vSsJ","./login/router.js":"8cs5","./main/router.js":"5hyc","./zhishiku/router.js":"G8Rg"};function r(e){return t(o(e))}function o(e){var n=a[e];if(!(n+1))throw new Error("Cannot find module '"+e+"'.");return n}r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id="Xnq/"},"i3V+":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/dongtai",name:"dongtai",component:function(e){return Promise.all([t.e(0),t.e(4)]).then(function(){return e(t("dgzW"))}.bind(null,t)).catch(t.oe)},meta:{keepAlive:!0},redirect:"/dongtai/detail/main",children:[{path:"/dongtai/detail/main",name:"/dongtai/detail/main",component:function(e){return Promise.all([t.e(0),t.e(4)]).then(function(){return e(t("uNdK"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"结算动态表"},meta:{keepAlive:!0}},{path:"/dongtai/detail/snodesel",name:"/dongtai/detail/snodesel",component:function(e){return Promise.all([t.e(0),t.e(4)]).then(function(){return e(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{action:"dongtai/setSnode",path:"MAIN"}},meta:{keepAlive:!0}},{path:"/dongtai/detail/detail",name:"/dongtai/detail/detail",component:function(e){return Promise.all([t.e(0),t.e(4)]).then(function(){return e(t("FU2c"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"明细"},meta:{keepAlive:!0}}]}},i6qi:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/404",name:"404",component:function(e){return t.e(7).then(function(){return e(t("P+yW"))}.bind(null,t)).catch(t.oe)}}},vSsJ:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={path:"/jiesuanribao",name:"jiesuanribao",component:function(e){return Promise.all([t.e(0),t.e(5)]).then(function(){return e(t("26/B"))}.bind(null,t)).catch(t.oe)},redirect:"/jiesuanribao/main/jiesuanribao",children:[{path:"/jiesuanribao/main/jiesuanribao",name:"/jiesuanribao/main/jiesuanribao",component:function(e){return Promise.all([t.e(0),t.e(5)]).then(function(){return e(t("sotz"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"结算日报"},meta:{keepAlive:!0}},{path:"/jiesuanribao/main/snodesel",name:"/jiesuanribao/main/snodesel",component:function(e){return Promise.all([t.e(0),t.e(5)]).then(function(){return e(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{mutation:"jiesuanribao/setSnode",path:"QRYADV"}},meta:{keepAlive:!0}},{path:"/jiesuanribao/main/detail",name:"/jiesuanribao/main/detail",component:function(e){return Promise.all([t.e(0),t.e(5)]).then(function(){return e(t("y7jn"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"明细"},meta:{keepAlive:!0}}]}}},["NHnr"]);
//# sourceMappingURL=app.0e1b4debd83af3ef4145.js.map