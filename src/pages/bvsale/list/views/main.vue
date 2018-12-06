<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>  
    <rs-list class="rr-line-24 mb10" size="15" noborder>
      <rs-list-item noborder isright @click.native="open('picker2')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">开 始 日 期</span>
          <span>：</span>
          <div class="rs-flex-item rr-line-b">
              {{SDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder isright @click.native="open('picker3')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">结 束 日 期</span>
          <span>：</span>
          <div class="rs-flex-item rr-line-b">
              {{EDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder style="margin-top:-10px">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em mt10">网 点 编 号</span>
          <span class="mt10">：</span>
          <div class="rs-flex-item rr-line-b">
            <input type="text" class="rr-input-w100 mt10" v-model="SNODECODE"/>
          </div>
          <rs-button size="small" style="position:ab" @click="doQuery">查询</rs-button>
        </div>
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
      <rs-loadmore :bottom-method="doQueryNext" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="doQuery" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
        <rs-list class="rr-line-24 rr-list-rili" size="14" noborder>
          <rs-list-item v-for="item in list" :key="item.BILLID" @click.native="linkMat(item)">
            <div class="rs-flex-row">
              <div class="rr-media-rili">
                <h3>{{item.BILLDATE|datePart("d")}}</h3>
                <div>{{item.BILLDATE|datePart("m")}}月</div>
              </div>
              <div class="rs-flex-item f14 rr-position-re">
                <span class="rr-right">{{item.MSTYPENAME}}</span>
                <div>{{item.SNODECODE+"("+item.SNODENAME+")"}}</div>
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
    <div class="f14 bk-fff rs-padding-5">金额合计：{{AMT|toFixed(2)}}(元)</div>
  </div>
</template>
<script>
import db from "@/api/db";
import { dateToString,getWeek,datePart,dateAdd} from "rs-vcore/utils/Date";
export default {
  name: "list",
  props: {
    TITLE: { type: String }
  },
  data() {
    return {
      list: [],
      topStatus: "",
      allLoaded: false,
      searchInput: "",
      SDATE:dateToString(dateAdd(new Date(),"d",1)),
      EDATE:dateToString(dateAdd(new Date(),"d",1)),
      SNODECODE:"%",
      openParam: {}
    };
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    linkUrl: function(path,title) {
      this.$router.push({path:path,query:{TITLE:title}})
    },
    setOpenParam: function() {
      this.openParam = {
        modalName: "VSL_SALE_QRY_4MOBILE",
        where: ` SNODECODE LIKE '${this.SNODECODE}%' AND AID=@AID AND BILLTYPEID = '232'  AND BUSTYPEID=100993 AND  MSTYPEID=10354  AND BILLDATE >= TO_DATE('${this.SDATE}','YYYY-MM-DD') AND BILLDATE <= TO_DATE('${this.EDATE}','YYYY-MM-DD') AND [SNODEID] IN(SELECT COLUMN_VALUE FROM TABLE(tss_getpowwhere('SNODE','@UID','@AID')) UNION ALL SELECT ${this.$store.state.user.userInfo.SNODEID||0} FROM DUAL)`,
        orderBy: "BILLDATE,BILLCODE",
        pageSize: 25,
        pageIndex: 1
      };
    },
    doQuery: function(){
      this.topStatus = "loading";
      this.allLoaded = false;
      this.setOpenParam();
      db.open(this.openParam).then(data => {
        this.list = data.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });
    },
    doQueryNext: async function() {
      this.openParam.pageIndex++;
      this.topStatus = "loading";
      db.open(this.openParam).then(data => {
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
  filters:{
    getWeek(value){
      return value?(value+" "+getWeek(value)):"";
    },
    toFixed(value, cm) {
      if(value=="0"||value!=""){
          return parseFloat(value || 0).toFixed(cm);
      }
    },
    datePart(value,c){
      return datePart(value,c)
    }
  }
};
</script>
<style scoped>
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-media-rili{ min-width: 60px; min-height: 60px; margin-right: 10px; text-align: center; color: #fff; border-radius: 5px;}
.rr-media-rili h3{ margin-bottom: 0; margin-top: 8px;}
.rr-media-rili p{ color: #fff;}
.rr-list-rili li:nth-child(2n) .rr-media-rili{ background: #58cffa;}
.rr-list-rili li:nth-child(2n-1) .rr-media-rili{ background: #26cce2;}
.rr-list-rili .rs-flex-item{line-height: 20px}
.rr-list-rili-b{ line-height: 1; position: absolute; bottom: 0;left: 0;}
.rr-input-w100{width: 100%; display: block; height: 24px; line-height: 24px; padding:10px 0; border: none; margin-bottom: 0}
.rs-btn{padding: 0 10px;}
</style>

