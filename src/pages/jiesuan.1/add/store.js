import Store from "@/store"
import { mapState } from 'vuex'
import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";

const Constants = Object.assign(SConstants, {
    STORE_NAME: "jiesuan",
    F_INITDTS: "initDts",
    F_SETEMP: "setEmp",
    F_SETSNODE: "setSnode"
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
    [Constants.F_INITDTS]: function(state) {},
    [Constants.F_SETEMP]: function(state, { path, item }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("xxx", item["xxx"]);
    },
    [Constants.F_SETSNODE]: function(state, { path, item }) {
        const dt = storeHelper.getTable(path);
    }
}

const actions = {
    ...storeHelper.mixMutations(),
    add: async function({ commit }) {
        let ret = await service.doInitData();
        const data = (ret.data || {});
        //赋值
        commit(Constants.F_BATCHINITDATA, { data });
        //实例化数据
        commit(Constants.F_INITDTS, { data });
        debugger;
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