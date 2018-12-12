<template>
  <rs-view class="mui-layout mui-layout-top">
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
    <div class="mui-content">
      <rs-list
        class="rr-line-24"
        size="15"
        noborder
      >
        <rs-list-item>
          {{this["MID.MNAME"]+'('+this["MID.MCODE"]+')'}}
        </rs-list-item>
        <rs-list-item>
          <div class="rs-flex-row">
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">规 格</span>
              <span>：</span>
              {{this["MID.SIZETYPE"]}}
            </div>
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">单 位</span>
              <span>：</span>
              袋
            </div>
          </div>
        </rs-list-item>
        <rs-list-item>
          <div class="rs-flex-row">
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">数 量</span>
              <span>：</span>
              <input
                class="rr-width-4em rr-border rr-text-center"
                v-model="MYQTY"
              />
            </div>
            <div
              class="rs-flex-item"
              v-if="MINQTY>0"
            >
              <span class="rr-justify rr-width-4em">最 小 订 货</span>
              <span>：</span>
              {{MINQTY}}
            </div>
          </div>
        </rs-list-item>
        <rs-list-item>
          <div class="rs-flex-row">
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">单 价</span>
              <span>：</span>
              {{PRC}}
            </div>
            <div class="rs-flex-item">
              <span class="rr-justify rr-width-4em">金 额</span>
              <span>：</span>
              {{QTY*PRC|toFixed(2)}}
            </div>
          </div>
        </rs-list-item>
      </rs-list>
    </div>
    <div class="rr-number-key">
      <rs-grid
        type="white"
        border
      >
        <rs-grid-item
          v-for="(item,index) in number"
          :key="index"
          @click.native="navClick(item)"
        >
          {{item}}
        </rs-grid-item>
      </rs-grid>
    </div>
    <div class="rs-flex-row rr-text-center rr-footer">
      <div
        class="rs-flex-item"
        @click="up"
      ><span class="rr-font rr-iconleft f15"></span> 上一物料</div>
      <div
        class="rs-flex-item"
        @click="down"
      >下一物料 <span class="rr-font rr-iconright f15"></span></div>
    </div>
  </rs-view>
</template>
<script>
import { mapGetters, mapDateTable, Constants } from "../store";
export default {
  name: "bvsale_mat",
  props: {
    TITLE: ""
  },
  data() {
    return {
      item: this.$route.params.item,
      number: [],
      MYQTY: ""
    };
  },
  computed: {
    ...mapGetters(["SELECTEDTAB"]),
    ...mapDateTable(
      "DTS",
      ["MID.MNAME", "MID.MCODE", "MID.SIZETYPE", "AMT", "QTY", "MINQTY", "PRC"],
      "item"
    )
  },
  methods: {
    up() {
      this.$store
        .dispatch(`${Constants.STORE_NAME}/upMat`, this.item)
        .then(item => {
          if (!item) {
            this.$toast("没有了");
          } else {
            this.item = item;
          }
        });
    },
    down() {
      this.$store
        .dispatch(`${Constants.STORE_NAME}/downMat`, this.item)
        .then(item => {
          if (!item) {
            this.$toast("没有了");
          } else {
            this.item = item;
          }
        });
    },
    navClick(item) {
      let v = this.MYQTY + "";
      if (item == "C") {
        v = v.substring(0, v.length - 1);
      } else {
        v = v + item;
      }
      this.MYQTY = v;
      this.$store.commit(`${Constants.STORE_NAME}/${Constants.M_SETDTSQTY}`, {
        QTY: this.MYQTY,
        item: this.item
      });
    }
  },
  activated: function() {
    this.item = this.$route.params.item;
  },
  watch: {
    item: {
      handler: function() {
        this.MYQTY = this.QTY;
      },
      immediate: true
    }
  },
  created() {
    for (let i = 1; i < 10; i++) {
      this.number.push(i);
    }
    this.number.push(".");
    this.number.push(0);
    this.number.push("C");
  }
};
</script>
<style scoped>
.rr-line-24,
.rr-line-24 .rr-justify {
  line-height: 24px;
}
.rr-line-24 .rr-justify {
  height: 24px;
}
.rr-border {
  border: 1px solid #58cffa;
  display: inline-block;
  font-size: 15px;
}
.rr-number-key .rs-gridItem {
  padding: 20px 10px !important;
}
.rs-grid .rs-gridItem.mui-col-sm-3{width:33.33333333% !important;}
</style>
