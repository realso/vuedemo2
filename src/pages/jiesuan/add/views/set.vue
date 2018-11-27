<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
        <router-link to="/" slot="left" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <div slot="right">
          <rs-button link @click="save">保存</rs-button>
        </div>
        </rs-header>
        <rs-list size="14" noborder>
          <rs-list-item noborder>
            仅显示选择项
            <div class="mui-switch" :class="{'mui-active': ISXZ}" @click="ISXZ=!ISXZ">
							<div class="mui-switch-handle"></div>
						</div>
          </rs-list-item>
        </rs-list>
        <div class="mui-content">
          <rs-list size="14" noborder>
            <rs-list-item noborder class="mui-checkbox mui-left" @click.native="item.checkXm=!item.checkXm">
              <input name="checkbox" type="checkbox" v-model="checkXm"><span :class="ml5">堂食</span>
            </rs-list-item>
            <rs-list-item noborder class="mui-checkbox mui-left" @click.native="checkbox">
              <input name="checkbox" type="checkbox" v-model="checkXm"><span :class="ml5">堂食1</span>
            </rs-list-item>
            <rs-list-item noborder class="mui-checkbox mui-left" v-for="(item, index) in xms" :key="index" @click.native="item.checkXm=!item.checkXm">
              <input name="checkbox" type="checkbox" v-model="checkXm"><span :class="ml5">{{item.name}}</span>
            </rs-list-item>
          </rs-list> 
        </div> 
    </div>
</template>
<script>
import {mapGetters,mapDateTable} from "../store"

export default {
  props:{
     TITLE:""
  },
  name: "szxm",
  data() {
    return {
      ISXZ: false,
      xms: []
    }
  },
  computed: {
      ...mapDateTable("main",['BILLCODE','MKEMPID.EMPNAME',"SNODEID.SNODENAME","CONTENT"]),
      ...mapDateTable("dts",[]),
      ISSHOWWD:function(){
          return this["EMPID"]!="";
      }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/jiesuan/add/"+url,query:{EMPIDX:this.dts.map(function(v){return v["EMPID"]})}});
    },
    delEmp:function(index){
      this.$store.commit("feedback-add/delEmp",{index});
    },
    save:function(){
       this.$store.dispatch("feedback-add/save");
    }
  },
  activated: function() {
      console.log("%c"+this.$route.path,"color:red");
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  }
};
</script>
<style>
.rs-list .mui-switch{position: absolute; right: 10px;top: 50%; margin-top: -15px;}
.rs-list .mui-left a:not(.mui-btn){padding-left: 58px;}
.mui-checkbox input[type=checkbox]{top: 8px;left: 20px;}
</style>

