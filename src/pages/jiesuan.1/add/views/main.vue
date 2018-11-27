<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
          <router-link to="/" slot="left" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
          <div slot="right">
            <rs-button v-if="ISSHOWSAVE" link @click="save">保存</rs-button>
          </div>
        </rs-header>
        <div class="mui-content">
          <rs-list class="rr-line-24" size="15" noborder>
            <rs-list-item noborder isright  @click.native="linkUrl('snodesel')">
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">经营门店</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    {{this["DSNODEID.SNODECODE"]}} {{this["DSNODEID.SNODENAME"]}}
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder isright  @click.native="linkUrl('empsel')">
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">店长</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    {{MANAGER}} 
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder isright>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">日 期</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    2018-11-19 周一
                </div>
              </div>
            </rs-list-item>
            <rs-list-item noborder isright>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">时 段</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    2018-11-19 周一
                </div>
              </div>
            </rs-list-item>
          <rs-button @click.native="linkUrl('set')">设置项目</rs-button>
             <main_dts v-for="(item) in DTS"   :item="item" :key="item.ENTRYID"/>
           </rs-list> 
           <div class="rr-list-textarea">
            <textarea rows="3" placeholder="说明"></textarea>
           </div>
           <div class="rr-bill-top">
              <div class="rs-flex-row" style="height:33px">
                  <span class="rr-justify rr-width-4em">制 单</span>
                  <span>：</span>
                  <div class="rs-flex-item">
                      0001 小木签店
                  </div>
              </div>
              <div class="rs-flex-row" style="height:33px;">
                  <span class="rr-justify rr-width-4em">审 核</span>
                  <span>：</span>
                  <div class="rs-flex-item">
                      2018-11-19 周一
                  </div>
              </div>
          </div>
        </div> 
    </div>
</template>
<script>
import {mapGetters,mapDateTable} from "../store"
import main_dts from "./components/main_dts";
export default {
  props:{
     TITLE:""
  },
  name: "jiesuan",
  data() {
    return {
      ISINPUTSHOW: false
    };
  },
  components:{
    main_dts
  }
  ,
  computed: {
      ...mapGetters(["ISSHOWSAVE"]),
      ...mapDateTable("MAIN",['BILLCODE','DSNODEID.SNODECODE',"DSNODEID.SNODENAME","MANAGER"]),
      ...mapDateTable("DTS",[]),
      ISSHOWWD:function(){
          return this["EMPID"]!="";
      }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/jiesuan1/add/"+url});
    },
    save:function(){
       this.$store.dispatch("jiesuan/save");
    }
  },
  activated: function() {
      console.log("%c"+this.$route.path,"color:red");
  }
};
</script>
<style scoped>
.rr-title{ padding: 5px 15px; font-size: 15px; border-bottom: 1px solid #bbb; background: #fff; margin-top: 5px;}
.rr-list-input{ text-align: right;}
.rs-listItem{ padding: 8px 15px;}
.rs-list{padding-top:5px;}
.rr-list-textarea{padding: 5px 15px; background: #fff;}
.rr-list-textarea textarea{font-size: 15px; margin-bottom: 0;}
.rr-line-24,.rr-line-24 .rr-justify{line-height: 24px;}
.rr-line-24 .rr-justify{height:24px;}
.rs-numInput-input{position: absolute; top: 0; width: 100%; border: none; height: 100%; padding: 0; text-align: right; font-size: 14px;margin: 0;}
.rr-opacity{opacity: 0;}
</style>

