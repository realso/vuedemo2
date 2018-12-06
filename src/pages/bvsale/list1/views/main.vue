<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>  
    <rs-list class="rr-line-24 mb10" size="15" noborder>
      <rs-list-item noborder isright @click.native="open('picker2')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">开 始 日 期</span>
          <span>：</span>
          <div class="rs-flex-item rr-line-b">
              {{SDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder isright @click.native="open('picker3')">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em">结 束 日 期</span>
          <span>：</span>
          <div class="rs-flex-item rr-line-b">
              {{EDATE|getWeek}}
          </div>
        </div>
      </rs-list-item>
      <rs-list-item noborder style="margin-top:-10px">
        <div class="rs-flex-row">
          <span class="rr-justify rr-width-4em mt10">网 点 编 号</span>
          <span class="mt10">：</span>
          <div class="rs-flex-item rr-line-b">
            <input type="text" class="rr-input-w100 mt10" v-model="wdbh"/>
          </div>
          <rs-button size="small" style="position:ab">查询</rs-button>
        </div>
      </rs-list-item>
    </rs-list> 
    <rs-datetime
      key="bvsale.2"
      ref="picker2"
      type="date"
      v-model.lazy="SDATE"
        @confirm="handleChangeD"
      >
    </rs-datetime> 
    <rs-datetime
      key="bvsale.3"
      ref="picker3"
      type="date"
      v-model.lazy="EDATE"
        @confirm="handleChangeD"
      >
    </rs-datetime> 
    <rs-navbar v-model="SELECTED">
      <rs-nav-item id="1">
        全部
      </rs-nav-item>
      <rs-nav-item id="2">
        营业未定
      </rs-nav-item>
    </rs-navbar>
    <div class="mui-content"> 
      <rs-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
        <rs-list class="rr-line-24 rr-list-rili" size="14" noborder>
          <rs-list-item @click.native="linkMat(item)">
            <div class="rs-flex-row">
              <div class="rr-media-rili">
                <h3>19</h3>
                <div>1月</div>
              </div>
              <div class="rs-flex-item f17">
                  <span class="rr-right f14 c-icon-red">营业未定</span>
                  60608
                <div class="mt10 f15">
                  锦江老干部餐厅
                </div>
              </div> 
            </div> 
          </rs-list-item>
        </rs-list>  
        <div v-if="allLoaded" class="rs-list-nodata">
          <span>没有数据啦</span>
        </div>
      </rs-loadmore>
    </div>
  </div>
</template>
<script>
import db from "@/api/db";
export default {
  name: "list",
  props: {
    TITLE: { type: String }
  },
  data() {
    return {
      list: [],
      SELECTED: '1',
      topStatus: "",
      allLoaded: false,
      searchInput: "",
    };
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD:function(){
      this.$callAction({action:`${Constants.STORE_NAME}/changeBillDate`});
    },
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
  }
};
</script>
<style scoped>
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rr-media-rili{ min-width: 60px; margin-right: 10px; text-align: center; color: #fff; border-radius: 5px;}
.rr-media-rili h3{ margin-bottom: 0;}
.rr-media-rili p{ color: #fff;}
.rr-list-rili li:nth-child(2n) .rr-media-rili{ background: #58cffa;}
.rr-list-rili li:nth-child(2n-1) .rr-media-rili{ background: #26cce2;}
.rr-input-w100{width: 100%; display: block; height: 24px; line-height: 24px; border: none; margin-bottom: 0}
.rs-btn{padding: 0 10px;}
</style>

