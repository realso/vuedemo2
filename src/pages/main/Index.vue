<template>
  <div style="height:100%;">
    <keep-alive>
      <router-view ref="view" />
    </keep-alive>
    <rs-tabbar v-model="selected">
      <rs-tab-item id="main1" icon="mui-icon rr-font rr-gongzuotai f24">
        <span slot="label">工作台</span>
      </rs-tab-item>
      <rs-tab-item id="main2" icon="mui-icon rr-font rr-zhishiku f24">
        <span slot="label">知识库</span>
      </rs-tab-item>
      <rs-tab-item id="main3" icon="mui-icon rr-font rr-xiaoxi f24">
        <span slot="label">消息</span>
      </rs-tab-item>
      <rs-tab-item id="main4" icon="mui-icon rr-font rr-wode f24">
        <span slot="label">我的</span>
      </rs-tab-item>
    </rs-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed:{
    selected:{
      get(){
        return this.$route.name;
      },
      set(v){
          this.$router.push(v);
      }
    }
  },
  methods: {}
};
</script>