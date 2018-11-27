<template>
    <div class="mui-layout mui-layout-top">
        <rs-header :title="TITLE" color="primary">
        <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
        <div slot="right">
          <rs-button link @click="set">设置</rs-button>
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
            <rs-list-item noborder v-if="!ISXZ||!item.DISABLE" v-for="(item) in SETDTS" :key="item.ITEMID" class="mui-checkbox mui-left" @click.native="item.ISSELECT=(item.DISABLE||!item.ISSELECT)">
              <input name="checkbox" type="checkbox" :disabled="item.DISABLE" v-model="item.ISSELECT"><span>{{item["ITEMID.PARANAME"]}}</span>
            </rs-list-item>
          </rs-list> 
        </div> 
    </div>
</template>
<script>
import {mapDateTable} from "../store"

export default {
  props:{
     TITLE:""
  },
  name: "set",
  data() {
    return {
      ISXZ: true
    }
  },
  computed: {
      ...mapDateTable("SETDTS",['ITEMID_PARANAME','ISDELBYU']),
  },
  methods: {
    set:function(){
       this.$store.dispatch("jiesuan/setSetDTS");
       this.$router.goBack()
    }
  },
  activated: function() {
      console.log("%c"+this.$route.path,"color:red");
      this.$store.commit("jiesuan/setSetDTS");
  }
};
</script>
<style>
.rs-list .mui-switch{position: absolute; right: 10px;top: 50%; margin-top: -15px;}
.rs-list .mui-left a:not(.mui-btn){padding-left: 58px;}
.mui-checkbox input[type=checkbox]{top: 8px;left: 20px;}
</style>

