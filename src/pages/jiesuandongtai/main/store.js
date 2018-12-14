import Store from "@/store"
import { createNamespacedHelpers } from 'vuex'
import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";
import { dateToString, getTime } from "rs-vcore/utils/Date";

const Constants = Object.assign({}, SConstants, {
    STORE_NAME: "jiesuandongtai",
    M_ADDDEFAULT: "addDefault",
    M_SETEMP: "setEmp",
    M_SETSNODE: "setSnode",
    M_SETTIME: "setTime",
});
const { mapState, mapGetters } = createNamespacedHelpers(Constants.STORE_NAME);
const storeHelper = new Store01({
    service: service,
    paths: { "QRY":"TBS_PARAMETER_REF", "QRYALL":"TBS_PARAMETER_REF", "QRYADV":"TBS_PARAMETER_REF","MAIN": "VBV_STLTRENDS_M", "DTS": "TBV_SNSTLDTS_M", "SNODE": "TBV_CHAINSND_SEL" },
    MAINPATH: "MAIN",
    SUBPATH: ["DTS"],
});

const state = {
    params: { ACTION: "", STLTYPEID: "", BILLTYPEID: "" },
    ...storeHelper.mixState()
}

const getters = {
    
}
const mutations = {
    ...storeHelper.mixMutations(),
    [Constants.M_ADDDEFAULT]: function (state) {
        //新增默认值
        let QRYADV = storeHelper.getTable("QRYADV");
        let item = {};
        QRYADV.add(item);
        QRYADV.setValue("BILLDATE", dateToString(new Date()));
        //QRYADV.setValue("SNODEID", this.getters.userInfo.DSNODEID);
        //QRYADV.setValue("SNODEID.SNODECODE", this.getters.userInfo.DSNODECODE);
        //QRYADV.setValue("SNODEID.SNODENAME", this.getters.userInfo.DSNODENAME);
    },
    [Constants.M_SETSNODE]: function (state, { path, item }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("SNODEID", item["SNODEID"]);
        dt.setValue("SNODEID.SNODECODE", item["SNODECODE"]);
        dt.setValue("SNODEID.SNODENAME", item["SNODENAME"]);
    }
}

const actions = {
    ...storeHelper.mixActions(),
    loadDTS:async function ({ commit },{SNODEID,BILLDATE}) {
        let ret = await service.doLoadMAIN({ SNODEID:SNODEID, BILLDATE:BILLDATE});
        commit(Constants.M_INITDATA, { path: "MAIN", data: (ret.data || {}).items });
    },
    loadIndexDTS:async function ({ commit },{idx}) {
        let QRY = storeHelper.getTable("QRY");
        let SNODEID = QRY.getValue("SNODEID",idx);
        let BILLDATE = QRY.getValue("BILLDATE",idx);
        let ret = await service.doLoadMAIN({ SNODEID:SNODEID, BILLDATE:BILLDATE});
        commit(Constants.M_INITDATA, { path: "MAIN", data: (ret.data || {}).items });
    },
    openReport: async function({commit},{BILLID}) {
        let QRYADV = storeHelper.getTable("QRYADV");
        let QRY = storeHelper.getTable("QRY");
        let para = {};
        para["BILLID"] = "";
        para["BILLDATE"] = QRYADV.getValue("BILLDATE");
        para["SNODEID"] = QRYADV.getValue("SNODEID");;
        para.sqlId = "51487";
        para.pageSize = "10";
        para.BILLID = pageIndex||1;
        para.keyFields = "BILLID";
        let ret = await service.doQuery(para);
        commit(Constants.M_INITDATA, { path: "QRY", data: (ret.data || {}).items });
        para.sqlId = "51488";
        let ret2 = await service.doQuery(para);
        commit(Constants.M_INITDATA, { path: "QRYALL", data: (ret2.data || {}).items });
    }
}



Store.registerModule(Constants.STORE_NAME, {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});

const mapDateTable = function (path, aFields, itemProp) {
    return storeHelper.mapGetters(path, aFields, itemProp);
}

export { mapState, mapGetters, mapDateTable, Constants };