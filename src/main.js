// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Rui from 'rs-ui1'
import animated from 'animate.css'
import 'rs-ui1/dist/css/mui.css'
import '@/assets/css/rrfont.css'
import '@/assets/css/public.css'
Vue.use(Rui);
Vue.use(animated);
Vue.config.productionTip = false

Vue.prototype.isPower = function(code) {
    return !!this.$store.getters.pcode[code];
}
Vue.prototype.$callAction = function({ action, param, successText, errorText, successCall, errorCall, isBusy, isSuccessBack, isErrorBack, timeOut }) {
    setTimeout(async() => {
        this.$indicator.open();
        this.$store
            .dispatch(action, param)
            .then(() => {
                this.$indicator.close();
                if (successText) {
                    this.$toast({
                        message: successText,
                        position: "bottom"
                    });
                }
                if (successCall) {
                    successCall();
                }
                if (isSuccessBack)
                    this.$router.goBack();
            })
            .catch(e => {
                this.$indicator.close();
                this.$toast({
                    message: errorText || e.message || "加载失败",
                    position: "bottom"
                });
                if (errorCall) {
                    errorCall();
                }
                if (isErrorBack)
                    this.$router.goBack();
            });
    }, timeOut || 0);
}
window.$app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})