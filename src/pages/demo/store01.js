/////////////
//锐速公共保存模板
/////////////
import Store from "@/store"
import { createNamespacedHelpers } from 'vuex'
//import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";

const Constants = Object.assign({}, SConstants, {
    STORE_NAME: "jiesuan1",
});
const { mapState, mapGetters } = createNamespacedHelpers(Constants.STORE_NAME);
const storeHelper = new Store01({
    service: service,
    paths: { "MAIN": "TBV_SNSTL_M", "DTS": "TBV_SNSTLDTS_M", "SETDTS": "TBV_SNSTLDTS_M", "STLFMITEM": "TBV_STLFMITEM", "COPYDTS": "TBV_SNSTLDTS_M", "SNODE": "TBV_CHAINSND_SEL" },
    MAINPATH: "MAIN", //主表数据源
    SUBPATH: ["DTS"], //字表数据源数组
    XULID: "0000051437", //XULID
    OPRTFLOWID: "30307", //流程ID
    EMPFIELD: "MANAGERID" //当前员工字段
});

const state = {
    params: { ACTION: "", STLTYPEID: "", BILLTYPEID: "" },
    ...storeHelper.mixState()
}

const getters = {}
const mutations = {
    ...storeHelper.mixMutations()
}

const actions = {
    ...storeHelper.mixActions()
}

Store.registerModule(Constants.STORE_NAME, {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});

const mapDateTable = function(path, aFields, itemProp) {
    return storeHelper.mapGetters(path, aFields, itemProp);
}

export { mapState, mapGetters, mapDateTable, Constants };