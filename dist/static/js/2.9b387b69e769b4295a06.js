webpackJsonp([2],{"7Otq":function(t,e,r){t.exports=r.p+"static/img/logo.0c7f5a3.png"},MZRk:function(t,e){},jT7l:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("lC5x"),o=r.n(s),i=r("J0Oq"),a=r.n(i),n={name:"login",data:function(){return{form_email:this.$store.state.user.form_email,form_password:this.$store.state.user.form_password,form_recordPass:this.$store.state.user.form_recordPass}},computed:{},components:{},created:function(){},methods:{doLogin:function(){var t=a()(o.a.mark(function t(){var e;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this,t.next=3,this.$store.dispatch("user/login",{form_email:this.form_email,form_password:this.form_password,guid:this.getGuidGenerator()});case 3:if(!this.$store.getters["user/isLogin"]){t.next=9;break}return t.next=6,this.$store.dispatch("permission/loadData");case 6:e.$router.push("/"),t.next=10;break;case 9:alert(this.$store.state.user.ERRMESSAGE);case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getGuidGenerator:function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},fouce:function(){document.getElementById("rs-login").style.marginTop="-260px"}}},u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"login",selected:"true"}},[r("div",{staticClass:"rs-login",attrs:{id:"rs-login"}},[t._m(0),t._v(" "),r("form",{staticClass:"mui-input-group",attrs:{id:"login-form"}},[r("div",{staticClass:"mui-input-row"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form_email,expression:"form_email"}],staticClass:"mui-input-clear mui-input",attrs:{type:"text",id:"main.form_email",placeholder:"请输入账号"},domProps:{value:t.form_email},on:{input:function(e){e.target.composing||(t.form_email=e.target.value)}}})]),t._v(" "),r("div",{staticClass:"mui-input-row"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form_password,expression:"form_password"}],staticClass:"mui-input-clear mui-input",attrs:{id:"password",type:"password",placeholder:"请输入密码"},domProps:{value:t.form_password},on:{focus:function(e){t.fouce()},input:function(e){e.target.composing||(t.form_password=e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"rs-login-bottom"},[r("rs-button",{attrs:{size:"normal"},on:{click:t.doLogin}},[t._v("登录")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rs-login-logo"},[e("img",{attrs:{src:r("7Otq"),alt:""}})])}]};var m=r("C7Lr")(n,u,!1,function(t){r("MZRk")},null,null);e.default=m.exports}});
//# sourceMappingURL=2.9b387b69e769b4295a06.js.map