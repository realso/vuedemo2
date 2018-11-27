import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        user,
        app,
        permission
    },
    getters: {
        userInfo: function(state) {
            return state.user.userInfo;
        },
        pcode: function(state) {
            return state.permission.pcode;
        }
    },
    plugins: [
        createPersistedState({ paths: ["user", "permission"] })
    ]
});

export default store;