<template>
  <div class="mui-layout mui-layout-bottom">
    <div class="rr-mianBan" :style="mianBanBk">
      <div class="rr-mianBan-body">
        <div class="rr-mianBan-top">
            <img src="@/assets/logo.jpg">
            <div class="rr-mianBan-title" v-if="!!$store.getters.userInfo.DSNODENAME">{{$store.getters.userInfo.DSNODENAME}}</div>
            <div class="rr-mianBan-title" v-if="!$store.getters.userInfo.DSNODENAME">未设置当前门店</div>
        </div>
        <div class="rr-mianBan-bottom rs-display-table">
          <div class="rs-table-cell">
            <div class="f15">345元</div>
            <div class="f12">已订货(已汇定)</div>
          </div>
          <div class="rs-table-cell">
            <div class="f15">188元</div>
            <div class="f12">今日结算</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-content">
      <rs-grid type="default">
        <rs-grid-item v-if="!!$store.getters.pcode[item.pcode]" v-for="item in navs" :key="item.id" @click.native="NavClick(item)">
            <span slot="icon" class="f24" :class="item.icon"></span>
            <span class="f12">{{item.name}}</span>
        </rs-grid-item>
      </rs-grid>
    </div>  
   </div>
</template>
<script>
import navs from '../nav.json'

const url = require("@/assets/img/bk-1.jpg");
export default {
  name: "main1",
  data () {
    return {
      navs: [],
      mianBanBk:{
        backgroundImage: "url(" + url + ")"
      }
    }
  },
  created() {
	this.navs = navs
  },
  methods: {
    NavClick: function(item){
      this.$router.push({path:item.path,query:item.query});
    }
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
        margin-bottom: 37px;
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
   }
   
</style>
<style>
.rs-grid{ background: none !important;}
</style>
