webpackJsonp([5],{"26/B":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("lC5x"),i=s.n(r),a=s("J0Oq"),n=s.n(a),o=(s("GmtC"),s("KZdK"),{data:function(){return{transitionName:"slide-right"}},activated:function(){var t=this;console.log(this.$route.path,"color:red"),setTimeout(n()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$store.commit("jiesuanribao/setParams",t.$route.query),t.$route.query.ACTION,"VIEW"==t.$route.query.ACTION&&(t.$store.commit("jiesuanribao/addDefault"),t.$store.dispatch("jiesuanribao/openReport",t.$route.query));case 3:case"end":return e.stop()}},e,t)})),600)}}),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{height:"100%"}},[e("transition",{attrs:{name:this.transitionName}},[e("keep-alive",[e("router-view")],1)],1)],1)},staticRenderFns:[]};var l=s("C7Lr")(o,c,!1,function(t){s("TDcj")},null,null);e.default=l.exports},"GU/7":function(t,e){},GmtC:function(t,e,s){"use strict";var r=s("lC5x"),i=s.n(r),a=s("J0Oq"),n=s.n(a),o=s("a3Yh"),c=s.n(o),l=s("4YfN"),_=s.n(l),d=s("aA9S"),E=s.n(d),I=s("IcnI"),u=s("9rMa"),T=s("+9g/"),L=s("vNGi");Object(L.f)(T.a);var v,A,f,D,p,N=function(t){return{modalName:"TBV_SNSTL_M",where:"[BILLID] ='"+t+"'",orderBy:"",pageSize:1,pageIndex:1}},h=function(t){return{modalName:"TBV_SNSTLDTS_M",where:"[BILLID] ='"+t+"'",orderBy:"ENTRYNUM",pageSize:1,pageIndex:1}},m=(v=n()(i.a.mark(function t(e){var s=e.BILLID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",T.a.open(N(s)));case 1:case"end":return t.stop()}},t,this)})),function(t){return v.apply(this,arguments)}),O=(A=n()(i.a.mark(function t(e){var s=e.BILLID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",T.a.open(h(s)));case 1:case"end":return t.stop()}},t,this)})),function(t){return A.apply(this,arguments)}),S=(f=n()(i.a.mark(function t(e){var s=e.SNODEID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",T.a.open({modalName:"TBV_CHAINSND_SEL",where:"[SNODEID] ='"+s+"'",orderBy:"",pageSize:1,pageIndex:1}));case 1:case"end":return t.stop()}},t,this)})),function(t){return f.apply(this,arguments)}),x=(D=n()(i.a.mark(function t(e){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",T.a.open(e));case 1:case"end":return t.stop()}},t,this)})),function(t){return D.apply(this,arguments)}),M={doLoadMAIN:m,doLoadDTS:O,doLoadSnode:S,doOpen:L.c,doSave:L.e,doDelete:L.b,doCheck:L.a,doReCheck:L.d,doQuery:x},F=s("78rJ"),C=s("JIbx");s.d(e,"c",function(){return g}),s.d(e,"b",function(){return k}),s.d(e,"a",function(){return R});var R=E()({},F.a,{STORE_NAME:"jiesuanribao",M_ADDDEFAULT:"addDefault",M_SETEMP:"setEmp",M_SETSNODE:"setSnode",M_SETTIME:"setTime"}),b=Object(u.a)(R.STORE_NAME),g=(b.mapState,b.mapGetters),y=new F.b({service:M,paths:{QRY:"TBS_PARAMETER_REF",QRYALL:"TBS_PARAMETER_REF",QRYADV:"TBS_PARAMETER_REF",MAIN:"TBV_SNSTL_M",DTS:"TBV_SNSTLDTS_M",STLFMITEM:"TBV_STLFMITEM",SNODE:"TBV_CHAINSND_SEL"},MAINPATH:"MAIN",SUBPATH:["DTS"]}),B=_()({params:{ACTION:"",STLTYPEID:"",BILLTYPEID:""}},y.mixState()),w=_()({},y.mixMutations(),(p={},c()(p,R.M_ADDDEFAULT,function(t){var e=y.getTable("QRYADV");e.add({}),e.setValue("BILLDATE",Object(C.c)(new Date))}),c()(p,R.M_SETSNODE,function(t,e){var s=e.path,r=e.item,i=y.getTable(s);i.setValue("SNODEID",r.SNODEID),i.setValue("SNODEID.SNODECODE",r.SNODECODE),i.setValue("SNODEID.SNODENAME",r.SNODENAME)}),p)),j=_()({},y.mixActions(),{loadDTS:function(){var t=n()(i.a.mark(function t(e,s){var r,a,n=e.commit,o=s.BILLID;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M.doLoadMAIN({BILLID:o});case 2:return r=t.sent,n(R.M_INITDATA,{path:"MAIN",data:(r.data||{}).items}),t.next=6,M.doLoadDTS({BILLID:o});case 6:a=t.sent,n(R.M_INITDATA,{path:"DTS",data:(a.data||{}).items});case 8:case"end":return t.stop()}},t,this)}));return function(e,s){return t.apply(this,arguments)}}(),loadIndexDTS:function(){var t=n()(i.a.mark(function t(e,s){var r,a,n,o,c=e.commit,l=s.idx;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=y.getTable("QRY"),a=r.getValue("BILLID",l),t.next=4,M.doLoadMAIN({BILLID:a});case 4:return n=t.sent,c(R.M_INITDATA,{path:"MAIN",data:(n.data||{}).items}),t.next=8,M.doLoadDTS({BILLID:a});case 8:o=t.sent,c(R.M_INITDATA,{path:"DTS",data:(o.data||{}).items});case 10:case"end":return t.stop()}},t,this)}));return function(e,s){return t.apply(this,arguments)}}(),openReport:function(){var t=n()(i.a.mark(function t(e){var s,r,a,n,o=e.commit;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=y.getTable("QRYADV"),(r={}).BILLID="",r.BILLDATE=s.getValue("BILLDATE"),r.SNODEID=s.getValue("SNODEID"),r.sqlId="51485",r.pageSize="10",r.keyFields="BILLID",t.next=11,M.doQuery(r);case 11:return a=t.sent,o(R.M_INITDATA,{path:"QRY",data:(a.data||{}).items}),r.sqlId="51486",t.next=16,M.doQuery(r);case 16:n=t.sent,o(R.M_INITDATA,{path:"QRYALL",data:(n.data||{}).items});case 18:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()});I.a.registerModule(R.STORE_NAME,{namespaced:!0,state:B,getters:{},mutations:w,actions:j});var k=function(t,e,s){return y.mapGetters(t,e,s)}},TDcj:function(t,e){},dUbA:function(t,e){},sotz:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("4YfN"),i=s.n(r),a=s("GmtC"),n=s("JIbx"),o={props:{TITLE:""},name:"jiesuan",data:function(){return{ISINPUTSHOW:!1}},computed:i()({},Object(a.c)([]),Object(a.b)("QRYADV",["BILLDATE","SNODEID","SNODEID.SNODECODE","SNODEID.SNODENAME"]),Object(a.b)("QRY",[]),Object(a.b)("QRYALL",["FACTAMTALL","ONLINEAMTALL","ONLINERATEALL","OFFLINEAMTALL","OFFLINERATEALL","DIFFAMTALL","DIFFRATEALL"]),{length:function(){return this.QRY.length}}),methods:{linkUrl:function(t){this.$router.push({path:"/jiesuanribao/main/"+t})},linkDetail:function(t,e,s){this.$router.push({path:"/jiesuanribao/main/detail",query:{BILLID:t,SNODEID:e,index:s,length:this.length}})},open:function(t){this.$refs[t].open()},doQuery:function(){this.$store.dispatch(a.a.STORE_NAME+"/openReport")},clearMD:function(){this.SNODEID="",this["SNODEID.SNODECODE"]="",this["SNODEID.SNODENAME"]=""}},watch:{BILLDATE:function(){this.$store.dispatch(a.a.STORE_NAME+"/openReport")},SNODEID:function(){this.$store.dispatch(a.a.STORE_NAME+"/openReport")}},activated:function(){console.log("%c"+this.$route.path,"color:red")},filters:{getWeek:function(t){return t?Object(n.e)(t):""},isWeek:function(t){if("周六"==Object(n.e)(t)||"周日"==Object(n.e)(t))return"c-icon-red"},toFixed:function(t,e){if("0"==t||""!=t)return parseFloat(t||0).toFixed(e)},color:function(t){var e=parseFloat(t);return e<0?"c-icon-red":0==e?"c-999":void 0},color1:function(t){return 0==parseFloat(t)?"c-999":""}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mui-layout mui-layout-top"},[s("rs-header",{attrs:{title:t.TITLE,color:"primary"}},[s("a",{staticClass:"mui-icon mui-icon-left-nav mui-pull-left",attrs:{slot:"left"},on:{click:function(e){t.$router.push("/main1")}},slot:"left"})]),t._v(" "),s("rs-list",{staticClass:"rr-line-24",attrs:{size:"15",noborder:""}},[s("rs-list-item",{attrs:{isright:""},nativeOn:{click:function(e){t.open("picker1")}}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("日 期")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.BILLDATE)+" "),s("span",{class:t._f("isWeek")(t.BILLDATE)},[t._v(t._s(t._f("getWeek")(t.BILLDATE)))])])])]),t._v(" "),s("rs-list-item",{attrs:{noborder:"",isright:""==t.SNODEID},nativeOn:{click:function(e){t.linkUrl("snodesel")}}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("经营门店")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(this["SNODEID.SNODECODE"])+" "+t._s(this["SNODEID.SNODENAME"]))])]),t._v(" "),""!=t.SNODEID?s("span",{staticClass:"rr-list-clear rr-font rr-quxiao",on:{click:function(e){return e.stopPropagation(),t.clearMD(e)}}}):t._e()])],1),t._v(" "),s("rs-datetime",{key:"jiesuanribao.1",ref:"picker1",attrs:{type:"date"},model:{value:t.BILLDATE,callback:function(e){t.BILLDATE=e},expression:"BILLDATE"}}),t._v(" "),s("div",{staticClass:"mui-content bk-fff"},[s("div",{staticClass:"mui-content-padded"},[s("table",{staticClass:"rr-table"},[t._m(0),t._v(" "),s("tbody",{staticClass:"rr-table-body"},[t._l(t.QRY,function(e,r){return s("tr",{key:r,on:{click:function(s){t.linkDetail(e.BILLID,e.SNODEID,r)}}},[s("td",[t._v("\n              "+t._s(e.SNODECODE)+"\n              "),s("br"),t._v("\n              "+t._s(e.SNODENAME)+"\n            ")]),t._v(" "),s("td",{staticClass:"rr-text-right",class:t._f("color")(e.FACTAMT)},[t._v("\n            "+t._s(t._f("toFixed")(e.FACTAMT,2))+"\n            ")]),t._v(" "),s("td",{staticClass:"rr-text-right",class:t._f("color")(e.ONLINEAMT)},[t._v("\n              "+t._s(t._f("toFixed")(e.ONLINEAMT,2))+"\n              "),e.ONLINERATE?s("div",{class:t._f("color1")(e.ONLINERATE)},[t._v(t._s(t._f("toFixed")(e.ONLINERATE,1))+"%")]):t._e()]),t._v(" "),s("td",{staticClass:"rr-text-right",class:t._f("color")(e.OFFLINEAMT)},[t._v("\n            "+t._s(t._f("toFixed")(e.OFFLINEAMT,2))+"\n              "),e.OFFLINERATE?s("div",{class:t._f("color1")(e.OFFLINERATE)},[t._v(t._s(t._f("toFixed")(e.OFFLINERATE,1))+"%")]):t._e()]),t._v(" "),s("td",{staticClass:"rr-text-right",class:0==parseFloat(t.DIFFRATEALL)?"c-999":"c-icon-red"},[t._v(t._s(t._f("toFixed")(e.DIFFAMT,2))+"\n              "),e.DIFFRATE?s("div",{class:t._f("color1")(e.DIFFRATE)},[t._v(t._s(t._f("toFixed")(e.DIFFRATE,1))+"‰")]):t._e()])])}),t._v(" "),s("tr",{staticClass:"rr-table-heji"},[s("td",{staticClass:"rr-text-right rr-weight"},[t._v("合计:")]),t._v(" "),s("td",{staticClass:"rr-text-right",class:t._f("color")(t.FACTAMTALL,t.FACTAMTALL)},[t._v("\n            "+t._s(t._f("toFixed")(t.FACTAMTALL,2))+"\n            ")]),t._v(" "),s("td",{staticClass:"rr-text-right",class:t._f("color")(t.ONLINERATEALL)},[t._v(t._s(t._f("toFixed")(t.ONLINEAMTALL,2))+"\n              "),t.ONLINERATEALL?s("div",{class:t._f("color1")(t.ONLINERATEALL)},[t._v(t._s(t._f("toFixed")(t.ONLINERATEALL,1))+"%")]):t._e()]),t._v(" "),s("td",{staticClass:"rr-text-right",class:t._f("color")(t.OFFLINERATEALL)},[t._v(t._s(t._f("toFixed")(t.OFFLINEAMTALL,2))+"\n              "),t.OFFLINERATEALL?s("div",{class:t._f("color1")(t.OFFLINERATEALL)},[t._v(t._s(t._f("toFixed")(t.OFFLINERATEALL,1))+"%")]):t._e()]),t._v(" "),s("td",{staticClass:"rr-text-right",class:0==parseFloat(t.DIFFRATEALL)?"c-999":"c-icon-red"},[t._v(t._s(t._f("toFixed")(t.DIFFAMTALL,2))+"\n              "),t.DIFFRATEALL?s("div",{class:t._f("color1")(t.DIFFRATEALL)},[t._v(t._s(t._f("toFixed")(t.DIFFRATEALL,1))+"‰")]):t._e()])])],2)])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticClass:"rr-table-header"},[s("tr",[s("td",[t._v("经营门店")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("实际收入")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("线下\n              "),s("br"),t._v("占比%\n            ")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("线上\n              "),s("br"),t._v("占比%\n            ")]),t._v(" "),s("td",{staticClass:"rr-table-w4em"},[t._v("差异\n              "),s("br"),t._v("差异‰\n            ")])])])}]};var l=s("C7Lr")(o,c,!1,function(t){s("z2mD")},"data-v-a04b709c",null);e.default=l.exports},y7jn:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("4YfN"),i=s.n(r),a=s("GmtC"),n=s("JIbx"),o={props:{item:Object},computed:i()({},Object(a.b)("DTS",["ITEMID","STLITEMID_GRPID","AMT","STLITEMID_PARANAME","ITEMID_PARANAME","ISSHOW","DEALTYPE","STLITEMID_ISLBSHOW","STLITEMID_ISLBB","STLITEMID_LBCOLOR","STLITEMID_LBUNDERLINE","STLITEMID_PNCOLOR","STLITEMID_ZEROCOLOR","STLITEMID_NNCOLOR","STLITEMID_ISPN","STLITEMID_ISZERO","STLITEMID_ISNULLF","STLITEMID_ISNN"],"item")),watch:{AMT:function(){this.$store.commit("jiesuan/checkRange",{item:this.item}),this.$store.commit("jiesuan/setAMT")}},filters:{toFixed:function(t,e){if("0"==t||""!=t)return parseFloat(t||0).toFixed(e)}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return 1==t.ISSHOW&&1==t.STLITEMID_ISLBSHOW&&"实际收入"!=t.ITEMID_PARANAME&&"线上"!=t.ITEMID_PARANAME&&"线下"!=t.ITEMID_PARANAME&&"差异"!=t.ITEMID_PARANAME?s("rs-list-item",{class:{"rr-border":"LongBlack"==t.STLITEMID_LBUNDERLINE},attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row",staticStyle:{"min-height":"24px"}},[1==t.STLITEMID_ISLBSHOW?s("div",{staticClass:"rr-width-5em",class:{"rr-weight":1==t.STLITEMID_ISLBB},style:{color:t.STLITEMID_LBCOLOR}},[t._v("\n      "+t._s(t.ITEMID_PARANAME)+"\n    ")]):t._e(),t._v(" "),s("div",{staticClass:"rs-flex-item rr-text-right",class:{"rr-line-b1":"ShortGrey"==t.STLITEMID_LBUNDERLINE},style:{color:parseFloat(t.AMT)>0?t.STLITEMID_PNCOLOR:parseFloat(t.AMT)<0?t.STLITEMID_NNCOLOR:t.STLITEMID_ZEROCOLOR}},["Count"==t.DEALTYPE?s("div",[t._v(t._s(t._f("toFixed")(t.AMT,2)))]):t._e(),t._v(" "),"Write"==t.DEALTYPE?s("rs-numInput",{staticClass:"rs-flex-item",attrs:{height:"24",size:"14",text:t._f("toFixed")(t.AMT,2)},model:{value:t.AMT,callback:function(e){t.AMT=e},expression:"AMT"}}):t._e()],1)])]):t._e()},staticRenderFns:[]};var l={props:{TITLE:""},name:"jiesuanribao",data:function(){return{ISINPUTSHOW:!1,length:parseInt(this.$route.query.length),index:parseInt(this.$route.query.index)}},components:{main_dts:s("C7Lr")(o,c,!1,function(t){s("dUbA")},"data-v-4bf6211c",null).exports},computed:i()({},Object(a.c)(["ISSHOWSAVE","ISSHOWDELETE","ISTIME"]),Object(a.b)("MAIN",["BILLTYPEID","BILLDATE","BILLCODE","SNODEID.SNODECODE","SNODEID.SNODENAME","MANAGER","DIFFREMARK","MAKER","VERIFIER","MAKEDATE","VERIFYDATE","TALLIER","TALLYDATE","FHOUR","FMINUTE","DEADLINE","FACTAMT","ONLINEAMT","ONLINERATE","OFFLINEAMT","OFFLINERATE","DIFFAMT","DIFFRATE","DIFFREMARK"]),Object(a.b)("DTS",[]),{firstIndex:function(){return 0!=this.index?this.index:-1},preIndex:function(){return this.index-1>=0?this.index-1:-1},nextIndex:function(){return this.index+1<=this.length-1?this.index+1:-1},endIndex:function(){return this.index!=this.length-1?this.index:-1}}),methods:{more_first:function(){-1!=this.firstIndex&&(this.index=0,this.doquery())},more_pre:function(){-1!=this.preIndex&&(this.index=this.index-1,this.doquery())},more_next:function(){-1!=this.nextIndex&&(this.index=this.index+1,this.doquery())},more_end:function(){-1!=this.endIndex&&(this.index=this.length-1,this.doquery())},doquery:function(t){this.$store.dispatch(a.a.STORE_NAME+"/loadIndexDTS",{idx:this.index})}},watch:{DEADLINE:function(){this.$store.commit(a.a.STORE_NAME+"/"+a.a.M_SETDEADLINE)}},activated:function(){this.$store.dispatch(a.a.STORE_NAME+"/loadDTS",{BILLID:this.$route.query.BILLID}),console.log("%c"+this.$route.path,"color:red")},filters:{getWeek:function(t){return t?t+" "+Object(n.e)(t):""},isWeek:function(t){if("周六"==Object(n.e)(t)||"周日"==Object(n.e)(t))return"c-icon-red"},toFixed:function(t,e){if("0"==t||""!=t)return parseFloat(t||0).toFixed(e)}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mui-layout mui-layout-top"},[s("rs-header",{attrs:{title:t.TITLE,color:"primary"}},[s("a",{staticClass:"mui-icon mui-icon-left-nav mui-pull-left",attrs:{slot:"left"},on:{click:function(e){t.$router.push("/jiesuanribao")}},slot:"left"})]),t._v(" "),s("div",{staticClass:"rs-nex-prev"},[s("span",{staticClass:"rr-left rr-font rr-prevA",class:-1!=t.firstIndex?"c-active":"c-999",on:{click:t.more_first}}),t._v(" "),s("span",{staticClass:"rr-left rr-font rr-prev",class:-1!=t.preIndex?"c-active":"c-999",on:{click:t.more_pre}}),t._v(" "),s("span",{staticClass:"rr-right rr-font rr-nextA",class:-1!=t.endIndex?"c-active":"c-999",on:{click:t.more_end}}),t._v(" "),s("span",{staticClass:"rr-right rr-font rr-next",class:-1!=t.nextIndex?"c-active":"c-999",on:{click:t.more_next}})]),t._v(" "),s("div",{staticClass:"mui-content"},[s("rs-list",{staticClass:"rr-line-24",attrs:{size:"15",noborder:""}},[s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("经 营 门 店")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(this["SNODEID.SNODECODE"])+" "+t._s(this["SNODEID.SNODENAME"]))])])]),t._v(" "),""!=t.BILLDATE?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("日 期")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.BILLDATE)+" "),s("span",{class:t._f("isWeek")(t.BILLDATE)},[t._v(t._s(t._f("getWeek")(t.BILLDATE)))])])])]):t._e(),t._v(" "),""!=t.MANAGER?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("店 长")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.MANAGER))])])]):t._e(),t._v(" "),""!=t.FACTAMT?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("实 际 收 入")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-text-center"},[s("span",{staticClass:"rr-right rr-opacity0 rr-width-5em"},[t._v(t._s(t.ONLINERATE)+"%")]),t._v("\n            "+t._s(t._f("toFixed")(t.FACTAMT,2))+"\n            ")])])]):t._e(),t._v(" "),""!=t.ONLINEAMT||""!=t.ONLINERATE?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("线 下")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-text-center"},[s("span",{staticClass:"rr-right rr-width-5em rr-text-right"},[t._v(t._s(t._f("toFixed")(t.ONLINERATE,1))+"%")]),t._v("\n            "+t._s(t._f("toFixed")(t.ONLINEAMT,2))+"\n          ")])])]):t._e(),t._v(" "),""!=t.OFFLINEAMT||""!=t.OFFLINERATE?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("线 上")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-text-center"},[s("span",{staticClass:"rr-right rr-width-5em rr-text-right"},[t._v(t._s(t._f("toFixed")(t.OFFLINERATE,1))+"%")]),t._v("\n            "+t._s(t._f("toFixed")(t.OFFLINEAMT,2))+"\n          ")])])]):t._e(),t._v(" "),""!=t.DIFFAMT||""!=t.DIFFRATE?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("差 异")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item rr-text-center"},[s("span",{staticClass:"rr-right rr-width-5em rr-text-right"},[t._v(t._s(t.DIFFRATE)+"‰")]),t._v("\n            "+t._s(t.DIFFAMT)+"\n          ")])])]):t._e(),t._v(" "),t.DIFFREMARK?s("rs-list-item",{attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("差 异 说 明")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.DIFFREMARK))])])]):t._e()],1),t._v(" "),s("div",{staticStyle:{height:"7px",background:"#eee"}}),t._v(" "),s("rs-list",{attrs:{size:"14",noborder:""}},t._l(t.DTS,function(t){return s("main_dts",{key:t.ENTRYID,attrs:{item:t}})})),t._v(" "),s("div",{staticStyle:{height:"7px",background:"#eee"}}),t._v(" "),s("rs-list",{staticClass:"rr-line-24",attrs:{size:"14",noborder:""}},[""!=t.BILLCODE?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("单 据 号")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.BILLCODE))])])]):t._e(),t._v(" "),""!=t.MAKER?s("rs-list-item",[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("填 报")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.MAKER)+" "+t._s(t.MAKEDATE))])])]):t._e(),t._v(" "),""!=t.VERIFIER?s("rs-list-item",{attrs:{noborder:""}},[s("div",{staticClass:"rs-flex-row"},[s("span",{staticClass:"rr-justify rr-width-4em"},[t._v("审 核")]),t._v(" "),s("span",[t._v("：")]),t._v(" "),s("div",{staticClass:"rs-flex-item"},[t._v(t._s(t.VERIFIER)+" "+t._s(t.VERIFYDATE))])])]):t._e()],1)],1)],1)},staticRenderFns:[]};var d=s("C7Lr")(l,_,!1,function(t){s("GU/7")},"data-v-354f764b",null);e.default=d.exports},z2mD:function(t,e){}});
//# sourceMappingURL=5.12f8f5422580ce413f83.js.map