<template>
  <div class="mui-layout mui-layout-bottomtop">
    <rs-header title="知识库"></rs-header>
    <rs-navbar v-model="selected">
          <rs-nav-item id="全部">
            全部
          </rs-nav-item>
          <rs-nav-item id="我的收藏">
            我的收藏
          </rs-nav-item>
        </rs-navbar>
        <rs-tab-container v-model="selected">
          <rs-tab-container-item id="全部">
            全部
          </rs-tab-container-item>
          <rs-tab-container-item id="我的收藏">
            我的收藏
          </rs-tab-container-item>
        </rs-tab-container>
   </div>
</template>
<script>
export default {
    name:"main2",
    data () {
      return {
        selected: '全部'
      }
    }  
    
}
</script>