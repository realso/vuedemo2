<template>
  <div
    id="login"
    selected="true"
  >
    <div
      class="rs-login"
      id="rs-login"
    >
      <div class="rs-login-logo">
        <img
          src="@/assets/logo.png"
          alt=""
        />
      </div>
      <form
        id='login-form'
        class="mui-input-group"
      >
        <div class="mui-input-row">
          <input
            type="text"
            v-model="form_email"
            id="main.form_email"
            class="mui-input-clear mui-input"
            placeholder="请输入账号"
          >
        </div>
        <div class="mui-input-row">
          <input
            id='password'
            type="password"
            @focus="fouce()"
            v-model="form_password"
            class="mui-input-clear mui-input"
            placeholder="请输入密码"
          >
        </div>
      </form>
      <div class="rs-login-bottom">
        <rs-button
          size="normal"
          @click="doLogin"
        >登录</rs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form_email: this.$store.state.user.form_email,
      form_password: this.$store.state.user.form_password,
      form_recordPass: this.$store.state.user.form_recordPass
    };
  },
  computed: {},
  components: {},
  created() {},
  methods: {
    doLogin: async function() {
      let _this = this;
      this.$indicator.open();
      await this.$store.dispatch("user/login", {
        form_email: this.form_email,
        form_password: this.form_password,
        guid: this.getGuidGenerator()
      });
      if (this.$store.getters["user/isLogin"]) {
        await this.$store.dispatch("permission/loadData");
        _this.$router.push("/");
        this.$indicator.close();
      } else {
        this.$indicator.close();
        this.$toast({
          message: this.$store.state.user.ERRMESSAGE,
          position: "bottom"
        });
      }
    },
    getGuidGenerator: function() {
      var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    fouce: function() {
      document.getElementById("rs-login").style.marginTop = "-260px";
    }
  }
};
</script>
<style>
#login {
  background: #fff;
  height: 100%;
  position: relative;
}
.rs-login {
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -200px;
}
.rs-login-logo {
  width: 50%;
  margin: 0 auto;
}
.rs-login-logo img {
  display: block;
  width: 100%;
}
.mui-input-group {
  background: none;
  margin: 30px auto;
  width: 80%;
}
.mui-input-group:before,
.mui-input-group:after,
.mui-input-group .mui-input-row:before,
.mui-input-group .mui-input-row:after {
  display: none;
}
.mui-input-group .mui-input {
  color: #2b8daa;
  text-align: center;
  border: 1px solid #2b8daa;
  background: #fff;
  border-radius: 20px;
}
.mui-input-group .mui-input-row {
  margin-bottom: 10px;
}
.rs-login-bottom {
  margin: 10px auto;
  width: 80%;
}
.rs-login .rs-btn-primary {
  background: #46464b;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #2b8daa;
}
</style>
