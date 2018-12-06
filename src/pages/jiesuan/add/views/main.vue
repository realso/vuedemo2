<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <router-link to="/" slot="left" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <div slot="right">
        <rs-button v-if="ISSHOWCHECK" link @click="check">审核</rs-button>
        <rs-button v-if="ISSHOWRECHECK" link @click="reCheck">撤销审核</rs-button>
        <rs-button v-if="ISSHOWDELETE" link @click="del">删除</rs-button>
        <rs-button v-if="ISSHOWSAVE" link @click="save">保存</rs-button>
      </div>
    </rs-header>
    <div class="mui-content">
      <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item isright @click.native="linkUrl('snodesel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经营门店</span>
            <span>：</span>
            <div class="rs-flex-item"
            >{{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}</div>
          </div>
        </rs-list-item>
        <rs-list-item isright @click.native="linkUrl('empsel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">店长</span>
            <span>：</span>
            <div class="rs-flex-item">{{MANAGER}}</div>
          </div>
        </rs-list-item>
        <rs-list-item :noborder="!ISTIME" isright @click.native="open('picker2')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item">{{BILLDATE|getWeek}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright v-if="ISTIME" @click.native="open('picker1')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">截 止 时 间</span>
            <span>：</span>
            <div class="rs-flex-item">
               {{DEADLINE}}
            </div>
          </div>
        </rs-list-item>
      </rs-list>
      <rs-datetime key="jiesuan.2" ref="picker2" type="date" v-model.lazy="BILLDATE" @confirm="handleChangeD"></rs-datetime>
      <rs-datetime key="jiesuan.1" ref="picker1" type="time" v-model.lazy="DEADLINE" ></rs-datetime>
      <div class="rr-text-right">
        <rs-button link @click.native="linkUrl('set')">设置项目</rs-button>
      </div>
      
      <rs-list class="rr-line-24" size="14" noborder>
        <main_dts v-for="(item) in DTS" :item="item" :key="item.ENTRYID"/>
      </rs-list>
      <div class="rr-list-textarea">
        <textarea v-if="!ISTIME" rows="3" placeholder="差异说明" v-model.lazy="DIFFREMARK"></textarea>
      </div>
      <rs-list class="rr-line-24 mt10" size="14" noborder>
        <rs-list-item>
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">单 据 号</span>
            <span>：</span>
            <div class="rs-flex-item">{{BILLCODE}}</div>
          </div>
        </rs-list-item>
        <rs-list-item>
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">制 单</span>
            <span>：</span>
            <div class="rs-flex-item">{{MAKER}} {{MAKEDATE}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder>
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">审 核</span>
            <span>：</span>
            <div class="rs-flex-item">{{VERIFIER}} {{VERIFYDATE}}</div>
          </div>
        </rs-list-item>
      </rs-list>  
      <!-- <div class="rr-bill-top">
         <div class="rs-flex-row" style="height:33px" v-if="BILLCODE!=''">
          <span class="rr-justify rr-width-4em">单 据 号</span>
          <span>：</span>
          <div class="rs-flex-item">{{BILLCODE}}</div>
        </div>
        <div class="rs-flex-row" style="height:33px" v-if="MAKER!=''">
          <span class="rr-justify rr-width-4em">制 单</span>
          <span>：</span>
          <div class="rs-flex-item">{{MAKER}} {{MAKEDATE}}</div>
        </div>
        <div class="rs-flex-row" style="height:33px;" v-if="VERIFIER!=''">
          <span class="rr-justify rr-width-4em">审 核</span>
          <span>：</span>
          <div class="rs-flex-item">{{VERIFIER}} {{VERIFYDATE}}</div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapDateTable,Constants } from "../store";
import { getWeek } from "rs-vcore/utils/Date";
import main_dts from "./components/main_dts";
export default {
  props: {
    TITLE: ""
  },
  name: "jiesuan",
  data() {
    return {
      ISINPUTSHOW: false
    };
  },
  components: {
    main_dts
  },
  computed: {
    ...mapGetters([
      "ISSHOWSAVE",
      "ISSHOWCHECK",
      "ISSHOWRECHECK",
      "ISSHOWDELETE",
      "TITLE",
      "ISTIME"
    ]),
    ...mapDateTable("MAIN", [
      "BILLTYPEID",
      "BILLDATE",
      "BILLCODE",
      "SNODEID.SNODECODE",
      "SNODEID.SNODENAME",
      "MANAGER",
      "DIFFREMARK",
      "MANAGER",
      "MAKER",
      "VERIFIER",
      "MAKEDATE",
      "VERIFYDATE",
      "DEADLINE",
      "FHOUR",
      "FMINUTE"
    ]),
    ...mapDateTable("DTS", []),
    ISSHOWWD: function() {
      return this["EMPID"] != "";
    }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({ path: "/jiesuan/add/" + url });
    },
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD: function() {
      this.$callAction({ action: `${Constants.STORE_NAME}/loadSTLFMITE` });
    },
    handleChangeT: function(date) {
      this.FHOUR = date.substring(0, 2);
      this.FMINUTE = date.substring(-1, 2);
    },
    save() {
      this.$callAction({action:`${Constants.STORE_NAME}/list_save`,successText:"保存成功"});
    },
    check() {
      this.$callAction({action:`${Constants.STORE_NAME}/check`,successText:"审核成功"});
    },
    reCheck() {
      this.$callAction({action:`${Constants.STORE_NAME}/recheck`,successText:"已撤销审核"});
    },
    async del() {
      await this.$confirm("确认删除？");
      this.$callAction({action:`${Constants.STORE_NAME}/delete`,successText:"删除成功",isSuccessBack:true});
    }
  },
  activated: function() {
    console.log("%c" + this.$route.path, "color:red");
  },
  watch:{
    "DEADLINE":function(){
       this.$store.commit(`${Constants.STORE_NAME}/setTime`);
    }
  },
  filters: {
    getWeek(value) {
      return value ? value + " " + getWeek(value) : "";
    }
  }
};
</script>
<style scoped>
.rr-title {
  padding: 5px 15px;
  font-size: 15px;
  border-bottom: 1px solid #bbb;
  background: #fff;
  margin-top: 5px;
}
.rr-list-input {
  text-align: right;
}
.rr-list-textarea {
  padding: 5px 15px;
  background: #fff;
}
.rr-list-textarea textarea {
  font-size: 15px;
  margin-bottom: 0;
}
.rr-line-24,
.rr-line-24 .rr-justify {
  line-height: 24px;
}
.rr-line-24 .rr-justify {
  height: 24px;
}
.rs-numInput-input {
  position: absolute;
  top: 0;
  width: 100%;
  border: none;
  height: 100%;
  padding: 0;
  text-align: right;
  font-size: 14px;
  margin: 0;
}
.rr-opacity {
  opacity: 0;
}
</style>

