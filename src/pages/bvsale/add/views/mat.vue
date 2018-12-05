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
        <rs-list-item>
           新加坡抛饼(88888)
        </rs-list-item>
        <rs-list-item>
          <div class="rs-flex-row">
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">规 格</span>
              <span>：</span>
                110g*5*20
            </div>
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">单 位</span>
              <span>：</span>
                袋
            </div>
          </div>
        </rs-list-item>
        <rs-list-item>
          <div class="rs-flex-row">
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">单 价</span>
              <span>：</span>
                15.00
            </div>
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">最 小 订 货</span>
              <span>：</span>
                1
            </div>
          </div>
        </rs-list-item>
        <rs-list-item>
          <span class="rr-justify rr-width-4em">数 量</span>
          <span>：</span>
          <input class="rr-width-5em rr-border rr-text-center" v-model="QTY"/>
        </rs-list-item>
        <rs-list-item>
            <span class="rr-justify rr-width-4em">金 额</span>
            <span>：</span>
            30.00
        </rs-list-item>
      </rs-list>      
    </div>
  </div>
</template>
<script>
import {mapGetters,mapDateTable,Constants} from "../store"
import { getWeek } from "rs-vcore/utils/Date";
export default {
  name: "bvsale_mat",
  props:{
    TITLE:''
  },
  data() {
    return {
        item:this.$route.params.item
    };
  },
  computed: {
      ...mapGetters(["SELECTEDTAB"]),
      ...mapDateTable("DTS",["MID.MNAME","MID.MCODE","MID.SIZETYPE","AMT","QTY"],"item")
  },
  methods: {
    up(){
        let item = this.$store.dispatch(`${Constants.STORE_NAME}/upMat`,item);
        if(!item){
            this.$toast("没有了");
        }else{
            this.item = item;
        }
    },
    down(){
        let item = this.$store.dispatch(`${Constants.STORE_NAME}/downMat`,item);
        if(!item){
            this.$toast("没有了");
        }else{
            this.item = item;
        }
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
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-border{border: 1px solid #58cffa; display: inline-block;}
</style>
