<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
           <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
        </rs-header>
        <div class="mui-content bk-fff">
          <rs-list class="rr-line-24" size="15" noborder>
            <rs-list-item noborder isright @click.native="open('picker2')">
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">日 期</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    {{BILLDATE|getWeek}}
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder isright  @click.native="linkUrl('snodesel')">
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">经营门店</span>
                <span>：</span>
                <div class="rs-flex-item">
                    {{this["QRYSNODEID.SNODECODE"]}} {{this["QRYSNODEID.SNODENAME"]}}
                </div>
              </div>
            </rs-list-item>
          </rs-list> 
          <rs-datetime
            key="jiesuan1.1"
            ref="picker2"
            type="date"
            v-model.lazy="BILLDATE"
             @confirm="handleChangeD"
            >
          </rs-datetime>
          <div class="mui-content-padded">
            <table class="rr-table">
              <thead class="rr-table-header">
                <tr>
                  <td>经营门店</td>
                  <td class="rr-table-w4em">实际收入</td>
                  <td class="rr-table-w4em">线下<br/>占比%</td>
                  <td class="rr-table-w4em">线上<br/>占比%</td>
                  <td class="rr-table-w4em">差异<br/>差异%</td>
                </tr>
              </thead>
              <tbody class="rr-table-body">
                <tr v-for="(item,index) in QRY" :key="index" @click="linkUrl1(item.SNODEID,index)">
                  <td>{{item.SNODECODE}}<br/>{{item.SNODENAME}}</td>
                  <td class="rr-text-right">{{item.SNODEID}}</td>
                  <td class="rr-text-right">{{item.ONLINEAMT}}<br/>{{item.ONLINERATE}}%</td>
                  <td class="rr-text-right">{{item.OFFLINEAMT}}<br/>{{item.OFFLINERATE}}%</td>
                  <td class="rr-text-right">{{item.SNODEID}}<br/>{{item.SNODEID}}%</td>
                </tr>
                <tr class="rr-table-heji">
                  <td class="rr-text-right rr-weight">合计:</td>
                  <td class="rr-text-right">30.1</td>
                  <td class="rr-text-right">20<br/>2.09%</td>
                  <td class="rr-text-right">9<br/>2.09%</td>
                  <td class="rr-text-right">1.1<br/>2.09%</td>
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
export default {
  props:{
    TITLE:""
  },
  name: "jiesuan",
  data() {
    return {
      ISINPUTSHOW: false
    };
  },
  computed: {
      ...mapGetters(["ISSHOWSAVE","ISSHOWDELETE","ISTIME"]),
      ...mapDateTable("MAIN",['BILLTYPEID','BILLDATE','BILLCODE','SNODEID.SNODECODE',"SNODEID.SNODENAME","MANAGER","DIFFREMARK","MAKER","VERIFIER","MAKEDATE","VERIFYDATE","TALLIER","TALLYDATE","FHOUR","FMINUTE","DEADLINE"]),
      ...mapDateTable("DTS",[]),
      ...mapDateTable("QRY",[]),
      length(){
        return this.QRY.length
      }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/dongtai/detail/"+url});
    },
    linkUrl1: function(SNODEID,index) {
      this.$router.push({path:"/dongtai/detail/detail",query:{SNODEID:SNODEID,index:index,length:this.length}})
    },
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD:function(){
      this.$callAction({action:`${Constants.STORE_NAME}/loadSTLFMITE`});
    },
    save(){
       this.$callAction({action:`${Constants.STORE_NAME}/mySave`,successText:"保存成功"});
    },
    async del(){
       await this.$confirm("确认删除？");
       this.$callAction({action:`${Constants.STORE_NAME}/delete`,successText:"删除成功",isSuccessBack:true});
    }
  },
  watch:{
    DEADLINE(){
      this.$store.commit(`${Constants.STORE_NAME}/${Constants.M_SETDEADLINE}`);
    }
  }
  ,
  activated: function() {
      console.log("%c"+this.$route.path,"color:red");
      this.$store.dispatch(`${Constants.STORE_NAME}/setForm`);
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
      width: 4.5em;
    }
    @descendent header {
      background: rgb(204,232,255);
      text-align: center;
      td{
        padding: 3px;
        border: 1px solid rgb(204,217,255);
      }  
    }
    @descendent body {
      background: #fff;
      td{
        padding: 3px;
        border-bottom: 1px solid #eee;
      }  
    }
    @descendent heji {
      background: #eee;
      td{
        padding: 3px;
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
      }  
    }
  }
}      
</style>
