<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.push('/main1')" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item isright @click.native="open('picker1')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item">{{BILLDATE|getWeek}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright @click.native="linkUrl('snodesel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经营门店</span>
            <span>：</span>
            <div
              class="rs-flex-item"
            >{{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}</div>
          </div>
        </rs-list-item>
      </rs-list>
      <rs-datetime
        key="jiesuanribao.1"
        ref="picker1"
        type="date"
        v-model.lazy="BILLDATE"
      ></rs-datetime>
    <div class="mui-content bk-fff">
      <div class="mui-content-padded">
        <table class="rr-table">
          <thead class="rr-table-header">
            <tr>
              <td>经营门店</td>
              <td class="rr-table-w4em">实际收入</td>
              <td class="rr-table-w4em">线下
                <br>占比%
              </td>
              <td class="rr-table-w4em">线上
                <br>占比%
              </td>
              <td class="rr-table-w4em">差异
                <br>差异‰
              </td>
            </tr>
          </thead>
          <tbody class="rr-table-body">
            <tr v-for="(item,index) in QRY" :key="index" @click="linkDetail(item.BILLID,item.SNODEID,index)">
              <td>
                {{item.SNODECODE}}
                <br>
                {{item.SNODENAME}}
              </td>
              <td class="rr-text-right" 
              :class="item.FACTAMT | color">
              {{item.FACTAMT|toFixed(2)}}
              </td>
              <td class="rr-text-right" 
              :class="item.ONLINEAMT | color">
                {{item.ONLINEAMT|toFixed(2)}}
                <div v-if="item.ONLINERATE" :class="item.ONLINERATE | color1">{{item.ONLINERATE|toFixed(1)}}%</div>
              </td>
              <td class="rr-text-right"
              :class="item.OFFLINEAMT | color">
              {{item.OFFLINEAMT|toFixed(2)}}
                <div v-if="item.OFFLINERATE" :class="item.OFFLINERATE | color1">{{item.OFFLINERATE|toFixed(1)}}%</div>
              </td>
              <td class="rr-text-right" :class="parseFloat(DIFFRATEALL)==0?'c-999':'c-icon-red'">{{item.DIFFAMT|toFixed(2)}}
                <div v-if="item.DIFFRATE" :class="item.DIFFRATE | color1">{{item.DIFFRATE|toFixed(1)}}‰</div>
              </td>
            </tr>
            <tr class="rr-table-heji">
              <td class="rr-text-right rr-weight">合计:</td>
              <td class="rr-text-right" 
              :class="FACTAMTALL | color(FACTAMTALL)">
              {{FACTAMTALL|toFixed(2)}}
              </td>
              <td class="rr-text-right" :class="ONLINERATEALL | color">{{ONLINEAMTALL|toFixed(2)}}
                <div v-if="ONLINERATEALL" :class="ONLINERATEALL | color1">{{ONLINERATEALL|toFixed(1)}}%</div>
              </td>
              <td class="rr-text-right" :class="OFFLINERATEALL | color">{{OFFLINEAMTALL|toFixed(2)}}
                <div v-if="OFFLINERATEALL" :class="OFFLINERATEALL | color1">{{OFFLINERATEALL|toFixed(1)}}%</div>
              </td>
              <td class="rr-text-right" :class="parseFloat(DIFFRATEALL)==0?'c-999':'c-icon-red'">{{DIFFAMTALL|toFixed(2)}}
                <div v-if="DIFFRATEALL" :class="DIFFRATEALL | color1">{{DIFFRATEALL|toFixed(1)}}‰</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  name: "jiesuan",
  data() {
    return {
      ISINPUTSHOW: false
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
      this.$router.push({ path: "/jiesuanribao/main/" + url });
    },
    linkDetail: function(BILLID,SNODEID, index) {
      this.$router.push({
        path: "/jiesuanribao/main/detail",
        query: { BILLID:BILLID,SNODEID: SNODEID, index: index, length: this.length }
      });
    },
    open(picker) {
      this.$refs[picker].open();
    },
    doQuery: function(){
      this.$store.dispatch(`${Constants.STORE_NAME}/openReport`);
    }
  },
  watch: {
    "BILLDATE":function(){
       this.$store.dispatch(`${Constants.STORE_NAME}/openReport`);
    },
    "SNODEID":function(){
       this.$store.dispatch(`${Constants.STORE_NAME}/openReport`);
    }
  },
  activated: function() {
    console.log("%c" + this.$route.path, "color:red");
  },
  filters: {
    getWeek(value) {
      return value ? value + " " + getWeek(value) : "";
    },
    toFixed(value, cm) {
      if(value=="0"||value!=""){
          return parseFloat(value || 0).toFixed(cm);
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
      return parseFloat(value)==0?'c-999':''
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
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
      }
    }
  }
}
</style>

