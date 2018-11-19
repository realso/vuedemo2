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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})