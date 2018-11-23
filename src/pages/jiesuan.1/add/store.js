import Store from "@/store"
import { mapState } from 'vuex'
import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";
import { dateToString } from "rs-vcore/utils/Date";

const Constants = Object.assign(SConstants, {
    STORE_NAME: "jiesuan",
    M_ADDDEFAULT: "addDefault",
    M_SETDTS01: "setDts01",
    M_SETDTS02: "setDts02",
    M_SETDTS03: "setDts03",
    M_SETDTS04: "setDts04",
    M_SETDTS05: "setDts05",
    M_SETEMP: "setEmp",
    M_SETSNODE: "setSnode"
});

const storeHelper = new Store01({
    service: service,
    paths: { "MAIN": "TBV_SNSTL_M", "DTS": "TBV_SNSTLDTS_M", "STLFMITEM": "TBV_STLFMITEM", "COPYDTS": "TBV_SNSTLDTS_M" },
    MAINPATH: "MAIN",
    SUBPATH: ["DTS"],
    XULID: ""
});

const state = {
    params: { ACTION: "", STLTYPEID: "", BILLTYPEID: "" },
    ...storeHelper.mixState()
}

const mutations = {
    ...storeHelper.mixMutations(),
    [Constants.M_ADDDEFAULT]: function(state) {
        //新增默认值
        let MAIN = storeHelper.getTable("MAIN");
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
        let item = {};
        MAIN.add(item);
        //当前账套，单据类型=日结算，经营门店=用户.经营门店 ，日期=当前日，店长=当前员工，……
        MAIN.setValue("BILLTYPEID", state.BILLTYPEID);
        MAIN.setValue("DSNODEID", this.state.user.userInfo.DSNODEID);
        MAIN.setValue("DSNODEID.SNODECODE", this.state.user.userInfo.DSNODECODE);
        MAIN.setValue("DSNODEID.SNODENAME", this.state.user.userInfo.DSNODENAME);
        //员工....
        //...
        MAIN.setValue("BILLDATE", dateToString(new Date()));
        MAIN.setValue("STLFMID", STLFMITEM.getValue("STLFMID"));
        MAIN.setValue("STLFMCODE", STLFMITEM.getValue("STLFMCODE"));
    },
    [Constants.M_SETDTS01]: function(state) {
        //加载 结算模板.所有 结算项目 判断 处理方式
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
        let DTS = storeHelper.getTable("DTS");
        STLFMITEM.data.forEach(item => {
            let titem = {};
            titem[""] = item[""];
            DTS.add(titem);
        });
    },
    [Constants.M_SETDTS02]: function(state) {
        //继承 用户移除(否)
        let COPYDTS = storeHelper.getTable("COPYDTS");
    },
    [Constants.M_SETDTS03]: function(state) {
        //判断 项目显示(否)
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
    },
    [Constants.M_SETDTS04]: function(state) {
        //据 结算项目.分录号(顺序)、整理 分录号
        let DTS = storeHelper.getTable("DTS");
    },
    [Constants.M_SETDTS05]: function(state) {
        //处理 金额
        let DTS = storeHelper.getTable("DTS");
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
    add: async function({ dispatch, commit, state }) {
        //初始化所有数据源
        commit(Constants.M_INITBYPATH, {
            paths: ["MAIN", "DTS"]
        });
        //获取模板
        let ret1 = await service.doLoadSTLFMITE({ STLTYPEID: state.params.STLTYPEID });
        commit(Constants.M_INITDATA, { path: "STLFMITEM", data: (ret1 || {}).items });
        //新增主表数据源
        commit(Constants.M_ADDDEFAULT);

        //获取继承数据
        let MAIN = storeHelper.getTable("MAIN");
        let DSNODEID = MAIN.getValue("DSNODEID");
        let STLFMID = MAIN.getValue("STLFMID");
        let ret2 = await service.doLoadCOPYDTS({ DSNODEID, STLFMID });
        commit(Constants.M_INITDATA, { path: "COPYDTS", data: (ret2 || {}).items });

        //五步运算
        commit(Constants.M_SETDTS01);
        commit(Constants.M_SETDTS02);
        commit(Constants.M_SETDTS03);
        commit(Constants.M_SETDTS04);
        commit(Constants.M_SETDTS05);
    },
    loadCOPYDTS: async function({ dispatch, commit }) {
        let MAIN = storeHelper.getTable("MAIN");
        let DSNODEID = MAIN.getValue("DSNODEID");
        let STLFMID = MAIN.getValue("STLFMID");
        let ret = await service.doLoadCOPYDTS({ DSNODEID, STLFMID });
        commit(Constants.M_BATCHSETDATA, ret.data);
        commit(Constants.M_SETDTS02);
        commit(Constants.M_SETDTS03);
        commit(Constants.M_SETDTS04);
        commit(Constants.M_SETDTS05);
    },
    loadSTLFMITE: async function({ dispatch, commit, state }) {
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
        let STLFMID = STLFMITEM.getValue("STLFMID");
        let ret = await service.doLoadSTLFMITE({ STLTYPEID: state.params.STLTYPEID });
        commit(Constants.M_BATCHSETDATA, ret.data);
        if (STLFMID != STLFMITEM.getValue("STLFMID")) {
            commit(Constants.M_SETDTS01);
            commit(Constants.M_SETDTS02);
            commit(Constants.M_SETDTS03);
            commit(Constants.M_SETDTS04);
            commit(Constants.M_SETDTS05);
        }
    },
    setSnode: async function({ dispatch, commit }, { path, item }) {
        commit(Constants.M_SETSNODE, { path, item });
        dispatch("loadCOPYDTS");
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