import Vue from 'vue'
import Router from 'vue-router'
import Store from "../store"
import LoginRouter from "@/pages/login/router"
import MainRouter from "@/pages/main/router"
Vue.use(Router);
let routes = [];
routes = routes.concat(LoginRouter);
routes.push(MainRouter);
const router = new Router({
    routes: routes
});
router.beforeEach((to, from, next) => {
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