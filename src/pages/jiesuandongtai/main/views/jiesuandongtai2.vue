<template>
  <div class="mui-layout mui-layout-top">
    <rs-header :title="TITLE" color="primary">
      <a slot="left" @click="$router.push('/main1')" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <rs-list class="rr-line-24" size="15" noborder>
        <rs-list-item isright @click.native="open('picker1')">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">日 期</span>
            <span>：</span>
            <div class="rs-flex-item">{{BILLDATE|getWeek}}</div>
          </div>
        </rs-list-item>
        <rs-list-item noborder isright @click.native="linkUrl('snodesel')" style="margin-right:50px;">
          <div class="rs-flex-row">
            <span class="rr-justify rr-width-4em">经营门店</span>
            <span>：</span>
            <div
              class="rs-flex-item"
            >{{this["SNODEID.SNODECODE"]}} {{this["SNODEID.SNODENAME"]}}</div>
            
          </div>
        </rs-list-item>
        <rs-button size="small" class="rr-list-search" @click="doQuery()">查询</rs-button>
      </rs-list>
      <rs-datetime
        key="jiesuandongtai.1"
        ref="picker1"
        type="date"
        v-model.lazy="BILLDATE"
      ></rs-datetime>
    <div class="mui-content bk-fff">
      <div class="mui-content-padded">
        <table class="rr-table">
          <thead class="rr-table-header">
            <tr>
              <td>经营门店</td>
               <td class="rr-table-w4em">截止时间</td>
              <td class="rr-table-w4em">计算收入</td>
              <td class="rr-table-w4em">堂食
              </td>
              <td class="rr-table-w4em">饿了么
              </td>
              <td class="rr-table-w4em">美团
              </td>
            </tr>
          </thead>
          <tbody class="rr-table-body">
            <tr v-for="(item,index) in QRY" :key="index" @click="linkDetail(item.BILLID,item.SNODEID,item.BILLDATE,index)">
              <td>
                {{item.SNODECODE}}
                <br>
                {{item.SNODENAME}}
              </td>
                 <td class="rr-text-right">{{item.DEADLINE}}</td>
              <td class="rr-text-right">{{item.FACTAMT-item.DIFFAMT}}</td>
              <td class="rr-text-right">{{item.TSCNT}}
              </td>
              <td class="rr-text-right">{{item.ELMCNT}}
              </td>
              <td class="rr-text-right">{{item.MTCNT}}
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
  name: "jiesuandongtai",
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
    length() {
      return this.QRY.length
    }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({ path: "/jiesuandongtai/main/" + url });
    },
    linkDetail: function(BILLID,SNODEID,BILLDATE, index) {
      this.$router.push({
        path: "/jiesuandongtai/main/detail",
        query: { BILLID:BILLID,SNODEID:SNODEID, BILLDATE:BILLDATE,index: index, length: this.length }
      });
    },
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD: function() {
      this.$callAction({ action: `${Constants.STORE_NAME}/loadSTLFMITE` });
    },
    doQuery: function(){
      this.$store.dispatch(`${Constants.STORE_NAME}/openReport`);
    }
  },
  watch: {
    DEADLINE() {
      this.$store.commit(`${Constants.STORE_NAME}/${Constants.M_SETDEADLINE}`);
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
<style scoped lang="postcss">
.rr-line-24,
.rr-line-24 .rr-justify {
  line-height: 24px;
}
.rr-line-24 .rr-justify {
  height: 24px;
}
.rr-list-search{padding: 0 10px; position: absolute; right: 10px; bottom: 6px}
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

