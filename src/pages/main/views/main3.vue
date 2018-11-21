<template>
  <div class="mui-layout mui-layout-bottomtop">
    <rs-header title="消息"></rs-header>
    <rs-navbar v-model="selected">
          <rs-nav-item id="未读">
            未读
          </rs-nav-item>
          <rs-nav-item id="已读">
            已读
          </rs-nav-item>
        </rs-navbar>
        <rs-tab-container v-model="selected">
          <rs-tab-container-item id="未读">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill=false :bottom-all-loaded="allLoaded" :top-status.sync="topStatus" ref="loadmore">
              <rs-list size="14" noborder>
                <rs-medialist-item v-for="(item,index) in list" isright=true :key="index" @click.native="moveTo(item.path)">
                  <img slot="left" class="rr-radius-100" :src="item.src">
                  {{item.title}}
                  <p class="mui-ellipsis" style="margin-bottom:0">{{item.text}}</p>
                </rs-medialist-item>
              </rs-list>
            </mt-loadmore>
          </rs-tab-container-item>
        </rs-tab-container>
   </div>
</template>
<script>
export default {
  name:"main3",
  data () {
    return {
      selected: '未读',
      list: [
        {
          src: require("@/assets/logo.jpg"),
          title: '第一个标题',
          text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？'
        },
        {
          src: require("@/assets/img/yuantiao.jpg"),
          title: '第二个标题',
          text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？'
        },
        {
          src: require("@/assets/img/yuantiao.jpg"),
          title: '第二个标题',
          text: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？'
        }
      ],
    }
  },
  methods: {
    loadTop: function() {
      this.doQuery();
    },
    loadBottom: function() {
      this.$refs.loadmore.onBottomLoaded();
    },
    doQuery: function() {
      this.topStatus = "loading";
      let para = {};
      let EMPID = this.$store.state["user"].userInfo["EMPID"];
      para["EMPID"] = EMPID;
      para["STATE"] = this.selected;
      para["INPUT"] = this.searchInput;
      para.sqlId = "48171";
      para.pageSize = "10";
      db.open(para).then(ret => {
        this.list = ret.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });
    },
    moveTo: function(id) {
      this.$router.push({path:"/feedback/add/main",query:{ACTION:"VIEW",BILLID:id}});
    },
    hold: function() {
      alert("长按");
    }
  },
  watch:{
    selected(newValue,oldValue){
      this.doQuery();
    }
  },
  activated:function(){
    if(!this.selected){
       this.selected = this.STATE.待发送;
    }
  }   
}
</script>
<style>
.rr-radius-100{border-radius: 100%}
</style>
