webpackJsonp([6],{"/3os":function(t,e,s){"use strict";var r=s("lC5x"),i=s.n(r),n=s("J0Oq"),a=s.n(n),o=s("a3Yh"),c=s.n(o),l=s("4YfN"),u=s.n(l),d=s("aA9S"),I=s.n(d),E=s("IcnI"),_=s("9rMa"),D=s("+9g/"),T=s("vNGi");Object(T.f)(D.a);var v,f,h,p,L,S=function(t){return{modalName:"TBV_SNSTL_M",where:"[BILLID] ='"+t+"'",orderBy:"",pageSize:1,pageIndex:1}},A=function(t){return{modalName:"TBV_SNSTLDTS_M",where:"[BILLID] ='"+t+"'",orderBy:"ENTRYNUM",pageSize:1,pageIndex:1}},m=(v=a()(i.a.mark(function t(e){var s=e.BILLID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",D.a.open(S(s)));case 1:case"end":return t.stop()}},t,this)})),function(t){return v.apply(this,arguments)}),N=(f=a()(i.a.mark(function t(e){var s=e.BILLID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",D.a.open(A(s)));case 1:case"end":return t.stop()}},t,this)})),function(t){return f.apply(this,arguments)}),M=(h=a()(i.a.mark(function t(e){var s=e.SNODEID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",D.a.open({modalName:"TBV_CHAINSND_SEL",where:"[SNODEID] ='"+s+"'",orderBy:"",pageSize:1,pageIndex:1}));case 1:case"end":return t.stop()}},t,this)})),function(t){return h.apply(this,arguments)}),O=(p=a()(i.a.mark(function t(e){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",D.a.open(e));case 1:case"end":return t.stop()}},t,this)})),function(t){return p.apply(this,arguments)}),x={doLoadMAIN:m,doLoadDTS:N,doLoadSnode:M,doOpen:T.c,doSave:T.e,doDelete:T.b,doCheck:T.a,doReCheck:T.d,doQuery:O},C=s("78rJ"),R=s("JIbx");s.d(e,"c",function(){return y}),s.d(e,"b",function(){return j}),s.d(e,"a",function(){return b});var b=I()({},C.a,{STORE_NAME:"jiesuandongtai",M_ADDDEFAULT:"addDefault",M_SETEMP:"setEmp",M_SETSNODE:"setSnode",M_SETTIME:"setTime"}),g=Object(_.a)(b.STORE_NAME),y=(g.mapState,g.mapGetters),B=new C.b({service:x,paths:{QRY:"TBS_PARAMETER_REF",QRYALL:"TBS_PARAMETER_REF",QRYADV:"TBS_PARAMETER_REF",MAIN:"TBV_SNSTL_M",DTS:"TBV_SNSTLDTS_M",STLFMITEM:"TBV_STLFMITEM",SNODE:"TBV_CHAINSND_SEL"},MAINPATH:"MAIN",SUBPATH:["DTS"]}),w=u()({params:{ACTION:"",STLTYPEID:"",BILLTYPEID:""}},B.mixState()),F=u()({},B.mixMutations(),(L={},c()(L,b.M_ADDDEFAULT,function(t){var e=B.getTable("QRYADV");e.add({}),e.setValue("BILLDATE",Object(R.c)(new Date))}),c()(L,b.M_SETSNODE,function(t,e){var s=e.path,r=e.item,i=B.getTable(s);i.setValue("SNODEID",r.SNODEID),i.setValue("SNODEID.SNODECODE",r.SNODECODE),i.setValue("SNODEID.SNODENAME",r.SNODENAME)}),L)),k=u()({},B.mixActions(),{loadDTS:function(){var t=a()(i.a.mark(function t(e,s){var r,n,a=e.commit,o=s.BILLID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.doLoadMAIN({BILLID:o});case 2:return r=t.sent,a(b.M_INITDATA,{path:"MAIN",data:(r.data||{}).items}),t.next=6,x.doLoadDTS({BILLID:o});case 6:n=t.sent,a(b.M_INITDATA,{path:"DTS",data:(n.data||{}).items});case 8:case"end":return t.stop()}},t,this)}));return function(e,s){return t.apply(this,arguments)}}(),openReport:function(){var t=a()(i.a.mark(function t(e){var s,r,n,a=e.commit;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=B.getTable("QRYADV"),(r={}).BILLID="",r.BILLDATE=s.getValue("BILLDATE"),r.SNODEID=s.getValue("SNODEID"),r.sqlId="51487",r.pageSize="10",r.keyFields="BILLID",t.next=11,x.doQuery(r);case 11:n=t.sent,a(b.M_INITDATA,{path:"QRY",data:(n.data||{}).items});case 13:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()});E.a.registerModule(b.STORE_NAME,{namespaced:!0,state:w,getters:{},mutations:F,actions:k});var j=function(t,e,s){return B.mapGetters(t,e,s)}},"67tS":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("4YfN"),i=s.n(r),n=s("/3os"),a=s("JIbx"),o={props:{item:Object},computed:i()({},Object(n.b)("DTS",["ITEMID","STLITEMID_GRPID","AMT","STLITEMID_PARANAME","ITEMID_PARANAME","ISSHOW","DEALTYPE","STLITEMID_ISLBSHOW","STLITEMID_ISLBB","STLITEMID_LBCOLOR","STLITEMID_LBUNDERLINE","STLITEMID_PNCOLOR","STLITEMID_ZEROCOLOR","STLITEMID_NNCOLOR","STLITEMID_ISPN","STLITEMID_ISZERO","STLITEMID_ISNULLF","STLITEMID_ISNN"],"item")),watch:{AMT:function(){this.$store.commit("jiesuan/checkRange",{item:this.item}),this.$store.commit("jiesuan/setAMT")}},filters:{toFixed:function(t,e){if("0"==t||""!=t)return parseFloat(t||0).toFixed(e)}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return 1==t.ISSHOW&&1==t.STLITEMID_ISLBSHOW&&"实际收入"!=t.ITEMID_PARANAME&&"线上"!=t.ITEMID_PARANAME&&"线下"!=t.ITEMID_PARANAME&&"差异"!=t.ITEMID_PARANAME?s("rs-list-item",{class:{"rr-border":"LongBlack"==t.STLITEMID_LBUNDERLINE},attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row"},[1==t.STLITEMID_ISLBSHOW?s("div",{staticClass:"rr-width-5em",class:{"rr-weight":1==t.STLITEMID_ISLBB},style:{color:t.STLITEMID_LBCOLOR}},[t._v("\r\n        "+t._s(t.ITEMID_PARANAME)+"\r\n      ")]):t._e(),t._v(" "),s("div",{staticClass:"rs-flex-item rr-text-right",class:{"rr-line-b":"ShortGrey"==t.STLITEMID_LBUNDERLINE},style:{color:parseFloat(t.AMT)>0?t.STLITEMID_PNCOLOR:parseFloat(t.AMT)<0?t.STLITEMID_NNCOLOR:t.STLITEMID_ZEROCOLOR}},["Count"==t.DEALTYPE?s("div",[t._v(t._s(t._f("toFixed")(t.AMT,2)))]):t._e(),t._v(" "),"Write"==t.DEALTYPE?s("rs-numInput",{staticClass:"rs-flex-item",attrs:{height:"24",size:"14",text:t._f("toFixed")(t.AMT,2)},model:{value:t.AMT,callback:function(e){t.AMT=e},expression:"AMT"}}):t._e()],1)])]):t._e()},staticRenderFns:[]};var l={props:{TITLE:""},name:"jiesuandongtai",data:function(){return{ISINPUTSHOW:!1,length:parseInt(this.$route.query.length),index:parseInt(this.$route.query.index)}},components:{main_dts:s("C7Lr")(o,c,!1,function(t){s("f/nL")},"data-v-3866891a",null).exports},computed:i()({},Object(n.c)(["ISSHOWSAVE","ISSHOWDELETE","ISTIME"]),Object(n.b)("MAIN",["BILLTYPEID","BILLDATE","BILLCODE","SNODEID.SNODECODE","SNODEID.SNODENAME","MANAGER","DIFFREMARK","MAKER","VERIFIER","MAKEDATE","VERIFYDATE","TALLIER","TALLYDATE","FHOUR","FMINUTE","DEADLINE","FACTAMT","ONLINEAMT","ONLINERATE","OFFLINEAMT","OFFLINERATE","DIFFAMT","DIFFRATE","DIFFREMARK"]),Object(n.b)("DTS",[]),{firstIndex:function(){return 0!=this.index?this.index:-1},preIndex:function(){return this.index-1>=0?this.index-1:-1},nextIndex:function(){return this.index+1<=this.length-1?this.index+1:-1},endIndex:function(){return this.index!=this.length-1?this.index:-1}}),methods:{more_first:function(){-1!=this.firstIndex&&(this.index=0,this.doquery())},more_pre:function(){-1!=this.preIndex&&(this.index=this.index-1,this.doquery())},more_next:function(){-1!=this.nextIndex&&(this.index=this.index+1,this.doquery())},more_end:function(){-1!=this.endIndex&&(this.index=this.length-1,this.doquery())},doquery:function(t){this.$router.push({path:"/jiesuandongtai/main/detail",query:{index:this.index}})}},watch:{DEADLINE:function(){this.$store.commit(n.a.STORE_NAME+"/"+n.a.M_SETDEADLINE)}},activated:function(){this.$store.dispatch(n.a.STORE_NAME+"/loadDTS",{BILLID:this.$route.query.BILLID}),console.log("%c"+this.$route.path,"color:red")},filters:{getWeek:function(t){return t?t+" "+Object(a.e)(t):""}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mui-layout mui-layout-top"},[s("rs-header",{attrs:{title:t.TITLE,color:"primary"}},[s("a",{staticClass:"mui-icon mui-icon-left-nav mui-pull-left",attrs:{slot:"left"},on:{click:function(e){t.$router.goBack()}},slot:"left"})]),t._v(" "),s("div",{staticClass:"rs-nex-prev"},[s("span",{staticClass:"rr-left rr-font rr-prevA",class:-1!=t.firstIndex?"c-active":"c-999",on:{click:t.more_first}}),t._v(" "),s("span",{staticClass:"rr-left rr-font rr-prev",class:-1!=t.preIndex?"c-active":"c-999",on:{click:t.more_pre}}),t._v(" "),s("span",{staticClass:"rr-right rr-font rr-nextA",class:-1!=t.endIndex?"c-active":"c-999",on:{click:t.more_end}}),t._v(" "),s("span",{staticClass:"rr-right rr-font rr-next",class:-1!=t.nextIndex?"c-active":"c-999",on:{click:t.more_next}})]),t._v(" "),s("div",{staticClass:"mui-content"},[s("rs-list",{staticClass:"rr-line-24",attrs:{size:"15",noborder:""}},[s("rs-list-item",{attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("经 营 门 店")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-line-b"},[t._v(t._s(this["SNODEID.SNODECODE"])+" "+t._s(this["SNODEID.SNODENAME"]))])])]),t._v(" "),s("rs-list-item",{attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("店 长")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-line-b"},[t._v(t._s(t.MANAGER))])])]),t._v(" "),s("rs-list-item",{attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("日 期")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-line-b"},[t._v(t._s(t._f("getWeek")(t.BILLDATE)))])])])],1),t._v(" "),s("div",{staticStyle:{height:"7px",background:"#eee"}}),t._v(" "),s("rs-list",{attrs:{size:"14",noborder:""}},t._l(t.DTS,function(t){return s("main_dts",{key:t.ENTRYID,attrs:{item:t}})})),t._v(" "),s("div",{staticStyle:{height:"7px",background:"#eee"}}),t._v(" "),s("div",{staticClass:"rr-bill-top"},[""!=t.BILLCODE?s("div",{staticClass:"rs-flex-row",staticStyle:{height:"33px"}},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("单 据 号")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.BILLCODE))])]):t._e(),t._v(" "),""!=t.MAKER?s("div",{staticClass:"rs-flex-row",staticStyle:{height:"33px"}},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("填 报")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.MAKER)+" "+t._s(t.MAKEDATE))])]):t._e(),t._v(" "),""!=t.VERIFIER?s("div",{staticClass:"rs-flex-row",staticStyle:{height:"33px"}},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("审 核")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.VERIFIER)+" "+t._s(t.VERIFYDATE))])]):t._e()])],1)],1)},staticRenderFns:[]};var d=s("C7Lr")(l,u,!1,function(t){s("a/i5")},"data-v-0d2c44e0",null);e.default=d.exports},QqvW:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("lC5x"),i=s.n(r),n=s("J0Oq"),a=s.n(n),o=(s("/3os"),s("KZdK"),{data:function(){return{transitionName:"slide-right"}},activated:function(){var t=this;console.log(this.$route.path,"color:red"),setTimeout(a()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$store.commit("jiesuandongtai/setParams",t.$route.query),t.$route.query.ACTION,"VIEW"==t.$route.query.ACTION&&(t.$store.commit("jiesuandongtai/addDefault"),t.$store.dispatch("jiesuandongtai/openReport",t.$route.query));case 3:case"end":return e.stop()}},e,t)})),600)}}),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{height:"100%"}},[e("transition",{attrs:{name:this.transitionName},on:{enter:this.enter}},[e("keep-alive",[e("router-view")],1)],1)],1)},staticRenderFns:[]};var l=s("C7Lr")(o,c,!1,function(t){s("i/5+")},null,null);e.default=l.exports},"a/i5":function(t,e){},dskA:function(t,e){},"f/nL":function(t,e){},"i/5+":function(t,e){},mwFl:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("4YfN"),i=s.n(r),n=s("/3os"),a=s("JIbx"),o={props:{TITLE:""},name:"jiesuandongtai",data:function(){return{ISINPUTSHOW:!1}},computed:i()({},Object(n.c)([]),Object(n.b)("QRYADV",["BILLDATE","SNODEID","SNODEID.SNODECODE","SNODEID.SNODENAME"]),Object(n.b)("QRY",[]),{length:function(){}}),methods:{linkUrl:function(t){this.$router.push({path:"/jiesuandongtai/main/"+t})},linkDetail:function(t,e,s){this.$router.push({path:"/jiesuandongtai/main/detail",query:{BILLID:t,SNODEID:e,index:s,length:this.length}})},open:function(t){this.$refs[t].open()},handleChangeD:function(){this.$callAction({action:n.a.STORE_NAME+"/loadSTLFMITE"})}},watch:{DEADLINE:function(){this.$store.commit(n.a.STORE_NAME+"/"+n.a.M_SETDEADLINE)}},activated:function(){console.log("%c"+this.$route.path,"color:red"),this.$store.dispatch(n.a.STORE_NAME+"/setForm")},filters:{getWeek:function(t){return t?t+" "+Object(a.e)(t):""}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mui-layout mui-layout-top"},[s("rs-header",{attrs:{title:t.TITLE,color:"primary"}},[s("a",{staticClass:"mui-icon mui-icon-left-nav mui-pull-left",attrs:{slot:"left"},on:{click:function(e){t.$router.goBack()}},slot:"left"})]),t._v(" "),s("div",{staticClass:"mui-content bk-fff"},[s("rs-list",{staticClass:"rr-line-24",attrs:{size:"15",noborder:""}},[s("rs-list-item",{attrs:{noborder:"",isright:""},nativeOn:{click:function(e){t.open("picker1")}}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("日 期")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-line-b"},[t._v(t._s(t._f("getWeek")(t.BILLDATE)))])])]),t._v(" "),s("rs-list-item",{attrs:{noborder:"",isright:""},nativeOn:{click:function(e){t.linkUrl("snodesel")}}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("经营门店")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(this["SNODEID.SNODECODE"])+" "+t._s(this["SNODEID.SNODENAME"]))])])])],1),t._v(" "),s("rs-datetime",{key:"jiesuandongtai.1",ref:"picker1",attrs:{type:"date"},model:{value:t.BILLDATE,callback:function(e){t.BILLDATE=e},expression:"BILLDATE"}}),t._v(" "),s("div",{staticClass:"mui-content-padded"},[s("table",{staticClass:"rr-table"},[t._m(0),t._v(" "),s("tbody",{staticClass:"rr-table-body"},t._l(t.QRY,function(e,r){return s("tr",{key:r,on:{click:function(s){t.linkDetail(e.BILLID,e.SNODEID,r)}}},[s("td",[t._v("\n              "+t._s(e.SNODECODE)+"\n              "),s("br"),t._v("\n              "+t._s(e.SNODENAME)+"\n            ")]),t._v(" "),s("td",{staticClass:"rr-text-right"},[t._v(t._s(e.DEADLINE))]),t._v(" "),s("td",{staticClass:"rr-text-right"},[t._v(t._s(e.FACTAMT-e.DIFFAMT))]),t._v(" "),s("td",{staticClass:"rr-text-right"},[t._v(t._s(e.TSCNT)+"\n            ")]),t._v(" "),s("td",{staticClass:"rr-text-right"},[t._v(t._s(e.ELMCNT)+"\n            ")]),t._v(" "),s("td",{staticClass:"rr-text-right"},[t._v(t._s(e.MTCNT)+"\n            ")])])}))])])],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticClass:"rr-table-header"},[s("tr",[s("td",[t._v("经营门店")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("截止时间")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("计算收入")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("堂食\n            ")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("饿了么\n            ")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("美团\n            ")])])])}]};var l=s("C7Lr")(o,c,!1,function(t){s("dskA")},"data-v-1fd21da2",null);e.default=l.exports}});
//# sourceMappingURL=6.1153db25da1fa4ecd8a5.js.map