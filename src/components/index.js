import Views from './views.vue'
import View from './view.vue'

const install = function(Vue, config = {}) {
    if (install.installed) return;
    Vue.component(Views.name, Views)
    Vue.component(View.name, View)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

// 导出组件
export default { install, Views }