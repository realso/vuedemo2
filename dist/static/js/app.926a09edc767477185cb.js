webpackJsonp([6],{"+9g/":function(n,e,t){"use strict";var a=t("aA9S"),r=t.n(a),o=t("3cXf"),u=t.n(o),i=t("rVsN"),c=t.n(i),s=t("aozt"),p=t.n(s),f=t("IcnI");p.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",p.a.defaults.headers.get["Content-Type"]="application/x-www-form-urlencoded";var l=function(n){if("string"==typeof n)return n;var e="";for(var t in n)e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t])+"&";return e};p.a.defaults.transformRequest=[l];var d=[],m=p.a.CancelToken,h=function(n){for(var e in d)d[e].u===""+n.url+n.method+l(n.data)&&(d[e].f("您的手速太快了"),d.splice(e,1));console.log(n)};p.a.interceptors.request.use(function(n){if(function(n){var e=!1;1==n.data.ISCHECKREPEAT&&(e=!!d.find(function(e){return e.u===""+n.url+n.method+l(n.data)}));return e}(n))throw new Error("请求已提交,无须重复提交！");return h(n),n.cancelToken=new m(function(e){d.push({u:""+n.url+n.method+l(n.data),f:e})}),n},function(n){return c.a.reject(n)}),p.a.interceptors.response.use(function(n){return h(n.config),n},function(n,e){return c.a.reject(n)});var I=function(n){var e="";switch(n){case"upload":e=getURL("url")+"/upload/file.aspx?appId=2";break;case"url":e="http://218.22.251.156/gj-app-2/data2.aspx?appId=2",f.a.state.user.userInfo.sessionID&&(e+="&sessionID="+f.a.state.user.userInfo.sessionID);break;case"socket":e="ws://ydzl.gujing.net:9091";break;default:alert("类型："+n+"不存在！")}return e},v=function(n){return new c.a(function(e,t){p.a.post(I("url"),n).then(function(n){n||t(new Error("请求异常")),"-201"==n.data.resulttype&&$app.$router.replace("/loginout"),"-100"==n.data.resulttype?(console.error(n),t(new Error(n.data.message))):e(n.data)}).catch(function(n){t(n)})})};e.a={getUrl:I,postData:v,open:function(n){var e={};return n.sqlId?(e.tp="query6",e.json=encodeURIComponent(u()({params:n}))):(n.tp="query1",e=n),v(e)},openTables:function(n){var e={},t={};return n.forEach(function(n){var e=n.path,a=n.para;a=function(n){var e={where:"",orderBy:"",pageSize:20,pageIndex:1,groupBy:"",egg:"",having:""};return e=r()(e,n)}(a),n.para=a,a.scmName=a.scmName||a.modalName,t[e]=n}),e.tp="query4",e.json=encodeURIComponent(u()(t)),v(e)},getNewID:function(n,e){return v({tp:"getid",modalName:n,col:e})},call:function(n){var e={tp:"call",ISCHECKREPEAT:n.ISCHECKREPEAT,json:encodeURIComponent(u()({para:n}))};return v(e)}}},0:function(n,e){},"0nQ+":function(n,e){},"5mrV":function(n,e){},EcNX:function(n,e){},IcnI:function(n,e,t){"use strict";var a,r,o=t("IvJb"),u=t("9rMa"),i=t("lC5x"),c=t.n(i),s=t("J0Oq"),p=t.n(s),f=t("+9g/"),l=(a=p()(c.a.mark(function n(e){return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e.tp="login",n.abrupt("return",f.a.postData(e));case 2:case"end":return n.stop()}},n,this)})),function(n){return a.apply(this,arguments)}),d=(r=p()(c.a.mark(function n(){var e;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return(e={}).tp="loadmenu",n.abrupt("return",f.a.postData(e));case 3:case"end":return n.stop()}},n,this)})),function(){return r.apply(this,arguments)}),m={namespaced:!0,state:{},mutations:{INIT_DATA:function(n){},SET_DATA:function(n,e){}},getters:{},actions:{}},h={namespaced:!0,state:{userInfo:{},form_email:"",form_password:"",form_recordPass:!0},mutations:{INIT_DATA:function(n){n.userInfo={}},SET_DATA:function(n,e){n.userInfo=e||{}},SET_LOGINSTATUS:function(n){var e=n.userInfo,t="";"2"==e.status?n.ISLOGIN=!0:t="0"==e.ISUSE?"用户已停用！":3==e.status?"用户名不存在！":"用户名密码不匹配！",n.ERRMESSAGE=t}},getters:{isLogin:function(n){return 2==n.userInfo.status}},actions:{login:function(n,e){var t=this,a=n.commit;return p()(c.a.mark(function n(){var r;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l(e);case 2:r=n.sent,a("SET_DATA",r.data),a("SET_LOGINSTATUS");case 5:case"end":return n.stop()}},n,t)}))()},loginOut:function(n){(0,n.commit)("SET_DATA",null)}}},I={namespaced:!0,state:{pcode:{}},mutations:{INIT_DATA:function(n){n.pcode={}},SET_DATA:function(n,e){n.pcode={},(e=e||[]).forEach(function(e){n.pcode[e.PCODE||e.FUNCID]=e})}},getters:{},actions:{loadData:function(){var n=p()(c.a.mark(function n(e){var t,a=e.commit;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d();case 2:t=n.sent,a("SET_DATA",(t.data||{}).items);case 4:case"end":return n.stop()}},n,this)}));return function(e){return n.apply(this,arguments)}}()}},v=t("jTNT");o.a.use(u.b);var g=new u.b.Store({modules:{user:h,app:m,permission:I},getters:{userInfo:function(n){return n.user.userInfo},pcode:function(n){return n.permission.pcode}},plugins:[Object(v.a)({paths:["user","permission"]})]});e.a=g},NHnr:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("lC5x"),r=t.n(a),o=t("J0Oq"),u=t.n(o),i=t("IvJb"),c={render:function(){var n=this.$createElement,e=this._self._c||n;return e("div",{attrs:{id:"app"}},[e("div",{staticStyle:{height:"100%"}},[e("transition",{attrs:{name:this.transitionName}},[e("keep-alive",[e("router-view")],1)],1)],1)])},staticRenderFns:[]};var s=t("C7Lr")({name:"App",data:function(){return{transitionName:"slide-left"}},watch:{$route:function(n,e){var t=this.$router.isBack;this.transitionName=t?"slide-right":"slide-left",this.$router.isBack=!1}}},c,!1,function(n){t("r+KP")},null,null).exports,p=t("zO6J"),f=t("IcnI"),l=[{path:"/login",name:"login",component:function(n){return t.e(3).then(function(){return n(t("jT7l"))}.bind(null,t)).catch(t.oe)}},{path:"/loginout",name:"loginout",beforeEnter:function(n,e,t){f.a.dispatch("user/loginOut").then(function(){t({path:"/login",replace:!0})})}}],d={path:"/",name:"main",component:function(n){return t.e(1).then(function(){return n(t("uUni"))}.bind(null,t)).catch(t.oe)},redirect:"/main1",meta:{keepAlive:!0},children:[{path:"/main1",name:"main1",component:function(n){return t.e(1).then(function(){return n(t("EY4z"))}.bind(null,t)).catch(t.oe)}},{path:"/main2",name:"main2",component:function(n){return t.e(1).then(function(){return n(t("5A94"))}.bind(null,t)).catch(t.oe)},meta:{keepAlive:!1}},{path:"/main3",name:"main3",component:function(n){return t.e(1).then(function(){return n(t("n8qx"))}.bind(null,t)).catch(t.oe)}},{path:"/main4",name:"main4",component:function(n){return t.e(1).then(function(){return n(t("BRKW"))}.bind(null,t)).catch(t.oe)}}]},m={path:"/404",name:"404",component:function(n){return t.e(2).then(function(){return n(t("P+yW"))}.bind(null,t)).catch(t.oe)}},h={path:"/jiesuan",name:"jiesuan",component:function(n){return t.e(0).then(function(){return n(t("/HFg"))}.bind(null,t)).catch(t.oe)},redirect:"/jiesuan/add/main",children:[{path:"/jiesuan/add/main",name:"/jiesuan/add/main",component:function(n){return t.e(0).then(function(){return n(t("8Kpb"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"日结算"},meta:{keepAlive:!0}},{path:"/jiesuan/add/set",name:"jiesuan/add/set",component:function(n){return t.e(0).then(function(){return n(t("lGY5"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"设置项目"},meta:{keepAlive:!0}},{path:"/jiesuan/add/empsel",name:"/jiesuan/add/empsel",component:function(n){return t.e(0).then(function(){return n(t("eX0N"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择店长",refStore:{mutation:"jiesuan/setEmp",path:"MAIN"}},meta:{keepAlive:!0}},{path:"/jiesuan/add/snodesel",name:"/jiesuan/add/snodesel",component:function(n){return t.e(0).then(function(){return n(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{action:"jiesuan/setSnode",path:"MAIN"}},meta:{keepAlive:!0}}]},I={path:"/jiesuan1",name:"jiesuan1",component:function(n){return t.e(0).then(function(){return n(t("zAJM"))}.bind(null,t)).catch(t.oe)},meta:{keepAlive:!0},redirect:"/jiesuan1/add/main",children:[{path:"/jiesuan1/add/main",name:"/jiesuan1/add/main",component:function(n){return t.e(0).then(function(){return n(t("HlNc"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"日结算"},meta:{keepAlive:!0}},{path:"/jiesuan1/add/set",name:"/jiesuan1/add/set",component:function(n){return t.e(0).then(function(){return n(t("l7V2"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"设置项目"},meta:{keepAlive:!0}},{path:"/jiesuan1/add/empsel",name:"/jiesuan1/add/empsel",component:function(n){return t.e(0).then(function(){return n(t("eX0N"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择店长",refStore:{mutation:"jiesuan1/setEmp",path:"MAIN"}},meta:{keepAlive:!0}},{path:"/jiesuan1/add/snodesel",name:"/jiesuan1/add/snodesel",component:function(n){return t.e(0).then(function(){return n(t("N6sq"))}.bind(null,t)).catch(t.oe)},props:{TITLE:"选择经营门店",refStore:{action:"jiesuan1/setSnode",path:"MAIN"}},meta:{keepAlive:!0}}]},v={path:"/zhishiku",name:"zhishiku",component:function(n){return t.e(4).then(function(){return n(t("12f7"))}.bind(null,t)).catch(t.oe)}};i.a.use(p.a);var g=[];(g=g.concat(l)).push(d),g.push(m),g.push(h),g.push(I),g.push(v);var T=new p.a({routes:g});T.beforeEach(function(n,e,t){n.matched&&0!=n.matched.length?-1!=["login","404","503"].indexOf(n.name)||f.a.getters["user/isLogin"]?t():t({path:"/login",query:{redirect:n.fullPath}}):t({path:"/404"})}),p.a.prototype.goBack=function(){this.isBack=!0,this.go(-1)};var A,E,b=T,w=t("5e9w"),j=t.n(w),k=t("0nQ+"),N=t.n(k),S=(t("5mrV"),t("EcNX"),t("RFxO"),t("CRWL")),y=t.n(S);t("t8mb"),t("r8N3");i.a.use(y.a),i.a.use(j.a),i.a.use(N.a),i.a.config.productionTip=!1,i.a.prototype.isPower=function(n){return!!this.$store.getters.pcode[n]},i.a.prototype.$alert=(A=u()(r.a.mark(function n(e,t){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",j.a.MessageBox.alert(e,t));case 1:case"end":return n.stop()}},n,this)})),function(n,e){return A.apply(this,arguments)}),i.a.prototype.$confirm=(E=u()(r.a.mark(function n(e,t){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",j.a.MessageBox.confirm(e,t));case 1:case"end":return n.stop()}},n,this)})),function(n,e){return E.apply(this,arguments)}),i.a.prototype.$busy=function(n){return this.$indicator.open(n)},i.a.prototype.$free=function(){return this.$indicator.close()},i.a.prototype.$callAction=function(n){var e=this,t=n.action,a=n.param,o=n.successText,i=n.errorText,c=n.successCall,s=n.errorCall,p=(n.isBusy,n.isSuccessBack),f=n.isErrorBack,l=n.timeOut;setTimeout(u()(r.a.mark(function n(){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.$indicator.open(),e.$store.dispatch(t,a).then(function(){e.$indicator.close(),o&&e.$toast({message:o,position:"bottom"}),c&&c(),p&&e.$router.goBack()}).catch(function(n){e.$indicator.close(),e.$toast({message:i||n.message||"加载失败",position:"bottom"}),s&&s(),f&&e.$router.goBack()});case 2:case"end":return n.stop()}},n,e)})),l||0)},window.$app=new i.a({el:"#app",router:b,store:f.a,components:{App:s},template:"<App/>"})},RFxO:function(n,e){},"r+KP":function(n,e){},r8N3:function(n,e){},t8mb:function(n,e){}},["NHnr"]);
//# sourceMappingURL=app.926a09edc767477185cb.js.map