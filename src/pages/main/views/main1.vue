<template>
  <div class="mui-layout mui-layout-bottom">
    <div class="rr-mianBan">
        <div class="rr-mianBan-top">
            <img src="@/assets/logo.jpg">
            <div class="rr-mianBan-title">小昭萌点</div>
        </div>
        <div class="rr-mianBan-bottom rs-display-table">
          <div class="rs-table-cell">
            <div class="f15">345</div>
            <div class="f12">未完成订货单</div>
          </div>
          <div class="rs-table-cell">
            <div class="f15">188元</div>
            <div class="f12">今日结算</div>
          </div>
        </div>
    </div>
    <div class="mui-content">
      <div class="rr-swiper">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(str,index) in listImg" :key="index">
                  <div class="rr-swiper-title" data-swiper-parallax="-100">{{str.title}}</div>
                  <div class="rr-swiper-text" data-swiper-parallax="-200">{{str.text}}</div>
                  <div class="rr-swiper-img" :style="{backgroundImage:'url('+str.url+')'}"></div>
                </div>
            </div>
            <div class="swiper-pagination" v-show="listImg.length>1"></div>
        </div>
      </div>
      <rs-grid border=false type="white">
        <rs-grid-item v-for="item in navs" :key="item.id" @click.native="NavClick(item.path)">
            <span slot="icon" class="f24" :class="item.icon"></span>
            <span class="f12">{{item.name}}</span>
        </rs-grid-item>
      </rs-grid>
    </div>  
   </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import navs from '../nav.json'

export default {
  name: "main1",
  data () {
    return {
      navs: [],
      listImg: [
        {
          url: require("@/assets/img/shuijiao.jpg"),
          title: '第一个标题',
          text: '第一个推送的内容'
        },
        {
          url: require("@/assets/img/yuantiao.jpg"),
          title: '第二个标题',
          text: '第二个推送的内容'
        }
      ]
    }
  },
  created() {
	this.navs = navs
  },
  methods: {
    NavClick: function(path){
      this.$router.push({path:path});
    }
  },
  mounted() {
    var option;
    if (this.listImg.length > 1) {
        option = {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 3000,
            speed: 600,
            parallax: true,
            onTouchEnd: function() {
              swiper.startAutoplay()
            }
        }
    } else {
        option = {
        pagination: '.swiper-pagination'
        }   
    }
    var swiper = new Swiper('.swiper-container', option);  
  }
}
</script>
<style lang="postcss">
   @component-namespace rr {
    @component mianBan {
        background: #2b8daa;
        color: #fff;
        padding: 35px 0 10px 0;
        text-align: center;
      @descendent top { 
        img{width:70px;height:70px; border-radius: 100%;display: block; margin: 0 auto;}
      }
      @descendent title {
        font-size: 15px;
        margin-top: 10px;
      }
      @descendent bottom {
        margin-top: 20px;
        .rs-table-cell{width:50%}
      }
    }
    @component swiper {
       width: 100%; 
       height: 180px;
       background: #fff;
       padding: 0 5px;
       @descendent title {
        line-height: 24px;
        height: 24px;
        overflow: hidden;
        font-size: 14px;
       }
       @descendent text {
        line-height: 16px;
        height: 16px;
        overflow: hidden;
        font-size: 12px;
       }
       @descendent img {
        display: block;
        height: 140px;
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
    }
   }
   
</style>
<style>
.swiper-container {width: 100%;height: 100%;}
.swiper-container .swiper-pagination-bullet{background: #fff;}
.swiper-container .swiper-pagination-bullet-active {background: #d1a185;}  
</style>
