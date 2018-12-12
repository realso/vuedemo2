<template>
  <rs-views></rs-views>
</template>
<script>
import store from "./store";
export default {
  data() {},
  activated: function() {
    console.log(this.$route.path, "color:red");
    setTimeout(async () => {
      this.$store.commit("jiesuanribao/setParams", this.$route.query);
      if ("ADD" == this.$route.query.ACTION) {
        
      }
      if ("VIEW" == this.$route.query.ACTION) {
        this.$store.commit("jiesuanribao/addDefault");
        this.$store.dispatch("jiesuanribao/openReport", this.$route.query);
      }
    }, 600);
  }
};
</script>
