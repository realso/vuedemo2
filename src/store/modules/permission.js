import {
    loadMenu
} from "@/api/user"

const state = {
    pcode: {}
}
const mutations = {
    "INIT_DATA": function(state) {
        state.pcode = {};
    },
    "SET_DATA": function(state, pcode) {
        state.pcode = {};
        pcode = pcode || [];
        pcode.forEach(p => {
            state.pcode[p["PCODE"] || p["FUNCID"]] = p;
        });
    }
}
const getters = {}
const actions = {
    loadData: async function({ commit }) {
        let ret = await loadMenu();
        commit("SET_DATA", (ret.data || {}).items);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}