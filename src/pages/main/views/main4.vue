<template>
  <div class="mui-layout mui-layout-bottomtop">
    <rs-header title="我的"></rs-header>
    <div class="mui-content">
        <rs-list size="14" noborder>
          <rs-medialist-item noborder>
            <img slot="left" src="@/assets/logo.jpg">
            Andy
          </rs-medialist-item>
        </rs-list>
        <rs-list size="14" class="mt10" noborder>
          <rs-list-item isright noborder>
            <span class="rr-font rr-gerenxinxi c-icon-blue"></span>
            个人信息
          </rs-list-item>
        </rs-list>
        <rs-list size="14" class="mt10" noborder>
          <rs-list-item isright>
            <span class="rr-font rr-wodeshoucang c-icon-red"></span>
            我的收藏
          </rs-list-item>
          <rs-list-item isright noborder>
            <span class="rr-font rr-wodegongzi c-active"></span>
            我的工资
          </rs-list-item>
        </rs-list>
        <rs-list size="14" class="mt10" noborder>
          <rs-list-item isright noborder>
            <span class="rr-font rr-shezhi c-icon-blue"></span>
            设置
          </rs-list-item>
        </rs-list>
    </div>
  </div>
</template>
<script>
export default {
    name:"main4",
    data () {
      return {
        selected: '未读'
      }
    }  
    
}
</script>
<style>
</style>
