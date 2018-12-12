<template>
  <div style="height:100%;width:100%" >
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "rs-views",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  activated(){
  },
  watch: {
    $route(to, from) {
      let isBack = false;
      if (to.meta.time&&to.meta.time < from.meta.time) {
        isBack = true;
      }
      if (isBack) {
        //顶级触发
        if (this.$parent.$parent == this.$root) {
          if (
            to.matched[0].instances.default == from.matched[0].instances.default
          ) {
            return;
          }
        } else {
          //如果子类中触发
          if (
            this.$parent !== to.matched[0].instances.default &&
            to.matched[0].instances.default
          ) {
            return;
          }
        }
        this.transitionName = "slide-right";
        to.meta.time = new Date().getTime();
        from.meta.time = 0;
        setTimeout(()=>{
          if(to.matched[0].instances.default!=from.matched[0].instances.default)
            from.matched[0].instances.default.destroy=true;
        },600);
      } else {
        to.meta.time = new Date().getTime();
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
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


