import Store from "@/store"
import { mapState } from 'vuex'
import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";

const Constants = {
    STORE_NAME: "jiesuan"
}

const storeHelper = new Store01({
    service: service,
    paths: { "MAIN": "主表数据模型", "DTS": "字表数据模型", "其他": "其他" },
    MAINPATH: "MAIN",
    SUBPATH: ["DTS"],
    XULID: ""
});


const state = {
    params: { ACTION: "" },
    ...storeHelper.mixState()
}
const mutations = {
    "setEmp": function(state, { path, item, idx }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("MKEMPID", item["EMPID"], idx);
        dt.setValue("MKEMPID.EMPCODE", item["EMPCODE"], idx);
        dt.setValue("MKEMPID.EMPNAME", item["EMPNAME"], idx);
    },
    ...storeHelper.mixMutations()
}

const actions = {
    ...storeHelper.mixMutations(),
    add: function({ commit }) {

    }
}
Store.registerModule(Constants.STORE_NAME, {
    namespaced: true,
    state,
    mutations,
    actions
});

const mapGetters = function(path, aFields, itemProp) {
    return storeHelper.mapGetters(path, aFields, itemProp);
}

export { mapState, mapGetters, Constants };