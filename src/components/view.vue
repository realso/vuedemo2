<template >
  <div>
  <slot></slot>
  </div>
</template>
<script>
export default {
  name: "rs-view",
  data() {
    return {destroy:false}
  },
  activated(){
    this.destroy = false;
    console.log("view.activated")
  },
  deactivated(){
    setTimeout(()=>{
          this.destroy = true;
        },300);
    console.log("view.deactivated")
  },
  destroyed(){
     console.log("view.destroyed")
  }
};
</script>

