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
import store from "./store";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  methods: {
    enter() {
      console.log("methods", "color:red");
    }
  },
  activated: function() {
    console.log(this.$route.path, "color:red");
    setTimeout(async () => {
      this.$store.commit("jiesuan/setParams", this.$route.query);
      $app.$indicator.open("");
      if ("ADD" == this.$route.query.ACTION) {
        this.$store
          .dispatch("jiesuan/add", this.$route.query)
          .then(() => {
            $app.$indicator.close();
          })
          .catch(e => {
            this.$indicator.close();
            this.$toast({
              message: "加载失败",
              position: "bottom"
            });
            this.$router.goBack();
          });
      }
      if ("VIEW" == this.$route.query.ACTION) {
        this.$store.dispatch("jiesuan/open", this.$route.query);
      }
    }, 600);
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


