<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" class="mui-icon mui-icon-left-nav mui-pull-left" @click="$router.goBack()"></a>
    </rs-header>
    <div class="mui-content ">
      <div class="mui-content-padded">
        <div class="rr-article-header">
          <div class="rr-article-title">大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你 </div>
          <div class="rr-article-subtitle">杜阿姨<span class="c-999 ml5">2018-12-01</span></div>
        </div>
        <div class="rr-article-content">
          <video style="width:100%" 
          src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' 
          webkit-playsinline='false' playsinline='false' x5-playsinline="false" x-webkit-airplay='allow' 
          controls
          autoplay>视频无法播放</video>
          <p class="f12">
            大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zhishiku",
  data () {
    return {
      TITLE: this.$route.query.TITLE
    }
  },
  methods: {
  }
};
</script>
<style lang="postcss">
 @component-namespace rr {
  @component article {
    @descendent title {
      font-size: 18px;
      line-height: 1.4;
    }
    @descendent subtitle {
      font-size: 14px;
      margin-top:10px;
    }
  }
 }    
</style>
