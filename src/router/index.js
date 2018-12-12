import Vue from 'vue'
import Router from 'vue-router'
import Store from "../store"


Vue.use(Router);
let routes = [];

//通过webpack加载router
let requireAll = requireContext => requireContext.keys().map(requireContext)
let req = require.context('../pages', true, /router.js$/);
let ret = requireAll(req);
ret.forEach((item) => {
    if (item.default instanceof Array) {
        routes = routes.concat(item.default);
    } else {
        routes.push(item.default)
    }
})
const router = new Router({
    routes: routes
});
router.beforeEach((to, from, next) => {
    if (!to.matched || to.matched.length == 0) {
        next({ path: "/404" });
        return;
    }
    if (["login", "404", "503"].indexOf(to.name) != -1 || Store.getters["user/isLogin"]) {
        if (!from.name && to.name != "main1" && Store.getters["user/isLogin"]) {
            next({ name: 'main1', replace: true });
        } else {
            next();
        }

    } else {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        });
    }
});
//返回
Router.prototype.goBack = function(isforce) {　
    //isfroce：true 强制返回，不检查是否修改　
    this.isBack = true;
    this.isForce = isforce || false;
    this.go(-1)
}
export default router;