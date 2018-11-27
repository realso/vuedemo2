<template>
    <rs-list-item noborder v-if="ISSHOW==1">
        <div v-if="STLITEMID_GRPID == ITEMID" class="rr-title">
            <span class="rr-right">{{AMT |toFixed(2)}}</span>
            <span class="rr-font rr-list-style f12 c-active"></span> {{ITEMID_PARANAME}}
        </div>
        <div v-else class="rs-flex-row">
            <div class="rr-width-5em">{{ITEMID_PARANAME}}</div>
            <rs-numInput class="rs-flex-item rr-line-b" height='24' size='14' v-model.lazy='AMT' :text="AMT|toFixed(2)"></rs-numInput>
        </div>
    </rs-list-item>
</template>
<script>
import { mapDateTable } from "../../store";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapDateTable("DTS", [
        "ITEMID",
        "STLITEMID_GRPID",
        "AMT",
        "STLITEMID_PARANAME",
        "ITEMID_PARANAME",
        "ISSHOW",
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

