<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <div class="rs-nex-prev">
      <span
        class="rr-left rr-font rr-prevA"
        :class="firstIndex!=-1?'c-active':'c-999'"
        @click="more_first"
      ></span>
      <span
        class="rr-left rr-font rr-prev"
        :class="preIndex!=-1?'c-active':'c-999'"
        @click="more_pre"
      ></span>
      <span
        class="rr-right rr-font rr-nextA"
        :class="endIndex!=-1?'c-active':'c-999'"
        @click="more_end"
      ></span>
      <span
        class="rr-right rr-font rr-next"
        :class="nextIndex!=-1?'c-active':'c-999'"
        @click="more_next"
      ></span>
    </div>
    <div class="mui-content bk-fff">
      <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item>
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经 营 门 店</span>
            <span>：</span>
            <div
              class="rs-flex-item"
            >{{this["SNODECODE"]}} {{this["SNODENAME"]}}</div>
          </div>
        </rs-list-item>        
        <rs-list-item noborder>
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item">{{BILLDATE}} <span :class="BILLDATE|isWeek">{{BILLDATE|getWeek}}</span></div>
          </div>
        </rs-list-item>

      </rs-list>
      <div class="mui-content-padded">
        <div class="rr-table-div">
          <div class="rr-width-5em rr-left">
            <div class="rr-table-divH">项目</div>
            <div class="rr-table-divd">实际收入</div>
            <div class="rr-table-divd">线下</div>
            <div class="rr-table-divd">线下%</div>
            <div class="rr-table-divd">线上</div>
            <div class="rr-table-divd">线上%</div> 
            <div class="rr-table-divd">差异</div>
            <div class="rr-table-divd">差异‰</div> 
            <div style="height: 4px; background: #eee;"></div>
            <div class="rr-table-divd rr-weight c-icon-blue">堂食</div>
            <div class="rr-table-divd">现金卡值</div>
            <div class="rr-table-divd">微信</div>
            <div class="rr-table-divd">支付宝</div>
            <div class="rr-table-divd">老系统</div> 
            <div class="rr-table-divd">堂食退款</div>
            <div class="rr-table-divd rr-weight c-icon-blue">饿了么</div>
            <div class="rr-table-divd">在线支付</div>
            <div class="rr-table-divd">手续费</div>
            <div class="rr-table-divd">承担补贴</div>
            <div class="rr-table-divd rr-weight c-icon-blue">美团</div> 
            <div class="rr-table-divd">在线支付</div>
            <div class="rr-table-divd">手续费</div>
            <div class="rr-table-divd">承担补贴</div>
            <div style="height: 4px; background: #eee;"></div>
            <div class="rr-table-divd"><span class="rr-justify rr-width-4em">店 长</span></div>
            <div class="rr-table-divd"><span class="rr-justify rr-width-4em">单 据 号</span></div> 
            <div class="rr-table-divd"><span class="rr-justify rr-width-4em">填 报 人</span></div>
            <div class="rr-table-divd" :class="MAIN.length>=2?'rr-table-div2h':''"><span class="rr-justify rr-width-4em">填 报 时 间</span></div>
            <div class="rr-table-divd"><span class="rr-justify rr-width-4em">审 核 人</span></div>
            <div class="rr-table-divd" :class="MAIN.length>=2?'rr-table-div2h':''"><span class="rr-justify rr-width-4em">审 核 时 间</span></div>
          </div>
          <div class="rr-table-body rs-flex-row">
            <div class="rs-flex-item" :style="{'borderRight':(index==MAIN.length-1?'1px solid #eee': '')}" v-for="(item,index) in MAIN" :key="index">
              <div class="rr-table-divH">{{item.DEADLINE}}</div>
              <div class="rr-table-divd rr-text-right">{{item.FACTAMT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.ONLINEAMT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.ONLINERATE|toFixed(1)}}<i v-if="item.ONLINERATE">%</i></div>
              <div class="rr-table-divd rr-text-right">{{item.OFFLINEAMT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.OFFLINERATE|toFixed(1)}}<i v-if="item.OFFLINERATE">%</i></div>
              <div class="rr-table-divd rr-text-right">{{item.DIFFAMT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.DIFFRATE|toFixed(1)}}<i v-if="item.DIFFRATE">‰</i></div>
              <div style="height: 4px; background: #eee;"></div>
              <div class="rr-table-divd rr-text-right">{{item.TSCNT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.XJKZ|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.WX|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.ZFB|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.LXT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.TSTJ|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.ELMCNT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.EZXZF|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.ESXF|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.ECDBT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.MTCNT|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.MZXZF|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.MSXF|toFixed(2)}}</div>
              <div class="rr-table-divd rr-text-right">{{item.MCDBT|toFixed(2)}}</div>
              <div style="height: 4px; background: #eee;"></div>
              <div class="rr-table-divd">{{item.MANAGER}}</div>
              <div class="rr-table-divd">{{item.BILLCODE}}</div>
              <div class="rr-table-divd">{{item.MAKER}}</div>
              <div class="rr-table-divd" :class="MAIN.length>=2?'rr-table-div2h':''">{{item.MAKEDATE}}</div>
              <div class="rr-table-divd">{{item.VERIFIER}}</div>
              <div class="rr-table-divd" :class="MAIN.length>=2?'rr-table-div2h':''">{{item.VERIFYDATE}}</div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapDateTable, Constants } from "../store";
