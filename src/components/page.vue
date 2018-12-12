<template>
  <rs-views  v-if="!destroy"></rs-views>
</template>
<script>
export default {
  data() {
    return {destroy:true}
  },
  activated(){
    this.destroy = false;
    console.log("page.activated"+this.name)
  },
  deactivated(){
      console.log("page.deactivated")
  },
  destroyed(){
    console.log("page.destroyed"+this.name)
  }
};
</script>

