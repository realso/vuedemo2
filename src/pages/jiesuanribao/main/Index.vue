<template>
  <rs-views></rs-views>
</template>
<script>
import {Constants} from "./store";
export default {
  data() {return {}},
  activated: function() {
    if ("ADD" == this.$route.query.ACTION) {
      
    }
    else if ("VIEW" == this.$route.query.ACTION) {
      this.$store.commit("jiesuanribao/addDefault");
      this.$callAction({
        action: `${Constants.STORE_NAME}/openReport`,
        param: this.$route.query.DID,
        isErrorBack: true,
        timeOut: 600
      });
    }else{
      this.$alert("参数不合法！");
      this.$router.goBack(true);
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>
