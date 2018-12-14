<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item isright @click.native="open('picker1')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item">{{BILLDATE}} <span :class="BILLDATE|isWeek">{{BILLDATE|getWeek}}</span></div>
          </div>
        </rs-list-item>
        <rs-list-item noborder :isright="SNODEID==''" @click.native="linkUrl('snodesel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经营门店</span>
            <span>：</span>
            <div
              class="rs-flex-item"
            >{{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}</div>
          </div>
          <span v-if="SNODEID!=''" class="rr-list-clear rr-font rr-quxiao" @click.stop="clearMD"></span>
        </rs-list-item>
      </rs-list>
      <rs-datetime
        key="jiesuanribao.1"
        ref="picker1"
        type="date"
        v-model.lazy="BILLDATE"
      ></rs-datetime>
      <div class="bk-fff rs-padding-lr">
      <table class="rr-table">
          <thead class="rr-table-header">
            <tr>
              <td>经营门店</td>
              <td class="rr-table-w4em">实际收入</td>
              <td class="rr-table-w4em">线下
                <br>线下%
              </td>
              <td class="rr-table-w4em">线上
                <br>线上%
              </td>
              <td class="rr-table-w4em">差异
                <br>差异‰
              </td>
            </tr>
          </thead>
      </table>
    </div>
    <div class="mui-content bk-fff">
      <rs-loadmore :bottom-method="doQueryNext" :top-status.sync="topStatus" :bottom-all-loaded="allLoaded" :top-method="doQuery" :auto-fill=false  ref="loadmore">
        <div class="rs-padding-lr">
          <table class="rr-table">
            <tbody class="rr-table-body">
              <tr v-for="(item,index) in QRY" :key="index" @click="linkDetail(item.BILLID,item.SNODEID,item.BILLDATE,index)">
                <td>
                  {{item.SNODECODE}}
                  <br>
                  {{item.SNODENAME}}
                </td>
                <td class="rr-text-right rr-table-w4em" 
                :class="item.FACTAMT | color">
                {{item.FACTAMT|toFixed(2)}}
                </td>
                <td class="rr-text-right rr-table-w4em" 
                :class="item.ONLINEAMT | color">
                  {{item.ONLINEAMT|toFixed(2)}}
                  <div v-if="item.ONLINERATE" :class="item.ONLINERATE | color1">{{item.ONLINERATE|toFixed(1)}}%</div>
                </td>
                <td class="rr-text-right rr-table-w4em"
                :class="item.OFFLINEAMT | color">
                {{item.OFFLINEAMT|toFixed(2)}}
                  <div v-if="item.OFFLINERATE" :class="item.OFFLINERATE | color1">{{item.OFFLINERATE|toFixed(1)}}%</div>
                </td>
                <td class="rr-text-right rr-table-w4em" :class="parseFloat(item.DIFFAMT)==0?'c-999':'c-icon-red'">{{item.DIFFAMT|toFixed(2)}}
                  <div v-if="item.DIFFRATE" :class="item.DIFFRATE | color1">{{item.DIFFRATE|toFixed(1)}}‰</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="allLoaded" class="rs-list-nodata">
          <span>没有数据啦</span>
        </div>
      </rs-loadmore>
    </div>
    <div class="rs-padding-lr">
      <table class="rr-table">
        <tbody class="rr-table-body">
          <tr class="rr-table-heji">
            <td class="rr-text-right rr-weight">合计:</td>
            <td class="rr-text-right rr-table-w4em" 
            :class="FACTAMTALL | color(FACTAMTALL)">
            {{FACTAMTALL|toFixed(2)}}
            </td>
            <td class="rr-text-right rr-table-w4em">{{ONLINEAMTALL|toFixed(2)}}
              <div v-if="ONLINERATEALL">{{ONLINERATEALL|toFixed(1)}}%</div>
            </td>
            <td class="rr-text-right rr-table-w4em">{{OFFLINEAMTALL|toFixed(2)}}
              <div v-if="OFFLINERATEALL">{{OFFLINERATEALL|toFixed(1)}}%</div>
            </td>
            <td class="rr-text-right rr-table-w4em">{{DIFFAMTALL|toFixed(2)}}
              <div v-if="DIFFRATEALL">{{DIFFRATEALL|toFixed(1)}}‰</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>    
  </div>
</template>
<script>
import { mapGetters, mapDateTable, Constants } from "../store";
import { getWeek } from "rs-vcore/utils/Date";
export default {
  props: {
    TITLE: ""
  },
  name: "jiesuandongtai",
  data() {
    return {
      ISINPUTSHOW: false,
      pageIndex: 1,
      topStatus: "",
      allLoaded: false
    };
  },
  computed: {
    ...mapGetters([]),
    ...mapDateTable("QRYADV", [
      "BILLDATE",
      "SNODEID",
      "SNODEID.SNODECODE",
      "SNODEID.SNODENAME",
    ]),
    ...mapDateTable("QRY", []),
    ...mapDateTable("QRYALL", [
      "FACTAMTALL",
      "ONLINEAMTALL",
      "ONLINERATEALL",
      "OFFLINEAMTALL",
      "OFFLINERATEALL",
      "DIFFAMTALL",
      "DIFFRATEALL"
    ]),
    length() {
      return this.QRY.length
    }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({ path: "/jiesuandongtai/main/" + url });
    },
    linkDetail: function(BILLID,SNODEID,BILLDATE, index) {
      this.$router.push({
        path: "/jiesuandongtai/main/detail",
        query: { BILLID:BILLID,SNODEID:SNODEID, BILLDATE:BILLDATE,index: index, length: this.length }
      });
    },
    open(picker) {
      this.$refs[picker].open();
    },
    doQuery: function(){
      this.topStatus = "loading";
      this.allLoaded = false;
      this.$store.dispatch(`${Constants.STORE_NAME}/openReport`,{BILLID:""}).then(()=>{
         this.topStatus = "";
         this.$refs.loadmore.onTopLoaded();
      });
    },
    clearMD: function(){
      this.SNODEID=''
      this['SNODEID.SNODECODE']=''
      this['SNODEID.SNODENAME']=''
    },
    doQueryNext: async function() {
      debugger;
      this.topStatus = "loading";
      this.pageIndex ++;
      this.$store.dispatch(`${Constants.STORE_NAME}/openReport`,{pageIndex:this.pageIndex}).then(()=>{
         this.topStatus = "";
         this.$refs.loadmore.onBottomLoaded();
         if(this.QRY.length === 0){
          this.allLoaded = true;
         }
      });
    }
  },
  watch: {
    "BILLDATE":function(){
       this.doQuery();
    },
    "SNODEID":function(){
       this.doQuery();
    }
  },
  activated: function() {
    // console.log("%c" + this.$route.path, "color:red");
  },
  filters: {
    getWeek(value) {
      return value ? getWeek(value) : "";
    },
    isWeek(value) {
      if(getWeek(value)=='周六'||getWeek(value)=='周日'){
        return 'c-icon-red';
      }
    },
    color(value) {
      let value1 = parseFloat(value)
      if(value1<0){
        return 'c-icon-red'
      }else if(value1==0){
        return 'c-999'
      }
    },
    color1(value) {
      return parseFloat(value)==0?'c-999':'c-000'
    }
  }
};
</script>
<style scoped lang="postcss">
.rr-line-24,
.rr-line-24 .rr-justify {
  line-height: 24px;
}
.rr-line-24 .rr-justify {
  height: 24px;
}
.rr-list-search{padding: 0 10px; position: absolute; right: 10px; bottom: 6px}
.rs-list-nodata span{ background: #fff}
@component-namespace rr {
  @component table {
    font-size: 14px;
    width: 100%;
    @descendent w4em {
      width: 4.5em;
    }
    @descendent header {
      background: rgb(204, 232, 255);
      text-align: center;
      td {
        padding: 3px;
        vertical-align: top;
        border: 1px solid rgb(204, 217, 255);
      }
    }
    @descendent body {
      background: #fff;
      td {
        padding: 3px;
        vertical-align: top;
        border-bottom: 1px solid #eee;
      }
    }
    @descendent heji {
      background: #eee;
      td {
        padding: 3px;
        vertical-align: top;
      }
    }
  }
}
</style>

