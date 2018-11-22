<template>
  <div class="mui-layout mui-layout-bottom">
    <div class="rr-mianBan" :style="mianBanBk">
      <div class="rr-mianBan-body">
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
    </div>
    <div class="mui-content">
      <div class="rr-swiper">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(str,index) in listImg" :key="index">
                  <div class="rr-swiper-text" data-swiper-parallax="-100">
                    {{str.title}}
                  </div>
                  <div class="rr-swiper-img" :style="{backgroundImage:'url('+str.url+')'}"></div>
                </div>
            </div>
            <div class="swiper-pagination" v-show="listImg.length>1"></div>
        </div>
      </div>
      <rs-grid border>
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

const url = require("@/assets/img/bk-1.jpg");
export default {
  name: "main1",
  data () {
    return {
      navs: [],
      listImg: [
        {
          url: require("@/assets/img/shuijiao.jpg"),
          title: '第一个标题'
        },
        {
          url: require("@/assets/img/yuantiao.jpg"),
          title: '第二个标题'
        },
        {
          url: require("@/assets/img/yuantiao.jpg"),
          title: '第二个标题'
        }
      ],
      mianBanBk:{
        backgroundImage: "url(" + url + ")"
      }
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
            slidesPerView: 'auto',
            spaceBetween: 20,
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
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 100px 0 0 0;        
        margin-bottom: 17px;
      @descendent body {
        position: relative;
        margin-right: 15px;
        margin-left: 15px;
        background: #fff;
        bottom: -17px; 
        border-radius: 5px;
        padding: 10px;
      }  
      @descendent top { 
        padding-left:15px;
        img{width:60px;height:60px; border-radius: 100%; float: left;}
      }
      @descendent title {
        font-size: 15px;
        line-height: 60px;
      }
      @descendent bottom {
        padding-top: 10px;
        text-align: center;
        .rs-table-cell{
          width:50%;
          position: relative;
          border-right: 1px solid #eee;
          &:last-child{
            border-right: none;
          }
        }
      }
    }
    @component swiper {
       margin: 15px;
       @descendent text {
        line-height: 24px;
        height: 24px;
        overflow: hidden;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        background: rgba(0,0,0,0.3);
        border-radius:0 0 10px 10px;
       }
       @descendent img {
        display: block;
        height: 110px;
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% auto;
        border-radius: 10px;
      }
    }
   }
   
</style>
<style>
.swiper-container {width: 100%;height: 100%;}
.rs-grid{ background: none !important;}
.swiper-slide {
      text-align: center;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      width: 60%;
    }
</style>
