<template>
</template>
<script>
import {mapGetters,mapDateTable,Constants} from "../store"
import { getWeek } from "rs-vcore/utils/Date";
export default {
  name: "bvsale_mat",
  data() {
    return {
        item:this.$route.params.item
    };
  },
  computed: {
      ...mapGetters(["SELECTEDTAB"]),
      ...mapDateTable("DTS",["MID.MNAME","MID.MCODE","MID.SIZETYPE","AMT","QTY"],"item")
  },
  methods: {
    up(){
        let item = this.$store.dispatch(`${Constants.STORE_NAME}/upMat`,item);
        if(!item){
            this.$toast("没有了");
        }else{
            this.item = item;
        }
    },
    down(){
        let item = this.$store.dispatch(`${Constants.STORE_NAME}/downMat`,item);
        if(!item){
            this.$toast("没有了");
        }else{
            this.item = item;
        }
    }
  },
  activated: function() {
      console.log("%c"+this.$route.path,"color:red");
  },
  filters:{
    getWeek(value){
      return value?(value+" "+getWeek(value)):"";
    }
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
