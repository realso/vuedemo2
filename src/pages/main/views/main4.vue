<template>
  <div class="mui-layout mui-layout-bottomtop">
    <rs-header title="我的"></rs-header>
    <div class="mui-content">
        <rs-list size="14" noborder>
          <rs-medialist-item noborder>
            <img slot="left" src="@/assets/logo.jpg">
            Andy
            <div>18356789902</div>
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
    <div class="mui-content-padded">
      <rs-button class="mb10 rr-width-100" type="danger" @click.native="loginOut">退出登录</rs-button>
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
    }, 
    methods: {
      loginOut: function(){
        this.$router.push('loginout')
      }
    }
}
</script>
<style>
</style>
