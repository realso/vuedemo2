<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="Title" color="primary">
      <a slot="left" class="mui-icon mui-icon-left-nav mui-pull-left" @click="$router.goBack()"></a>
    </rs-header>
    <div class="mui-content ">
      <div class="mui-content-padded">
        <div class="rr-article-header">
          <div class="rr-article-title">大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你 </div>
          <div class="rr-article-subtitle">杜阿姨<span class="c-999 ml5">2018-12-01</span></div>
        </div>
        <div class="rr-article-content">
          <video-player  class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
          ></video-player>
          <!-- <div class="rr-article-player">
            <video-player  
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
            >
            </video-player>
          </div> -->
          <p class="f12">
            大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你大事件！ [ 万中选一，你就是超级锦鲤 ] 杜阿姨门店助理要挑选的就是你
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
export default {
  name: "zhishiku",
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
        }],
        poster: require("@/assets/img/shuijiao.jpg"), //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }
    }
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
