<template>
  <div class="mui-layout mui-layout-top">
    <rs-header title="提示" color="primary">
      <a slot="left" class="mui-icon mui-icon-left-nav mui-pull-left" @click="$router.goBack()"></a>
    </rs-header>
    <div class="mui-content rr-text-center">
      <img src="@/assets/img/T404.png" alt=""  class="rr-img-404"/>
      <rs-button @click.native="$router.goBack()">点击返回</rs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "404"
};
</script>
<style>
.rr-img-404{width: 48%; margin: 40px auto 0 auto; display: block}
</style>
