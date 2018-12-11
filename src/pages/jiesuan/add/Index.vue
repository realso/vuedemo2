<template>
  <rs-views></rs-views>
</template>
<script>
import {Constants} from "./store";
export default {
  data() {},
  activated: function() {
    this.$store.commit(`${Constants.STORE_NAME}/setParams`, this.$route.query);
    if ("ADD" == this.$route.query.ACTION) {
      this.$callAction({
        action: `${Constants.STORE_NAME}/add`,
        param: this.$route.query,
        isErrorBack: true,
        timeOut: 600
      });
    }
    else if ("VIEW" == this.$route.query.ACTION) {
      this.$callAction({
        action: `${Constants.STORE_NAME}/open`,
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
}
</script>
