<template>
  <div style="height:100%">
    <transition :name="transitionName">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapDateTable, Constants} from "./store";
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
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
    if ("VIEW" == this.$route.query.ACTION) {
      this.$callAction({
        action: `${Constants.STORE_NAME}/open`,
        param: this.$route.query.DID,
        isErrorBack: true,
        timeOut: 600
      });
    }
  },
  deactivated() {
    this.$destroy();
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
    next();
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
  transform: translate3d(-100%, 0, 0);
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


