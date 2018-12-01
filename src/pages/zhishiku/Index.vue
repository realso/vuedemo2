<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="Title" color="primary">
      <a slot="left" class="mui-icon mui-icon-left-nav mui-pull-left" @click="$router.goBack()"></a>
    </rs-header>
    <div class="mui-content">
      <div class="rr-article-header">
        <div class="rr-article-title">大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你 </div>
        <div class="rr-article-subtitle">杜阿姨<span class="c-999">2018-12-01</span></div>
      </div>
      <div class="rr-article-content">
        <div class="rr-article-video">
          <video></video>
        </div>
        <div class="rr-article-text">
           大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "404"
};
</script>
<style lang="postcss">
 @component-namespace rr-article {
  @component article {
    @descendent title {
      font-size: 18px;
      
    }
    @descendent subtitle {
      font-size: 14px;
      
    }
  }
 }    
</style>
