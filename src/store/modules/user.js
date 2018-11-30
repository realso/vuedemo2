import {
    login
} from "@/api/user"
const state = {
    userInfo: {},
    form_email: "",
    form_password: "",
    form_recordPass: true
}
const mutations = {
    "INIT_DATA": function(state) {
        state.userInfo = {};
    },
    "SET_DATA": function(state, userInfo) {
        state.userInfo = userInfo || {};
    },
    "SET_LOGINSTATUS": function(state) {
        let userInfo = state.userInfo;
        let ERRMESSAGE = "";
        if (userInfo.status == "2") {
            state.ISLOGIN = true;
        } else {
            if ("0" == userInfo["ISUSE"]) {
                ERRMESSAGE = "用户已停用！";
            } else if (userInfo["status"] == 3) {
                ERRMESSAGE = "用户名不存在！";
            } else {
                ERRMESSAGE = "用户名密码不匹配！";
            }
        }
        state.ERRMESSAGE = ERRMESSAGE;
    }
}
const getters = {
    isLogin(state) {
        return state.userInfo.status == 2;
    }
}
const actions = {
    async login({ commit }, userInfo) {
        let res = await login(userInfo);
        commit("SET_DATA", res.data);
        commit("SET_LOGINSTATUS");
    },
    loginOut({ commit }) {
        commit("SET_DATA", null);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}