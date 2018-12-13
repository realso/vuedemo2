<template>

  <div class="mui-layout mui-layout-top">
    <rs-header
      :title="TITLE"
      color="primary"
    >
      <a
        slot="left"
        @click="$router.goBack()"
        class="mui-icon mui-icon-left-nav mui-pull-left"
      ></a>
    </rs-header>
    <div class="mui-input-row mui-search r-search">
      <rs-button link @click="doQuery" class="mui-pull-right">查询</rs-button>
      <input
        type="search"
        class="mui-input-clear"
        v-model="searchInput"
        style="padding: 0 0 0 15px;"
        placeholder="编码、名称"
      >
    </div>
    <div class="mui-content">
      <div class="page-loadmore-wrapper">
        <rs-loadmore
          :top-method="doQuery"
          :bottom-method="doQueryNext"
          :auto-fill=false
          :bottom-all-loaded="allLoaded"
          :top-status.sync="topStatus"
          ref="loadmore"
        >
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in list"
              :key="item.SNODEID"
              @click="selectItem(item)"
              style="font-size:15px;"
            >
                <label style="width: 80px;display: inline-block;">{{item.SNODECODE}}</label>{{item["SNODENAME"]}}
            </li>
          </ul>
           <div v-if="allLoaded"  class="rs-list-nodata">
              <span>没有数据啦</span>
            </div>
        </rs-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/api/db";
import { setTimeout } from "timers";
export default {
  name: "snode_sel",
  props: {
    refStore: { type: Object },
    singleOpen: { type: Boolean },
    TITLE: { type: String }
  },
  data() {
    return {
      list: [],
      topStatus: "",
      allLoaded: false,
      searchInput: "",
      query: {},
      openParam: {}
    };
  },
  methods: {
    setOpenParam: function() {
      this.openParam = {
        modalName: "TBV_CHAINSND_SEL",
        where: `([SNODECODE] LIKE '%${
          this.searchInput
        }%' OR [SNODENAME] LIKE '%${
          this.searchInput
        }%') AND [MNGSTATEID] IN(104067)  AND  [OBJTYPEID]=101028  AND [AID]='@AID' AND [SNODEID] IN(SELECT COLUMN_VALUE FROM TABLE(tss_getpowwhere('MSNODE','@UID','@AID')) UNION ALL SELECT ${this.$store.state.user.userInfo.DSNODEID||0} FROM DUAL)`,
        orderBy: "[CITYRULECODE],[SNODECODE]",
        pageSize: 25,
        pageIndex: 1
      };
    },
    doQuery: function() {
      this.topStatus = "loading";
      this.allLoaded = false;
      this.setOpenParam();
      db.open(this.openParam).then(data => {
        this.list = data.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });
    },
    doQueryNext: async function() {
      this.openParam.pageIndex++;
      this.topStatus = "loading";
      db.open(this.openParam).then(data => {
        this.topStatus = "";
        data.data.items.forEach(item => {
          this.list.push(item);
        });
        this.$refs.loadmore.onBottomLoaded();
        if (data.data.items.length == 0) {
          this.allLoaded = true;
        }
      });
    },
    selectItem: function(item) {
      let para = {};
      para["path"] = this.refStore.path;
      para["item"] = item;
      setTimeout(() => {
        if (this.refStore.mutation) {
          this.$store.commit(this.refStore.mutation, para);
        }else if (this.refStore.action) {
          this.$indicator.open();
          this.$store.dispatch(this.refStore.action, para).then(()=>this.$indicator.close());
        }else{
          this.$emit("selectItem",item);
        }
      }, 600);
       this.$router.goBack();
    }
  },
  activated: function() {
    setTimeout(()=>{
      this.doQuery();
    },600); 
  },
  watch:{
    topStatus:function(v,ov){
      if("loading"==v){
        this.$indicator.open();
      }else{
        this.$indicator.close();
      }
    }
  }
};
</script>
<style scoped>
.r-search input.mui-input-clear {
  background: #fff;
  text-align: left;
  padding: 0 65px 0 15px;
  border: 5px solid #f8f8f9;
  border-radius: 0;
  height: 35px;
  margin-bottom: 0;
}
.r-search .mui-pull-right {
  background: #f8f8f9;
  color: #58cffa;
  position: absolute;
  top: 0;
  height: 37px;
  right: 0;
}
input[type="submit"]:enabled:active,
input[type="submit"].is-active:enabled,
.rs-btn-primary:enabled:active,
.rs-btn-primary.is-active:enabled,
.rs-btn-blue:enabled:active,
.rs-btn-blue.is-active:enabled {
  border: none;
  background-color: #f8f8f9;
}
</style>


