<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
          <router-link to="/" slot="left" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
          <div slot="right">
            <rs-button link @click="save">保存</rs-button>
          </div>
        </rs-header>
        <div class="mui-content">
          <rs-list class="rr-line-24" size="15" noborder>
            <rs-list-item noborder isright>
              <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">门 店</span>
                <span>：</span>
                <div class="rs-flex-item rr-line-b">
                    <span class="rr-right mr15">张三</span>
                    0001 小木签店
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
          </rs-list>           
          <rs-button @click.native="linkUrl(szxm)">设置项目</rs-button>
          <div class="rr-title">
            <span class="rr-right">{{parseFloat(tangshi).toFixed(2)}}</span>
            <span class="rr-font rr-list-style f12 c-active"></span> 堂食
          </div>
          <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">现金卡值</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' size='14' :value.sync='xjkz' :text.sync="Rxjkz" v-on:text1="text1"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">微信</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync='wx' size='14' :text.sync="Rwx" v-on:text1="text2"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">支付宝</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync='zfb' size='14' :text.sync="Rzfb" v-on:text1="text3"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">老系统</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync='lxt' size='14' :text.sync="Rlxt" v-on:text1="text4"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">堂食退款</div>
                <rs-numInput class="rs-flex-item rr-line-b c-icon-red" height='24' :value.sync='tstk' size='14' :text.sync="Rtstk" v-on:text1="text5"></rs-numInput>
              </div>
            </rs-list-item>
           </rs-list>
           <div class="rr-title">
            <span class="rr-right">{{parseFloat(elm).toFixed(2)}}</span>
            <span class="rr-font rr-list-style f12 c-active"></span> 饿了么
          </div>
          <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">e在线支付</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync='ezxzf' size='14' :text.sync="Rezxzf" v-on:text1="text6"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">e手续费</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync='esxf' size='14' :text.sync="Resxf" v-on:text1="text7"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">e承担补贴</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync="ecdbt" size='14' :text.sync="Recdbt" v-on:text1="text8"></rs-numInput>
              </div>
            </rs-list-item>
          </rs-list> 
          <div class="rr-title">
            <span class="rr-right">{{parseFloat(meituan).toFixed(2)}}</span>
            <span class="rr-font rr-list-style f12 c-active"></span> 美团
          </div>
          <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">m在线支付{{mzxzf}}</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync="mzxzf" size='14' :text.sync="Rmzxzf" v-on:text1="text1"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">m手续费</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync="msxf" size='14' :text.sync="Rmsxf" v-on:text1="text1"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">m承担补贴</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync="mcdbt" size='14' :text.sync="Rmcdbt" v-on:text1="text1"></rs-numInput>
              </div>
            </rs-list-item>
           </rs-list> 
           <div class="rr-title">
            <span class="c-icon-gray">合计</span> 
           </div>
           <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">合计收入</div>
                <div class="rs-flex-item rr-line-b rr-text-right">{{parseFloat(hjsr).toFixed(2)}}</div>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">填报收入</div>
                <rs-numInput class="rs-flex-item rr-line-b" height='24' :value.sync="tbsr" size='14' :text.sync="Rtbsr" v-on:text1="text1"></rs-numInput>
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">差异</div>
                <div class="rs-flex-item rr-line-b rr-text-right">{{parseFloat(cy).toFixed(2)}}</div>
              </div>
            </rs-list-item>
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
import {mapGetters} from "../store"
export default {
  props:{
     TITLE:""
  },
  name: "jiesuan",
  data() {
    return {
      ISINPUTSHOW: false,
      xjkz: 100,
      Rxjkz: '100.00',
      wx: 100, 
      Rwx: '100.00',
      zfb: 100,
      Rzfb: '100.00',
      lxt: 100, 
      Rlxt: '100.00', 
      tstk: -3,
      Rtstk: '-3.00',
      ezxzf: 100,
      Rezxzf: '100.00',
      esxf: 100,
      Resxf: '100.00',
      ecdbt: 100,
      Recdbt: '100.00',
      mzxzf: 100, 
      Rmzxzf: '100.00', 
      msxf: 100,
      Rmsxf: '100.00',
      mcdbt: 100,
      Rmcdbt: '100.00',  
      hjsr: 100,
      tbsr: 100,
      Rtbsr: '100.00',
      cy: 0,
      tangshi:127,
      elm: 127,
      meituan: 127
    };
  },
  computed: {
      ...mapGetters("main",['BILLCODE','MKEMPID.EMPNAME',"SNODEID.SNODENAME","CONTENT"]),
      ...mapGetters("dts",[]),
      ISSHOWWD:function(){
          return this["EMPID"]!="";
      }
  },
  methods: {
    text1(val) {
      this.Rxjkz=parseFloat(val).toFixed(2)
    },
    text2(val) {
      this.Rwx=parseFloat(val).toFixed(2)
    },
    text3(val) {
      this.Rzfb=parseFloat(val).toFixed(2)
    },
    text4(val) {
      this.RxRlxtjkz=parseFloat(val).toFixed(2)
    },
    text5(val) {
      this.Rtstk=parseFloat(val).toFixed(2)
    },
    text6(val) {
      this.Rezxzf=parseFloat(val).toFixed(2)
    },
    text7(val) {
      this.Resxf=parseFloat(val).toFixed(2)
    },
    text8(val) {
      this.Recdbt=parseFloat(val).toFixed(2)
    },
    text9(val) {
      this.Rmzxzf=parseFloat(val).toFixed(2)
    },
    text10(val) {
      this.Rmsxf=parseFloat(val).toFixed(2)
    },
    text11(val) {
      this.Rmcdbt=parseFloat(val).toFixed(2)
    },
    text12(val) {
      this.Rtbsr=parseFloat(val).toFixed(2)
    },
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

