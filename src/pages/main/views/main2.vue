<template>
  <div class="mui-layout mui-layout-bottomtop">
    <rs-header title="知识库"></rs-header>
    <rs-navbar v-model="selected">
      <rs-nav-item id="全部">
        全部
      </rs-nav-item>
      <rs-nav-item id="我的收藏">
        我的收藏
      </rs-nav-item>
    </rs-navbar>
    <div class="mui-content">
      <rs-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
        <rs-card type="header" v-for="(item,index) in list" :key="index" @click.native="linkUrl(item.path,item.title)">
          <div slot="header">
            <div class="f14">{{item.title}}</div>
            <div class="f12 c-999">{{item.text}}</div>
          </div>
          <div slot="content" class="rs-flex-row">
            <div v-for="(item1,index) in item.list" :key="index" class="rs-flex-item"><img class="rr-img-block" style="padding: 0 2px" :src="item1.src"></div>
          </div>
        </rs-card>
        <div v-if="allLoaded" class="rs-list-nodata">
          <span>没有数据啦</span>
        </div>
      </rs-loadmore>
    </div>
   </div>
</template>
<script>
import db from "@/api/db";
import { setTimeout } from 'timers';
export default {
    name:"main2",
    data () {
      return {
        selected: '全部',
        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0, 
        list: [
          {
            path: '/zhishiku',
            title: '第一个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: [
              {src: require("@/assets/img/yuantiao.jpg")},
              {src: require("@/assets/img/yuantiao.jpg")},
              {src: require("@/assets/img/yuantiao.jpg")}
            ]
          },
          {
            path: '/zhishiku',
            title: '第二个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: [
              {src: require("@/assets/img/yuantiao.jpg")}
            ]
          },
          {
            path: '/zhishiku',
            title: '第二个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: []
          }
        ]
      }
    },
    methods: {
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          this.doQuery()
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          let lastValue = this.list[this.list.length - 1];
          let item = {
            path: '/zhishiku',
            title: '第一个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: [
              {src: require("@/assets/img/yuantiao.jpg")},
              {src: require("@/assets/img/yuantiao.jpg")},
              {src: require("@/assets/img/yuantiao.jpg")}
            ]
          }
          if (this.list.length < 20) {
            this.list.push(item);
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
      linkUrl: function(path,title) {
        this.$router.push({path:path,query:{TITLE:title}})
      },
      doQuery: function(){
        let list=[
          {
            path: '/zhishiku',
            title: '第一个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: [
              {src: require("@/assets/img/yuantiao.jpg")},
              {src: require("@/assets/img/yuantiao.jpg")},
              {src: require("@/assets/img/yuantiao.jpg")}
            ]
          },
          {
            path: '/zhishiku',
            title: '第二个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: [
              {src: require("@/assets/img/yuantiao.jpg")}
            ]
          },
          {
            path: '/zhishiku',
            title: '第二个标题',
            text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            list: []
          }
        ]
        this.list.push(list);
      }
    },
    watch:{
      selected(newValue,oldValue){
        this.doQuery();
      }
    },
    activated: function() {
      setTimeout(()=>{
        this.doQuery();
      },600); 
    }
}
</script>
<style>
.rs-card-header:after{display: none}
.rs-card .rs-card-content-inner{padding-top: 0}
</style>
