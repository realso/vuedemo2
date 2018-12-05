<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
      <div slot="right">
        <rs-button v-if="ISSHOWDELETE" link @click="del">删除</rs-button>
        <rs-button v-if="ISSHOWSAVE" link @click="save">保存</rs-button>
      </div>
    </rs-header>
    <rs-list class="rr-line-24" size="15" noborder>
      <rs-list-item noborder v-if="BILLCODE!=''">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">订 货 单 号</span>
          <span>：</span>
          <div class="rs-flex-item rr-line-b">
              {{BILLCODE}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder isright @click.native="open('picker1')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">订 货 日 期</span>
          <span>：</span>
          <div class="rs-flex-item rr-line-b">
              {{BILLDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder isright  @click.native="linkUrl('snodesel')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">经 营 门 店</span>
          <span>：</span>
          <div class="rs-flex-item">
                {{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}
          </div>
        </div>
      </rs-list-item>
    </rs-list> 
    <rs-datetime
      key="bvsale.1"
      ref="picker1"
      type="date"
      v-model.lazy="BILLDATE"
        @confirm="handleChangeD"
      >
    </rs-datetime> 
    <rs-navbar v-model="selected">
      <rs-nav-item id="1">
        全部
      </rs-nav-item>
      <rs-nav-item id="2">
        已定
      </rs-nav-item>
      <rs-nav-item id="3">
        未定
      </rs-nav-item>
    </rs-navbar>
    <div class="mui-content">
      <rs-list class="rr-line-24" size="15" noborder>
        <!-- <rs-list-item v-for="(item,index) in DTS" :key="index" @click.native="linkMat(item)"> -->
        <rs-list-item @click.native="linkMat(item)">
          <div class="mui-clearfix">
            <span class="rr-right">110g*5*20</span>
            新加坡抛饼
          </div>
          <div class="">
            <span class="rr-right">300.00(元)</span>
            数量:<span class="rr-border rr-width-4em rr-text-center ml5">20</span> <span class="ml5 mr5">袋</span> × <span class="ml5 mr5">15.00</span> =
          </div>
        </rs-list-item>
        <rs-list-item>
          <div class="mui-clearfix">
            <span class="rr-right">110g*5*20</span>
            新加坡抛饼
          </div>
          <div class="">
            <span class="rr-right">300.00(元)</span>
            数量:<span class="rr-border rr-width-4em rr-text-center ml5">20</span> <span class="ml5 mr5">袋</span> × <span class="ml5 mr5">15.00</span> =
          </div>
        </rs-list-item>
       </rs-list>  
    </div>
  </div>
</template>
<script>
import {mapGetters,mapDateTable,Constants} from "../store"
import { getWeek } from "rs-vcore/utils/Date";
export default {
  name: "bvsale",
  props:{
    TITLE:''
  },
  data() {
    return {
      selected: '1'
    };
  },
  computed: {
      ...mapGetters(["ISSHOWSAVE","ISSHOWDELETE","DTSMESSAGE","SELECTEDTAB"]),
      ...mapDateTable("MAIN",['BILLTYPEID','BILLDATE','BILLCODE','SNODEID.SNODECODE',"SNODEID.SNODENAME"]),
      ...mapDateTable("DTS",[])
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/bvsale/add/"+url});
    },
    linkMat:function(item){
        this.$router.push({path:"/bvsale/add/mat",params:{item}});
    },
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD:function(){
      this.$callAction({action:`${Constants.STORE_NAME}/changeBillDate`});
    },
    save(){
       this.$callAction({action:`${Constants.STORE_NAME}/save`,successText:"保存成功"});
    },
    async del(){
       await this.$confirm("确认删除？");
       this.$callAction({action:`${Constants.STORE_NAME}/delete`,successText:"删除成功",isSuccessBack:true});
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
.rs-listItem{ padding: 8px 15px;}
.rs-list{padding-top:5px;}
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-border{border: 1px solid #58cffa; display: inline-block;}
</style>
