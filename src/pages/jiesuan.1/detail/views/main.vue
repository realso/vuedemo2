<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
          <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
        </rs-header>
        <div class="rs-nex-prev">
          <span class="rr-left rr-font rr-prevA" :class="firstIndex!=-1?'c-active':'c-999'" @click="more_first"></span>
          <span class="rr-left rr-font rr-prev" :class="preIndex!=-1?'c-active':'c-999'" @click="more_pre"></span>
          <span class="rr-right rr-font rr-nextA" :class="endIndex!=-1?'c-active':'c-999'" @click="more_end"></span>
          <span class="rr-right rr-font rr-next" :class="nextIndex!=-1?'c-active':'c-999'" @click="more_next"></span>
        </div>
        <div class="mui-content">                                                                                                                                                                                                      
          <rs-list class="rr-line-24" size="15" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">经 营 门 店</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                   index:{{index}}length:{{length}} {{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">日 期</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    {{BILLDATE|getWeek}}
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">店 长</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    {{MANAGER}} 
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">实 际 收 入</span>
                <span>：</span>
                <div class="rs-flex-item rr-text-center rr-line-b">
                    {{DEADLINE}}
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">线 下</span>
                <span>：</span>
                <div class="rs-flex-item rr-text-center rr-line-b">
                  <span class="rr-right">n.n%</span>
                  200
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">线 上</span>
                <span>：</span>
                <div class="rs-flex-item rr-text-center rr-line-b">
                  <span class="rr-right">n.n%</span>
                    10000
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">差 异</span>
                <span>：</span>
                <div class="rs-flex-item rr-text-center rr-line-b">
                  <span class="rr-right">n.n‰</span>
                    {{DEADLINE}}
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">差 异 说 明</span>
                <span>：</span>
                <div class="rs-flex-item">
                    {{DEADLINE}}
                </div>
              </div>
            </rs-list-item>
          </rs-list>
          <div style="height: 7px; background: #eee;"></div>
          <rs-list size="14" noborder>
            <main_dts v-for="(item) in DTS" :item="item" :key="item.ENTRYID"/> 
          </rs-list>
          <div style="height: 7px; background: #eee;"></div>
          <div class="rr-bill-top">
             <div class="rs-flex-row" style="height:33px" v-if="BILLCODE!=''">
                  <span class="rr-justify rr-width-4em">单 据 号</span>
                  <span>：</span>
                  <div class="rs-flex-item">
                      {{BILLCODE}}
                  </div>
              </div>
              <div class="rs-flex-row" style="height:33px" v-if="MAKER!=''">
                  <span class="rr-justify rr-width-4em">填 报</span>
                  <span>：</span>
                  <div class="rs-flex-item">
                      {{MAKER}} {{MAKEDATE}}
                  </div>
              </div>
              <div class="rs-flex-row" style="height:33px;" v-if="VERIFIER!=''">
                  <span class="rr-justify rr-width-4em">审 核</span>
                  <span>：</span>
                  <div class="rs-flex-item">
                       {{VERIFIER}} {{VERIFYDATE}}
                  </div>
              </div>
          </div>
        </div> 
    </div>
</template>
<script>
import {mapGetters,mapDateTable,Constants} from "../store"
import { getWeek } from "rs-vcore/utils/Date";
import main_dts from "./components/main_dts";
export default {
  props:{
    TITLE:''
  },
  name: "jiesuan",
  data() {
    return {
      ISINPUTSHOW: false,
      length: parseInt(this.$route.query.length),
      index: parseInt(this.$route.query.index)
    };
  },
  components:{
    main_dts
  },
  computed: {
      ...mapGetters(["ISSHOWSAVE","ISSHOWDELETE","ISTIME"]),
      ...mapDateTable("MAIN",['BILLTYPEID','BILLDATE','BILLCODE','SNODEID.SNODECODE',"SNODEID.SNODENAME","MANAGER","DIFFREMARK","MAKER","VERIFIER","MAKEDATE","VERIFYDATE","TALLIER","TALLYDATE","FHOUR","FMINUTE","DEADLINE"]),
      ...mapDateTable("DTS",[]),
      firstIndex(){
        return this.index!=0?this.index:-1
      },
      preIndex(){
        return (this.index-1)>=0?this.index-1:-1
      },
      nextIndex(){
        return (this.index+1)<=this.length-1?this.index+1:-1
      },
      endIndex(){
        return this.index!=this.length-1?this.index:-1
      }
  },
  methods: {
    more_first: function() {
      if(this.firstIndex!=-1){
        this.index = 0
        this.doquery()
      }
    },
    more_pre: function() {
      if(this.preIndex!=-1){
        this.index = this.index-1
        this.doquery()
      }
    },
    more_next: function() {
      if(this.nextIndex!=-1){
        this.index = this.index+1
        this.doquery()
      }
    },
    more_end: function() {
      if(this.endIndex!=-1){
        this.index = this.length-1
        this.doquery()
      }
    },
    doquery: function(index) {
      this.$router.push({path:"/jiesuan1/detail/main",query:{"index":this.index}});
    }
  },
  watch:{
    DEADLINE(){
      this.$store.commit(`${Constants.STORE_NAME}/${Constants.M_SETDEADLINE}`);
    }
  },
  activated: function() {
      console.log("%c"+this.$route.path,"color:red");
  },
  filters:{
    getWeek(value){
      return value?(value+" "+getWeek(value)):"";
    }
  }
};
</script>
<style scoped>
.rr-title{ padding: 5px 15px; font-size: 15px; border-bottom: 1px solid #bbb; background: #fff; margin-top: 5px;}
.rr-list-input{ text-align: right;}
.rs-listItem{ padding: 7px 15px;}
.rs-list{padding-top:5px;}
.rr-list-textarea{padding: 5px 15px; background: #fff;}
.rr-list-textarea textarea{font-size: 15px; margin-bottom: 0;}
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rs-numInput-input{position: absolute; top: 0; width: 100%; border: none; height: 100%; padding: 0; text-align: right; font-size: 14px;margin: 0;}
.rr-opacity{opacity: 0;}
</style>

