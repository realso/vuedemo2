<template>
  <rs-list-item 
    v-if="ISSHOW==1&&STLITEMID_ISLBSHOW==1&&ITEMID_PARANAME!='实际收入'&&ITEMID_PARANAME!='线上'&&ITEMID_PARANAME!='线下'&&ITEMID_PARANAME!='差异'" 
    noborder :class="{'rr-border':STLITEMID_LBUNDERLINE=='LongBlack'}">
    <div class="rs-flex-row" style="min-height:24px;">
      <div v-if="STLITEMID_ISLBSHOW==1" class="rr-width-5em" 
      :style="{'color':STLITEMID_LBCOLOR}"
      :class="{'rr-weight':STLITEMID_ISLBB==1}">
        {{ITEMID_PARANAME}}
      </div>
      <div class="rs-flex-item rr-text-right" :class="{'rr-line-b1':STLITEMID_LBUNDERLINE=='ShortGrey'}" 
      :style="{'color':parseFloat(AMT)>0?STLITEMID_PNCOLOR:(parseFloat(AMT)<0?STLITEMID_NNCOLOR:STLITEMID_ZEROCOLOR)}">
        <div v-if="DEALTYPE=='Count'">{{AMT |toFixed(2)}}</div>
        <rs-numInput v-if="DEALTYPE=='Write'"  class="rs-flex-item" height='24' size='14' v-model.lazy='AMT' :text="AMT|toFixed(2)"></rs-numInput>
      </div>
    </div>
  </rs-list-item>
</template>
<script>
import { mapDateTable } from "../../store";
export default {
  props: {
    item: Object
  },
  computed: {
    ...mapDateTable("DTS", [
        "ITEMID",
        "STLITEMID_GRPID",
        "AMT",
        "STLITEMID_PARANAME",
        "ITEMID_PARANAME",
        "ISSHOW",
        "DEALTYPE",
        "STLITEMID_ISLBSHOW",//标签显示(否)
        "STLITEMID_ISLBB",//标签加粗(否)
        "STLITEMID_LBCOLOR",//标签颜色
        "STLITEMID_LBUNDERLINE",//下划线
        "STLITEMID_PNCOLOR",//正颜色
        "STLITEMID_ZEROCOLOR",//0颜色
        "STLITEMID_NNCOLOR",//负颜色
    
        "STLITEMID_ISPN",//可正数(否)
        "STLITEMID_ISZERO",//可0(否)
        "STLITEMID_ISNULLF",//可空(否)
        "STLITEMID_ISNN",//可负数(否)
      ],"item")
  },
  watch:{
      "AMT":function(){
          this.$store.commit("jiesuan/checkRange",{item:this.item});
          this.$store.commit("jiesuan/setAMT");
      }
  },
  filters: {
    toFixed(value, cm) {
      if(value=="0"||value!=""){
          return parseFloat(value || 0).toFixed(cm);
      }
    }
  }
};
</script>
<style scoped>
/* .rs-listItem{min-height: 32px;} */
.rs-listItem.rr-border{position: relative}
.rs-listItem .rr-line-b1:after{position: absolute;content: ""; height: 1px; bottom: 0;left: 5em; margin-left: 15px; right: 15px; background: #c8c7cc;transform: scaleY(.5);}
.rs-listItem.rr-border:after{position: absolute;content: ""; height: 1px; bottom: 0;left: 15px; right: 15px; background: #000}
.rr-weight{font-weight: bold;}
/* .rs-listItem{ padding: 8px 15px 7px 15px;} */
.rs-numInput-input{position: absolute; top: 0; width: 100%; border: none; height: 100%; padding: 0; text-align: right; font-size: 14px;margin: 0;}
</style>
