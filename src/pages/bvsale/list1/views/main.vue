<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>  
    <rs-list class="rr-line-24" size="15" noborder>
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
          <span class="">：</span>
          <div class="rs-flex-item">
            <input type="text" class="rr-input-w100" v-model="SNODECODE" placeholder="点击输入"/>
          </div>
          <rs-button size="small" class="rr-list-search" @click="doQuery()">查询</rs-button>
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
    <rs-navbar v-model="TYPE" inverted>
      <rs-nav-item id="0">
        全部
      </rs-nav-item>
      <rs-nav-item id="1">
        营业未定
      </rs-nav-item>
    </rs-navbar>
    <div class="mui-content"> 
      <div v-if="list.length<=0" class="rs-list-nodata">
        <span>无对应数据！</span>
      </div>
     <rs-loadmore :bottom-method="doQueryNext"  :top-status.sync="topStatus" :bottom-all-loaded="allLoaded" :top-method="doQuery" :auto-fill=false  ref="loadmore">
        <rs-list class="rr-line-24 rr-list-rili" size="14" noborder>
         <rs-list-item v-for="item in list" :key="item.BILLID" @click.native="linkBVSale(item)">
            <div class="rs-flex-row">
              <div class="rr-media-rili">
               <h3>{{item.SLDATE|datePart("d")}}</h3>
                <div>{{item.SLDATE|datePart("m")}}月</div>
              </div>
              <div class="rs-flex-item f17">
                  <span :class="['rr-right f14',{'c-icon-red':(['营业未订','息业已订'].indexOf(item.SLSTATENAME)>-1)},{'c-icon-gray':(['息业未订','期外未订'].indexOf(item.SLSTATENAME)>-1)}]">{{item.SLSTATENAME}}</span>
                  {{item.SNODECODE}}
                <div class="mt10 f15">
                  {{item.SNODENAME}}
                  <div class="rr-right f14">
                  <span v-if="item.AMT>0">{{item.AMT|toFixed(2)}}(元)</span>
                </div>
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
  </div>
</template>
<script>
import db from "@/api/db";
import { dateToString,dateAdd} from "rs-vcore/utils/Date";
export default {
  name: "list",
  props: {
    TITLE: { type: String,default:'订货状况' }
  },
  data() {
    return {
      list: [],
      TYPE: '0',
      topStatus: "",
      allLoaded: false,
      openParam:{},
      SDATE:dateToString(dateAdd(new Date(),"d",1)),
      EDATE:dateToString(dateAdd(new Date(),"d",1)),
      SNODECODE:this.$store.getters.userInfo.SNODECODE
    };
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    linkBVSale:function(item){
      if("营业未订" == item["SLSTATENAME"]){
        this.$router.push({path:"/bvsale",query:{ACTION:"ADD",SNODEID:item["SNODEID"],BILLDATE:item["SLDATE"]}})
      }
      if(["营业已订","息业已订","期外已订"].indexOf(item["SLSTATENAME"])>=0){
        this.$router.push({path:"/bvsale/list",query:{SNODECODE:item["SNODECODE"],SDATE:item["SLDATE"],EDATE:item["SLDATE"]}})
      }
    },
    setOpenParam: function() {
      this.openParam =  {sqlId:"51517",pageSize:20,SNODECODE:this.SNODECODE,SNODEID:this.$store.state.user.userInfo.SNODEID||0,SDATE:this.SDATE,EDATE:this.EDATE,TYPE:this.TYPE}
    },
    doQuery: function(){
      this.topStatus = "loading";
      this.allLoaded = false;
      this.setOpenParam();
      this.$busy();
      this.$callAsync({method:db.open,params:[this.openParam]}).then((data)=>{
         this.list = data.data.items;
         this.topStatus = "";
         this.$refs.loadmore.onTopLoaded();
      });
    },
    doQueryNext: async function() {
      let items = this.list.map((item)=>{
        return item["SNODEID"]+"-"+item["SLDATE"];
      })
      this.openParam.NOTIN = ("'"+items.join("','")+"'");
      this.topStatus = "loading";
      this.$callAsync({method:db.open,params:[this.openParam]}).then((data)=>{
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
    this.doQuery();
  },
  watch:{
    SDATE(){
      this.changeDate(this.SDATE,this.EDATE)
    },
    EDATE(){
      this.changeDate(this.SDATE,this.EDATE)
    },
    TYPE(){
      this.doQuery();
    }
  }
};
</script>
<style scoped>
/* .rs-listItem{ padding: 8px 15px;} */
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-media-rili{ min-width: 60px; min-height: 60px; margin-right: 10px; text-align: center; color: #fff; border-radius: 5px;}
.rr-media-rili h3{ margin-bottom: 0; margin-top: 8px;}
.rr-media-rili p{ color: #fff;}
.rr-list-rili li:nth-child(2n) .rr-media-rili{ background: #58cffa;}
.rr-list-rili li:nth-child(2n-1) .rr-media-rili{ background: #26cce2;}
.rr-input-w100{width: 100%; display: block; font-size: 15px; height: 24px; line-height: 24px; padding:10px 0; border: none; margin-bottom: 0}
.rr-list-search{padding: 0 10px; position: absolute; right: 10px; margin-top: -4px;}
</style>

