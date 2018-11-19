<template>
  <div style="height:100%;">
    <keep-alive>
      <router-view ref="view" />
    </keep-alive>
    <rs-tabbar v-model="selected">
      <rs-tab-item id="main1" icon="mui-icon rr-font rr-gongzuotai">
        <span slot="label">工作台</span>
      </rs-tab-item>
      <rs-tab-item id="main2" icon="mui-icon rr-font rr-zhishiku">
        <span slot="label">知识库</span>
      </rs-tab-item>
      <rs-tab-item id="main3" icon="mui-icon rr-font rr-xiaoxi">
        <span slot="label">消息</span>
      </rs-tab-item>
      <rs-tab-item id="main4" icon="mui-icon rr-font rr-wode">
        <span slot="label">我的</span>
      </rs-tab-item>
    </rs-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: this.$route.name
    };
  },
  methods: {},
  watch: {
    selected(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.$router.push(curVal);
      }
    }
  }
};
</script>