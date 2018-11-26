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
import { mapGetters } from "../../store";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters("DTS", [
        "ITEMID",
        "STLITEMID_GRPID",
        "AMT",
        "STLITEMID_PARANAME",
        "ITEMID_PARANAME",
        "ISSHOW"
      ],"item")
  },
  watch:{
      "AMT":function(){
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

