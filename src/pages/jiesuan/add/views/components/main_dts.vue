<template>
  <div v-if="ISSHOW==1&&STLITEMID_ISLBSHOW==1">
    <rs-list size="14" noborder>
      <rs-list-item noborder :class="{'rr-border':STLITEMID_LBUNDERLINE=='LongBlack'}">
        <div class="rs-flex-row">
          <div class="rr-width-5em" 
          :style="{'color':STLITEMID_LBCOLOR}"
          :class="{'rr-weight':STLITEMID_ISLBB==1}">
            {{ITEMID_PARANAME}}
          </div>
          <div class="rs-flex-item rr-text-right" :class="{'rr-line-b':STLITEMID_LBUNDERLINE=='ShortGrey'}" 
          :style="{'color':parseFloat(AMT)>0?STLITEMID_PNCOLOR:(parseFloat(AMT)<0?STLITEMID_NNCOLOR:STLITEMID_ZEROCOLOR)}">
            <div v-if="DEALTYPE=='Count'">{{AMT |toFixed(2)}}</div>
            <rs-numInput v-if="DEALTYPE=='Write'" :style="ValueColor" class="rs-flex-item" height='24' size='14' v-model.lazy='AMT' :text="AMT|toFixed(2)"></rs-numInput>
          </div>
        </div>
      </rs-list-item>
    </rs-list>
  </div>  
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
<<<<<<< HEAD
  watch:{
      "AMT":function(){
          this.$store.commit("jiesuan/checkRange",
                {
                    AMT:this.AMT,
                    STLITEMID_ISPN:this.STLITEMID_ISPN,
                    STLITEMID_ISZERO:this.STLITEMID_ISZERO,
                    STLITEMID_ISNULLF:this.STLITEMID_ISNULLF,
                    STLITEMID_ISNN:this.STLITEMID_ISNN,
                    idx:this.item
                });
          this.$store.commit("jiesuan/setAMT");
      }
=======
  watch: {
    "AMT":function(){
      this.$store.commit("jiesuan/setAMT");
    }
>>>>>>> 0e385c77bcea80f9141c771c07c63564050b72c6
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
.rs-list{padding-top: 5px;}
.rs-listItem.rr-border{border-bottom: 1px solid #aaa; }
.rr-weight{font-weight: 600;}
.rs-listItem{ padding: 8px 15px 7px 15px;}
.rs-numInput-input{position: absolute; top: 0; width: 100%; border: none; height: 100%; padding: 0; text-align: right; font-size: 14px;margin: 0;}
</style>
