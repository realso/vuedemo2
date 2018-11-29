<template>
  <div id="app">
    <div style="height:100%">
      <transition :name="transitionName">
        <keep-alive>
          <router-view>
          </router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      transitionName:"slide-left"
    };
  },
  watch: {
    $route(to, from) {
       let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
    }
  }
};
</script>
<style>
#app{
  height: 100%
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>
