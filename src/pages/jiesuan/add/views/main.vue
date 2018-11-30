<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <router-link to="/" slot="left" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <div slot="right">
        <rs-button v-if="ISSHOWCHECK" link @click="check">审核</rs-button>
        <rs-button v-if="ISSHOWRECHECK" link @click="reCheck">撤销审核</rs-button>
        <rs-button v-if="ISSHOWDELETE" link @click="delete1">删除</rs-button>
        <rs-button v-if="ISSHOWSAVE" link @click="save">保存</rs-button>
      </div>
    </rs-header>
    <div class="mui-content">
      <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item noborder isright @click.native="linkUrl('snodesel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经营门店</span>
            <span>：</span>
            <div
              class="rs-flex-item rr-line-b"
            >{{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright @click.native="linkUrl('empsel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">店长</span>
            <span>：</span>
            <div class="rs-flex-item rr-line-b">{{MANAGER}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright @click.native="open('picker2')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item" :class="BILLTYPEID=='分时'?'rr-line-b':''">{{BILLDATE|getWeek}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright v-if="BILLTYPEID=='分时'" @click.native="open('picker1')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">时 段</span>
            <span>：</span>
            <div class="rs-flex-item">
              {{FHOUR}}
              <span v-if="FMINUTE!=''">:</span>
              {{FMINUTE}}
            </div>
          </div>
        </rs-list-item>
      </rs-list>
      <rs-datetime ref="picker2" type="date" v-model.lazy="BILLDATE" @confirm="handleChangeD"></rs-datetime>
      <rs-datetime ref="picker1" type="time" @confirm="handleChangeT"></rs-datetime>
      <div class="rr-text-right">
        <rs-button link @click.native="linkUrl('set')">设置项目</rs-button>
      </div>
      <rs-list size="14" noborder>
        <main_dts v-for="(item) in DTS" :item="item" :key="item.ENTRYID"/>
      </rs-list>
      <div class="rr-list-textarea">
        <textarea rows="3" placeholder="差异说明" v-model.lazy="DIFFREMARK"></textarea>
      </div>
      <div class="rr-bill-top">
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
      </div>
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
      "ISSHOWDELETE"
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
    save: function() {
      this.$store.dispatch("jiesuan/list_save").catch(function(err) {
        alert(err);
      });
    },
    check: function() {
      this.$store.dispatch("jiesuan/check").catch(function(err) {
        alert(err);
      });
    },
    reCheck: function() {
      this.$store.dispatch("jiesuan/reCheck").catch(function(err) {
        alert(err);
      });
    },
    delete1: function() {
      this.$store.dispatch("jiesuan/delete").catch(function(err) {
        alert(err);
      });
    }
  },
  activated: function() {
    console.log("%c" + this.$route.path, "color:red");
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
.rs-listItem {
  padding: 8px 15px;
}
.rs-list {
  padding-top: 5px;
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

