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
        <div class="mui-content bk-fff">                                                                                                                                                                                                      
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
          </rs-list>
          <div class="mui-content-padded">
            <table class="rr-table">
              <thead class="rr-table-header">
                <tr>
                  <td>项目</td>
                  <td class="rr-table-w4em">10:00</td>
                  <td class="rr-table-w4em">12:00</td>
                  <td class="rr-table-w4em">全天</td>
                </tr>
              </thead>
              <tbody class="rr-table-body">
                <tr>
                  <td>实际收入</td>
                  <td class="rr-text-right">10.02</td>
                  <td class="rr-text-right">12</td>
                  <td class="rr-text-right">22.02</td>
                </tr>
              </tbody>
            </table>
            <div style="height: 5px; background: #eee;"></div>
            <table class="rr-table">
              <tbody class="rr-table-body">
                <tr>
                  <td>实际收入</td>
                  <td class="rr-table-w4em rr-text-right">10.02</td>
                  <td class="rr-table-w4em rr-text-right">12</td>
                  <td class="rr-table-w4em rr-text-right">22.02</td>
                </tr>
              </tbody>
            </table>
            <div style="height: 5px; background: #eee;"></div>
            <table class="rr-table">
              <tbody class="rr-table-body">
                <tr>
                  <td>店长</td>
                  <td class="rr-table-w4em">张三</td>
                  <td class="rr-table-w4em">张三</td>
                  <td class="rr-table-w4em">张三</td>
                </tr>
                <tr>
                  <td>单据号</td>
                  <td>BILLCODE</td>
                  <td>DJ-10290-1029</td>
                  <td>DJ-10290-1029</td>
                </tr>
                <tr>
                  <td>填报人</td>
                  <td>张三</td>
                  <td>张三</td>
                  <td>张三</td>
                </tr>
                <tr>
                  <td>填报时间</td>
                  <td>2018-12-05 星期三</td>
                  <td>2018-12-05 星期三</td>
                  <td>2018-12-05 星期三</td>
                </tr>
                <tr>
                  <td>审核人</td>
                  <td>张三</td>
                  <td>张三</td>
                  <td>张三</td>
                </tr>
                <tr>
                  <td>审核时间</td>
                  <td>2018-12-05 星期三</td>
                  <td>2018-12-05 星期三</td>
                  <td>2018-12-05 星期三</td>
                </tr>
              </tbody>
            </table>
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
<style scoped lang="postcss">
.rs-listItem{ padding: 8px 15px;}
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
@component-namespace rr {
  @component table {
    font-size: 14px;
    width: 100%;
    @descendent w4em {
      width: 5em;
    }
    td{
      padding: 3px;
      word-break:break-word;
    }
    @descendent header {
      background: rgb(204,232,255);
      text-align: center;
      td{
        border: 1px solid rgb(204,217,255);
      }  
    }
    @descendent body {
      background: #fff;
      td{
        border: 1px solid #eee;
      }  
    }
  }
}      
</style>

