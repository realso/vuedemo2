<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
        <router-link to="/" slot="left" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <div slot="right">
            <rs-button link=true @click="save">保存</rs-button>
        </div>
        </rs-header>
        <div class="rr-bill-top rr-border-bottom">
            <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">门 店</span>
                <span>：</span>
                <div class="rs-flex-item">
                    <span class="rr-right">张三</span>
                    0001 小木签店
                </div>
            </div>
            <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">日 期</span>
                <span>：</span>
                <div class="rs-flex-item">
                    2018-11-19 周一
                </div>
            </div>
            <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">时 段</span>
                <span>：</span>
                <div class="rs-flex-item">
                    2018-11-19 周一
                </div>
            </div>
        </div>
        <div class="mui-content">
          <div class="rr-title">
            <span class="rr-right">127.00</span>
            <span class="rr-font rr-list-style f12 c-active"></span> 堂食
          </div>
          <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">现金卡值</div>
                <input class="rr-list-input rs-flex-item mui-input" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">微信</div>
                <input class="rr-list-input rs-flex-item mui-input" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">支付宝</div>
                <input class="rr-list-input rs-flex-item mui-input" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">老系统</div>
                <input class="rr-list-input rs-flex-item mui-input" />
              </div>
            </rs-list-item>
           </rs-list>
           <div class="rr-title">
            <span class="rr-right">127.00</span>
            <span class="rr-font rr-list-style f12 c-active"></span> 饿了么
          </div>
          <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">e在线支付</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="ezxzf" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">e手续费</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="esxf" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">e承担补贴</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="ecdbt" />
              </div>
            </rs-list-item>
          </rs-list> 
          <div class="rr-title">
            <span class="rr-right" v-text=meituan></span>
            <span class="rr-font rr-list-style f12 c-active"></span> 美团
          </div>
          <rs-list size="14" noborder>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">m在线支付</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="mzxzf" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">m手续费</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="msxf" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">m承担补贴</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="mcdbt" />
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
                <input class="rr-list-input rs-flex-item mui-input" readonly v-model="hjsr" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">填报收入</div>
                <input class="rr-list-input rs-flex-item mui-input" v-model="tbsr" />
              </div>
            </rs-list-item>
            <rs-list-item noborder>
              <div class="rs-flex-row">
                <div class="rr-width-5em">差异</div>
                <input class="rr-list-input rs-flex-item mui-input" readonly v-model="chayi" />
              </div>
            </rs-list-item>
           </rs-list> 
           <div class="rr-list-textarea">
            <textarea rows="3" placeholder="说明"></textarea>
           </div>
        </div>
        <div class="rr-bill-top rr-bill-small rr-border-top">
            <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">制 单</span>
                <span>：</span>
                <div class="rs-flex-item">
                    0001 小木签店
                </div>
            </div>
            <div class="rs-flex-row">
                <span class="rr-justify rr-width-4em">审 核</span>
                <span>：</span>
                <div class="rs-flex-item">
                    2018-11-19 周一
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
    };
  },
  computed: {
      ...mapGetters("MAIN",['BILLCODE','MKEMPID.EMPNAME',"SNODEID.SNODENAME","CONTENT"]),
      ...mapGetters("DTS",[]),
      ISSHOWWD:function(){
          return this["EMPID"]!="";
      }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/feedback.2/add/"+url,query:{EMPIDX:this.dts.map(function(v){return v["EMPID"]})}});
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
.rr-title{ padding: 5px 15px; font-size: 15px; border-bottom: 1px solid #ccc; background: #fff; margin-top: 5px;}
.rr-list-input{ text-align: right;}
.rs-listItem{ padding: 8px 15px;}
.rs-list{padding-top:5px;}
.rr-list-textarea{padding: 5px 15px; background: #fff;}
.rr-list-textarea textarea{font-size: 15px; margin-bottom: 0;}
.rr-border-bottom{border-bottom: 2px solid #f2f2f2}
.rr-border-top{border-top: 2px solid #f2f2f2}
</style>

