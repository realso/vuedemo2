/////////////
//非公共保存模板
/////////////
import Store from "@/store"
import { createNamespacedHelpers } from 'vuex'
import { Store02, Constants as SConstants } from "rs-vcore/store/Store02";

const Constants = Object.assign({}, SConstants, {
    STORE_NAME: "bvsale"
});

const { mapState, mapGetters } = createNamespacedHelpers(Constants.STORE_NAME);

const storeHelper = new Store02({
    paths: { "MAIN": "TBV_SNSTL_M", "DTS": "TBV_SNSTLDTS_M" }
});

const state = {
    params: { ACTION: "", BILLTYPEID: "" },
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