<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
      <div slot="right">
        <rs-button v-if="$store.getters.pcode['salemanage.add']" link @click="linkBVSale('ADD')">+订货</rs-button>
      </div>
    </rs-header>  
    <rs-list class="rr-line-24 mb10" size="15" noborder>
      <rs-list-item isright @click.native="open('picker2')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">开 始 日 期</span>
          <span>：</span>
          <div class="rs-flex-item">
              {{SDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item isright @click.native="open('picker3')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">结 束 日 期</span>
          <span>：</span>
          <div class="rs-flex-item">
              {{EDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder>
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">网 点 编 号</span>
          <span>：</span>
          <div class="rs-flex-item">
            <input type="text" class="rr-input-w100" v-model="SNODECODE" placeholder="点击输入"/>
          </div>
          <rs-button size="small" class="rr-list-search" @click="doQuery">查询</rs-button>
        </div>
        <span v-if="SNODECODE!=''" class="rr-list-clear rr-font rr-quxiao" @click.stop="SNODECODE=''"></span>
      </rs-list-item>
    </rs-list> 
    <rs-datetime
      key="bvsale.2"
      ref="picker2"
      type="date"
      v-model.lazy="SDATE"
      >
    </rs-datetime> 
    <rs-datetime
      key="bvsale.3"
      ref="picker3"
      type="date"
      v-model.lazy="EDATE"
      >
    </rs-datetime> 
    <div class="mui-content">
      <div v-if="list.length<=0" class="rs-list-nodata">
        <span>无对应数据！</span>
      </div>
      <rs-loadmore :bottom-method="doQueryNext"  :top-status.sync="topStatus" :bottom-all-loaded="allLoaded" :top-method="doQuery" :auto-fill=false  ref="loadmore">
        <rs-list class="rr-line-24 rr-list-rili" size="14" noborder>
          <rs-list-item v-for="item in list" :key="item.BILLID" @click.native="linkBVSale('VIEW',item)">
            <div class="rs-flex-row">
              <div class="rr-media-rili">
                <h3>{{item.BILLDATE|datePart("d")}}</h3>
                <div>{{item.BILLDATE|datePart("m")}}月</div>
              </div>
              <div class="rs-flex-item f14 rr-position-re">
                <span class="rr-right">{{item.MSTYPENAME}}</span>
                <div >{{item.SNODECODE+"("+item.SNODENAME+")"}}</div>
                单号:{{item.BILLCODE}}
                <div class="f12 rr-list-rili-b">
                  金额:<span>{{item.AMT|toFixed(2)}}</span>(元)
                </div>
              </div> 
            </div> 
          </rs-list-item>
        </rs-list>  
        <div v-if="allLoaded" class="rs-list-nodata">
          <span>没有数据啦</span>
        </div>
      </rs-loadmore>
    </div>
    <div v-if="list.length>0" class="f14 bk-fff rs-padding-5">金额合计：{{AMT|toFixed(2)}}(元)</div>
  </div>
</template>
<script>
import db from "@/api/db";
import { dateToString,getWeek,datePart,dateAdd} from "rs-vcore/utils/Date";
export default {
  name: "list",
  props: {
    TITLE: { type: String,default:'订货管理' }
  },
  data() {
    return {
      list: [],
      topStatus: "",
      allLoaded: false,
      openParam: {},
      SDATE:dateToString(dateAdd(new Date(),"d",1)),
      EDATE:dateToString(dateAdd(new Date(),"d",1)),
      SNODECODE:this.$store.getters.userInfo.SNODECODE,
      AMT:0.0
    };
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    changeDate(value1,value2){
      let SDATE1 = parseInt(value1.replace(/\-/g, ""))
      let EDATE1 = parseInt(value2.replace(/\-/g, ""))
      if(SDATE1>EDATE1){
        this.EDATE = this.SDATE
      }else if(EDATE1>SDATE1+31){
        this.EDATE = dateToString(dateAdd(new Date(value1),"d",31))
      }
    },
    linkBVSale: function(ACTION,item) {
      let DID;
      if(item){
        DID = item["BILLID"];
      }
      this.$router.push({path:"/bvsale",query:{ACTION,DID}})
    },
    setOpenParam: function() {
      this.openParam = {
        modalName: "VSL_SALE_QRY_4MOBILE",
        where: ` SNODECODE = NVL('${this.SNODECODE}',SNODECODE) AND AID=@AID AND BILLTYPEID = '232'  AND BUSTYPEID=100993 AND  MSTYPEID=10354  AND BILLDATE >= TO_DATE('${this.SDATE}','YYYY-MM-DD') AND BILLDATE <= TO_DATE('${this.EDATE}','YYYY-MM-DD') AND [SNODEID] IN(SELECT COLUMN_VALUE FROM TABLE(tss_getpowwhere('SNODE','@UID','@AID')) UNION ALL SELECT ${this.$store.state.user.userInfo.SNODEID||0} FROM DUAL)`,
        orderBy: "BILLDATE,BILLCODE",
        pageSize: 25,
        pageIndex: 1
      };
    },
    doQuery: async function(){
      this.topStatus = "loading";
      this.allLoaded = false;
      this.setOpenParam();
      await this.$callAsync({method:db.open,params:[this.openParam]}).then((data)=>{
        this.list = data.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });
      await this.$callAsync({method:db.open,params:[{sqlId:"51515",SNODECODE:this.SNODECODE,SNODEID:this.$store.state.user.userInfo.SNODEID||0,SDATE:this.SDATE,EDATE:this.EDATE}]}).then((data)=>{
        this.AMT = data.data.items[0]["AMT"];
      });
    },
    doQueryNext: async function() {
      this.openParam.pageIndex++;
      this.topStatus = "loading";
      await this.$callAsync({method:db.open,params:[this.openParam]}).then((data)=>{
        this.topStatus = "";
        data.data.items.forEach(item => {
          this.list.push(item);
        });
        this.$refs.loadmore.onBottomLoaded();
        if (data.data.items.length == 0) {
          this.allLoaded = true;
        }
      });
    }
  },
  created(){
     this.SDATE =this.$route.query.SDATE|| dateToString(dateAdd(new Date(),"d",1));
     this.EDATE =this.$route.query.EDATE|| dateToString(dateAdd(new Date(),"d",1));
     this.SNODECODE  =this.$route.query.SNODECODE|| this.$store.getters.userInfo.SNODECODE;
     this.$callAsync({method:this.doQuery,params:[],timeOut:600})
  },
  watch:{
    SDATE(){
      this.changeDate(this.SDATE,this.EDATE)
    },
    EDATE(){
      this.changeDate(this.SDATE,this.EDATE)
    }
  }
};
</script>
<style scoped>
.rr-list-clear{right: 56px;}
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-media-rili{ min-width: 60px; min-height: 60px; margin-right: 10px; text-align: center; color: #fff; border-radius: 5px;}
.rr-media-rili h3{ margin-bottom: 0; margin-top: 8px;}
.rr-media-rili p{ color: #fff;}
.rr-list-rili li:nth-child(2n) .rr-media-rili{ background: #58cffa;}
.rr-list-rili li:nth-child(2n-1) .rr-media-rili{ background: #26cce2;}
.rr-list-rili .rs-flex-item{line-height: 20px}
.rr-list-rili-b{ line-height: 1; position: absolute; bottom: 0;left: 0;}
.rr-input-w100{width: 100%; display: block; font-size: 15px; height: 24px; line-height: 24px; padding:10px 0; border: none; margin-bottom: 0}
.rr-list-search{padding: 0 10px; position: absolute; right: 10px; margin-top: -4px;}
</style>

