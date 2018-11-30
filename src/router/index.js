import Vue from 'vue'
import Router from 'vue-router'
import Store from "../store"
import LoginRouter from "@/pages/login/router"
import MainRouter from "@/pages/main/router"
import T404 from "@/pages/T404/router"
import JieSuanRouter from "@/pages/jiesuan/router"
import JieSuanRouter1 from "@/pages/jiesuan.1/router"
Vue.use(Router);
let routes = [];
routes = routes.concat(LoginRouter);
routes.push(MainRouter);
routes.push(T404);
routes.push(JieSuanRouter);
routes.push(JieSuanRouter1);
console.log(routes)
const router = new Router({
    routes: routes
});
console.log(router)
router.beforeEach((to, from, next) => {
    if (!to.matched || to.matched.length == 0) {
        next({ path: "/404" });
        return;
    }

    if (["login", "404", "503"].indexOf(to.name) != -1 || Store.getters["user/isLogin"]) {
        next();
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
Router.prototype.goBack = function() {　　
    this.isBack = true;
    this.go(-1)
}
export default router;