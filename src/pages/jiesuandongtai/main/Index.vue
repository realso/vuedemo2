<template>
  <div style="height:100%">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import store from "./store";
import { debug } from "util";
export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  activated: function() {
    console.log(this.$route.path, "color:red");
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
<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>


