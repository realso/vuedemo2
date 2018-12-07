// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filters from './utils/filters'
import extends2 from './utils/extends'
import Rui from 'rs-ui1'
import animated from 'animate.css'
import 'rs-ui1/dist/css/mui.css'
import '@/assets/css/rrfont.css'
import '@/assets/css/public.css'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

import Components from './components'

Vue.use(VideoPlayer);
Vue.use(Rui);
Vue.use(animated);
//这自定义组件
Vue.use(Components);

Vue.config.productionTip = false
    //注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
})
window.$app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})