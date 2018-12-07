import Views from './views.vue'

const install = function(Vue, config = {}) {
    if (install.installed) return;
    Vue.component(Views.name, Views)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

// 导出组件
export default { install, Views }