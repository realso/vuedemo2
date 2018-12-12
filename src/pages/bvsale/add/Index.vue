<script>
import Page from "@/components/page.vue";
import { mapDateTable, Constants } from "./store";
export default {
  extends: Page,
  activated: function() {
    console.log("activated-add")
    this.$store.commit(`${Constants.STORE_NAME}/setParams`, this.$route.query);
    if ("ADD" == this.$route.query.ACTION) {
      this.$callAction({
        action: `${Constants.STORE_NAME}/add`,
        param: this.$route.query,
        isErrorBack: true,
        timeOut: 600
      });
    } else if ("VIEW" == this.$route.query.ACTION) {
      this.$callAction({
        action: `${Constants.STORE_NAME}/open`,
        param: this.$route.query.DID,
        isErrorBack: true,
        timeOut: 600
      });
    } else {
      this.$alert("参数不合法！");
      this.$router.goBack(true);
    }
  }
};
</script>