import { getWeek } from "rs-vcore/utils/Date";
import main_dts from "./components/main_dts";
export default {
  props: {
    TITLE: ""
  },
  name: "jiesuandongtai",
  data() {
    return {
      ISINPUTSHOW: false,
      length: parseInt(this.$route.query.length),
      index: parseInt(this.$route.query.index)
    };
  },
  components: {
    main_dts
  },
  computed: {
    ...mapGetters(["ISSHOWSAVE", "ISSHOWDELETE", "ISTIME"]),
    ...mapDateTable("MAIN", [
      "BILLDATE",
      "SNODECODE",
      "SNODENAME",
    ]),
    ...mapDateTable("DTS", []),
    firstIndex() {
      return this.index != 0 ? this.index : -1;
    },
    preIndex() {
      return this.index - 1 >= 0 ? this.index - 1 : -1;
    },
    nextIndex() {
      return this.index + 1 <= this.length - 1 ? this.index + 1 : -1;
    },
    endIndex() {
      return this.index != this.length - 1 ? this.index : -1;
    }
  },
  methods: {
    more_first: function() {
      if (this.firstIndex != -1) {
        this.index = 0;
        this.doquery();
      }
    },
    more_pre: function() {
      if (this.preIndex != -1) {
        this.index = this.index - 1;
        this.doquery();
      }
    },
    more_next: function() {
      if (this.nextIndex != -1) {
        this.index = this.index + 1;
        this.doquery();
      }
    },
    more_end: function() {
      if (this.endIndex != -1) {
        this.index = this.length - 1;
        this.doquery();
      }
    },
    doquery: function(index) {
       this.$store.dispatch(`${Constants.STORE_NAME}/loadIndexDTS`, {
       idx: this.index
    });
    }
  },
  watch: {
    DEADLINE() {
      this.$store.commit(`${Constants.STORE_NAME}/${Constants.M_SETDEADLINE}`);
    }
  },
  activated: function() {
    this.$store.dispatch(`${Constants.STORE_NAME}/loadDTS`, {
      BILLID: this.$route.query.BILLID,
      SNODEID: this.$route.query.SNODEID,
      BILLDATE: this.$route.query.BILLDATE,
    });
  },
  deactivated() {
    this.$destroy();
  },
  filters: {
    getWeek(value) {
      return value ? getWeek(value) : "";
    },
    isWeek(value) {
      if(getWeek(value)=='周六'||getWeek(value)=='周日'){
        return 'c-icon-red';
      }
    }
  }
};
</script>
<style scoped lang="postcss">
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-table-div{font-size: 14px; background: #fff}
.rr-table-divH{background: rgb(204,232,255);text-align: center; padding:5px 3px;border: 1px solid rgb(204,217,255); border-right: none}
.rr-table-div .rr-table-divd{padding:5px 3px; min-height:32px;border-bottom: 1px solid #eee; border-left:1px solid #eee}
.rr-table-div2h{height: 53px;}
.rr-table-divd .rr-justify{line-height: 21px; height:21px;}
.rr-table-body{margin-left: 5em; overflow-x: auto; width:auto;}
.rr-table-body .rs-flex-item{ min-width: 8em;}
</style>
