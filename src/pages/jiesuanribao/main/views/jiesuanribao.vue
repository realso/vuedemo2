<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <div class="mui-content bk-fff">
      <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item noborder isright @click.native="open('picker1')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item rr-line-b">{{BILLDATE|getWeek}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright @click.native="linkUrl('snodesel')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经营门店</span>
            <span>：</span>
            <div
              class="rs-flex-item"
            >{{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}</div>
          </div>
        </rs-list-item>
      </rs-list>
      <rs-datetime
        key="jiesuanribao.1"
        ref="picker1"
        type="date"
        v-model.lazy="BILLDATE"
      ></rs-datetime>
      <div class="mui-content-padded">
        <table class="rr-table">
          <thead class="rr-table-header">
            <tr>
              <td>经营门店</td>
              <td class="rr-table-w4em">实际收入</td>
              <td class="rr-table-w4em">线下
                <br>占比%
              </td>
              <td class="rr-table-w4em">线上
                <br>占比%
              </td>
              <td class="rr-table-w4em">差异
                <br>差异‰
              </td>
            </tr>
          </thead>
          <tbody class="rr-table-body">
            <tr v-for="(item,index) in QRY" :key="index" @click="linkDetail(item.BILLID,item.SNODEID,index)">
              <td>
                {{item.SNODECODE}}
                <br>
                {{item.SNODENAME}}
              </td>
              <td class="rr-text-right">{{item.FACTAMT|toFixed(2)}}</td>
              <td class="rr-text-right">{{item.ONLINEAMT|toFixed(2)}}
                <br>{{item.ONLINERATE}}<span v-if="item.ONLINERATE">%</span>
              </td>
              <td class="rr-text-right">{{item.OFFLINEAMT|toFixed(2)}}
                <br>{{item.OFFLINERATE}}<span v-if="item.OFFLINERATE">%</span>
              </td>
              <td class="rr-text-right">{{item.DIFFAMT|toFixed(2)}}
                <br>{{item.DIFFRATE}}<span v-if="item.DIFFRATE">‰</span>
              </td>
            </tr>
            <tr class="rr-table-heji">
              <td class="rr-text-right rr-weight">合计:</td>
              <td class="rr-text-right">{{FACTAMTALL|toFixed(2)}}</td>
              <td class="rr-text-right">{{ONLINEAMTALL|toFixed(2)}}
                <br>{{ONLINERATEALL}}<span v-if="ONLINERATEALL">%</span>
              </td>
              <td class="rr-text-right">{{OFFLINEAMTALL|toFixed(2)}}
                <br>{{OFFLINERATEALL}}<span v-if="OFFLINERATEALL">%</span>
              </td>
              <td class="rr-text-right">{{DIFFAMTALL|toFixed(2)}}
                <br>{{DIFFRATEALL}}<span v-if="DIFFRATEALL">‰</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapDateTable, Constants } from "../store";
import { getWeek } from "rs-vcore/utils/Date";
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
  computed: {
    ...mapGetters([]),
    ...mapDateTable("QRYADV", [
      "BILLDATE",
      "SNODEID",
      "SNODEID.SNODECODE",
      "SNODEID.SNODENAME",
    ]),
    ...mapDateTable("QRY", []),
    ...mapDateTable("QRYALL", [
      "FACTAMTALL",
      "ONLINEAMTALL",
      "ONLINERATEALL",
      "OFFLINEAMTALL",
      "OFFLINERATEALL",
      "DIFFAMTALL",
      "DIFFRATEALL"
    ]),
    length() {
    }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({ path: "/jiesuanribao/main/" + url });
    },
    linkDetail: function(BILLID,SNODEID, index) {
      this.$router.push({
        path: "/jiesuanribao/main/detail",
        query: { BILLID:BILLID,SNODEID: SNODEID, index: index, length: this.length }
      });
    },
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD: function() {
      this.$callAction({ action: `${Constants.STORE_NAME}/loadSTLFMITE` });
    }
  },
  watch: {
    DEADLINE() {
      this.$store.commit(`${Constants.STORE_NAME}/${Constants.M_SETDEADLINE}`);
    }
  },
  activated: function() {
    console.log("%c" + this.$route.path, "color:red");
    this.$store.dispatch(`${Constants.STORE_NAME}/setForm`);
  },
  filters: {
    getWeek(value) {
      return value ? value + " " + getWeek(value) : "";
    },
    toFixed(value, cm) {
      if(value=="0"||value!=""){
          return parseFloat(value || 0).toFixed(cm);
      }
    }
  }
};
</script>
<style scoped lang="postcss">
.rs-listItem {
  padding: 8px 15px;
}
.rr-line-24,
.rr-line-24 .rr-justify {
  line-height: 24px;
}
.rr-line-24 .rr-justify {
  height: 24px;
}
@component-namespace rr {
  @component table {
    font-size: 14px;
    width: 100%;
    @descendent w4em {
      width: 4.5em;
    }
    @descendent header {
      background: rgb(204, 232, 255);
      text-align: center;
      td {
        padding: 3px;
        border: 1px solid rgb(204, 217, 255);
      }
    }
    @descendent body {
      background: #fff;
      td {
        padding: 3px;
        border-bottom: 1px solid #eee;
      }
    }
    @descendent heji {
      background: #eee;
      td {
        padding: 3px;
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
      }
    }
  }
}
</style>

