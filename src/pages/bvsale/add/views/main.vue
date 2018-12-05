<template>
</template>
<script>
import {mapGetters,mapDateTable,Constants} from "../store"
import { getWeek } from "rs-vcore/utils/Date";
export default {
  name: "bvsale",
  data() {
    return {
    };
  },
  computed: {
      ...mapGetters(["ISSHOWSAVE","ISSHOWDELETE","DTSMESSAGE","SELECTEDTAB"]),
      ...mapDateTable("MAIN",['BILLTYPEID','BILLDATE','BILLCODE','SNODEID.SNODECODE',"SNODEID.SNODENAME"]),
      ...mapDateTable("DTS",[])
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/bvsale/add/"+url});
    },
    linkMat:function(item){
        this.$router.push({path:"/bvsale/add/mat",params:{item}});
    },
    open(picker) {
      this.$refs[picker].open();
    },
    handleChangeD:function(){
      this.$callAction({action:`${Constants.STORE_NAME}/changeBillDate`});
    },
    save(){
       this.$callAction({action:`${Constants.STORE_NAME}/save`,successText:"保存成功"});
    },
    async del(){
       await this.$confirm("确认删除？");
       this.$callAction({action:`${Constants.STORE_NAME}/delete`,successText:"删除成功",isSuccessBack:true});
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
