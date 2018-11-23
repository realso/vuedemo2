import Store from "@/store"
import { mapState } from 'vuex'
import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";

const Constants = Object.assign(SConstants, {
    STORE_NAME: "jiesuan",
    M_INITDTS: "initDts",
    M_SETEMP: "setEmp",
    M_SETSNODE: "setSnode"
});

const storeHelper = new Store01({
    service: service,
    paths: { "MAIN": "主表数据模型", "DTS": "字表数据模型", "P1": "TBS_DEPT", "结算模板数据源": "", "历史结算单数据源": "" },
    MAINPATH: "MAIN",
    SUBPATH: ["DTS"],
    XULID: ""
});

const state = {
    params: { ACTION: "" },
    ...storeHelper.mixState()
}

const mutations = {
    ...storeHelper.mixMutations(),
    [Constants.M_INITDTS]: function(state) {
        let P1 = storeHelper.getTable("P1");
        let DTS = storeHelper.getTable("DTS");
        P1.data.forEach(item => {
            let titem = {};
            titem[""] = item[""];
            DTS.add(titem);
        });
    },
    [Constants.M_SETEMP]: function(state, { path, item }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("xxx", item["xxx"]);
    },
    [Constants.M_SETSNODE]: function(state, { path, item }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("xxx", item["xxx"]);
    }
}

const actions = {
    ...storeHelper.mixActions(),
    myAdd: async function({ dispatch, commit }) {
        await dispatch("add");
        commit(Constants.M_INITDTS);
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