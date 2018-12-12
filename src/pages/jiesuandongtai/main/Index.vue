<template>
  <rs-views></rs-views>
</template>
<script>
import store from "./store";
export default {
  data() {},
  activated: function() {
    setTimeout(async () => {
      this.$store.commit("jiesuandongtai/setParams", this.$route.query);
      if ("ADD" == this.$route.query.ACTION) {
        
      }
      if ("VIEW" == this.$route.query.ACTION) {
        this.$store.commit("jiesuandongtai/addDefault");
        this.$store.dispatch("jiesuandongtai/openReport", this.$route.query);
      }
    }, 600);
  }
};
</script>
