import Store from "@/store"
import { createNamespacedHelpers } from 'vuex'
import service from "../service";
import { Store02, Constants as SConstants } from "rs-vcore/store/Store02";
import { dateToString, dateAdd, stringToDate } from "rs-vcore/utils/Date";

const Constants = Object.assign({}, SConstants, {
    STORE_NAME: "bvsale",
    M_ADDDEFAULT: "addDefault",
    M_SETBUSTYPE: "setBusType",
    M_SETSNODE: "setSnode",
    M_SETSNODEXY: "setSnodeXY",
    M_SETSALEPLC: "setSalePlc",
    M_SETAMTLMT: "setAMTLMT",
    M_SETCUST: "setCust",
    M_ADDDTS: "addDTS",
    P_PATHS: {
        MAIN: "MAIN",
        DTS: "DTS",
        MAT: "MAT",
        AMTLMT: "AMTLMT"
    }
});

const { mapState, mapGetters } = createNamespacedHelpers(Constants.STORE_NAME);

const storeHelper = new Store02({
    paths: { "MAIN": "TSL_SALE_4MOBILE", "DTS": "TSL_SALEDTSPC", "MAT": "VSL_MATERIAL_SEL_4BVSALE", "AMTLMT": "" }
});

const state = {
    params: { ACTION: "", BILLTYPEID: "" },
    OQTY: {},
    PLCMID: {},
    ...storeHelper.mixState()
}

const getters = {
    DTSMESSAGE() {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        var SDATE = MAIN.getValue('SNODEID.SDATE');
        var EDATE = MAIN.getValue('SNODEID.EDATE');
        var ISXY = MAIN.getValue('SNODEID.ISXY');
        var BILLDATE = MAIN.getValue('BILLDATE');
        var SNODEID = MAIN.getValue('SNODEID');
        if (!SNODEID) {
            return "请选择经营网点！"
        }
        if (BILLDATE) {
            if (BILLDATE < SDATE || BILLDATE > EDATE) {
                return "该网点,超经营期限。请与相关人员联系！"
            }
        }
        if ("1" == ISXY) {
            return "该网点,息业，请与相关人员联系！";
        }
        var SALEPLCID = MAIN.getValue('SALEPLCID');
        if (!SALEPLCID) {
            return "该网点,无订货政策，请与相关人员联系！"
        }
        return "";
    }
}
const mutations = {
    ...storeHelper.mixMutations(),
    [Constants.M_ADDDEFAULT]: function(state) {
        let item = {};
        let SNODEID = state.params.SNODEID || this.getters.userInfo.SNODEID;
        let BILLDATE = state.params.BILLDATE || dateToString(dateAdd(new Date(), 'd', 1));
        item["OBJTYPEID"] = 9021;
        item["SNODEID"] = SNODEID;
        item["BILLDATE"] = BILLDATE;
        item["BUSTYPEID"] = 100993;
        item["BILLTYPEID"] = 232;
        item["STATE"] = 9937;
        item["FACID"] = 0;
        storeHelper.getTable("MAIN").add(item);
    },
    [Constants.M_SETBUSTYPE]: function(state, { item }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue("MSTYPEID", item["MSTYPEID"]);
        MAIN.setValue("SALETYPEID", item["SALETYPEID"]);
        MAIN.setValue("ISCBYFEE", item["ISCBYFEE"]);
        MAIN.setValue("CBYFEE", item["CBYFEE"]);
        MAIN.setValue("LADTYPEID", item["LADTYPEID"]);
        MAIN.setValue("DLVTYPEID", item["DLVTYPEID"]);
    },
    [Constants.M_SETSNODE]: function(state, { item }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue("SNODEID", item["SNODEID"]);
        MAIN.setValue("SNODEID.SDATE", item["SDATE"]);
        MAIN.setValue("SNODEID.EDATE", item["EDATE"]);
        MAIN.setValue("DEPTID", item["DEPTID"]);
        MAIN.setValue("EMPID", item["EMPID"]);
        MAIN.setValue("RPSTID", item["RPSTID"]);
        MAIN.setValue("CUSTID", item["CUSTID"]);
        MAIN.setValue("SNODEID.DISTID", item["DISTID"]);
        MAIN.setValue("SNODEID.MNGTYPEID", item["MNGTYPEID"]);
        MAIN.setValue("MNGTYPEID", item["MNGTYPEID"]);
        MAIN.setValue("INVTYPEID", item["INVTYPEID"]);
        MAIN.setValue("STLTYPEID", item["STLTYPEID"]);
    },
    [Constants.M_SETSNODEXY]: function(state, { data }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        data = data || [];
        MAIN.setValue("SNODEID.ISXY", data.length > 0 ? "1" : "0");
    },
    [Constants.M_SETCUST]: function(state, { item }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue("INVTYPEID", item["INVTYPEID"] || "");
        MAIN.setValue("STLTYPEID", item["STLTYPEID"] || "");
    },
    [Constants.M_SETSALEPLC]: function(state, { item }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue("SALEPLCID", item["SALEPLCID"] || "");
    },
    [Constants.M_SETAMTLMT]: function(state) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let AMTLMT = storeHelper.getTable(Constants.P_PATHS.AMTLMT);
        state.PLCMID = {};
        AMTLMT.data.forEach(item => {
            state.PLCMID[item["MID"]] = item["MINQTY"];
        })
    },
    [Constants.M_ADDDTS]: function(state) {
        let DTS = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let MAT = storeHelper.getTable(Constants.P_PATHS.MAT);
        //记录历史值、清空明细        
        state.OQTY = {};
        DTS.data.forEach((item) => {
            state.OQTY[item["MID"]] = item["QTY"];
        });
        DTS.clear();
        MAT.data.forEach((item, i) => {
            let titem = {};
            titem["MID"] = item["MID"];
            titem["BILLID"] = item["BILLID"];
            titem["ENTRYNUM"] = i + 1;
            titem["MID.MCODE"] = item["MID.MCODE"];
            titem["PRC"] = item["PRC"];
            titem["TAXRATE"] = item["TAXRATE"];
            titem["QTY"] = state.OQTY[item["MID"]] || "";
            titem["MINQTY"] = state.PLCMID[item["MID"]] || "";
            titem["MID.MNAME"] = item["MID.MNAME"];
            titem["MID.SIZETYPE"] = item["MID.SIZETYPE"];
            titem["UNITID"] = item["MID.SUNITID"];
            titem["UNITID.UNITNAME"] = item["MID.SUNITNAME"];
            titem["UNITID.UNITRATE"] = item["MID.SUNITRATE"];
            titem["UNITID.SUNITRATE"] = item["MID.SUNITRATE"];
            titem["UNITID.UUNITRATE"] = item["MID.UUNITRATE"];
            titem["UNITID.SUNITNAME"] = item["MID.SUNITNAME"];
            titem["UNITID.UUNITNAME"] = item["MID.UUNITNAME"];
            titem["UNITID.MUNITNAME"] = item["MID.MUNITNAME"];
            titem["UNITID.SQTYPREC"] = item["MID.SQTYPREC"];
            titem["UNITID.MQTYPREC"] = item["MID.MQTYPREC"];
            DTS.add(titem);
        });
    }
}
const actions = {
    ...storeHelper.mixActions(),
    async add({ commit, state, dispatch }) {
        //初始化
        commit(Constants.M_INITBYPATH, { paths: [Constants.P_PATHS.MAIN, Constants.P_PATHS.DTS] });
        //新增默认
        commit(Constants.M_ADDDEFAULT);
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        //业务类型赋值
        let ret = await service.doQueryBusType({ BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID") });
        commit(Constants.M_SETBUSTYPE, { item: (ret.data.items[0] || {}) });
        //网点赋值
        let SNODEID = MAIN.getValue("SNODEID");
        let BILLDATE = MAIN.getValue("BILLDATE");
        let item = {};
        if (SNODEID) {
            ret = await service.doQuerySnode({ SNODEID });
            item = ret.data.items[0] || {};
            commit(Constants.M_SETSNODE, { item });
            let WEEK = stringToDate(BILLDATE);
            WEEK = WEEK.getDay() == 0 ? 7 : WEEK.getDay();
            //息业信息
            ret = await service.doCheckXiYe({ SNODEID, BILLDATE, WEEK });
            commit(Constants.M_SETSNODEXY, { data: ret.data.items || [] });
            //客户赋值
            ret = await service.doQueryCust({ CUSTID: MAIN.getValue("CUSTID") });
            commit(Constants.M_SETCUST, { item: (ret.data.items[0] || {}) });
            //获取销售政策
            ret = await service.doQuerySalePlc({ BILLDATE, SNODEID });
            commit(Constants.M_SETSALEPLC, { item: (ret.data.items[0] || {}) });
            let SALEPLCID = MAIN.getValue("SALEPLCID");
            if (SALEPLCID) {
                await dispatch("changeSalePlc");
            } else {
                //清空：新增已清空无需处理
            }
        } else {
            //清空：新增已清空无需处理
        }
    },

    async changeSnode({ commit, dispatch }, item) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        //网点赋值
        commit(Constants.M_SETSNODE, { item });
        let SNODEID = MAIN.getValue("SNODEID");
        let BILLDATE = MAIN.getValue("BILLDATE");
        let WEEK = stringToDate(BILLDATE);
        WEEK = WEEK.getDay() == 0 ? 7 : WEEK.getDay();
        //息业信息
        ret = await service.doCheckXiYe({ SNODEID, BILLDATE, WEEK });
        //息业赋值
        ret = await service.doCheckXiYe({ SNODEID, BILLDATE });
        commit(Constants.M_SETSNODEXY, { data: ret.data.items || [] });
        //客户赋值
        ret = await service.doQueryCust({ CUSTID: MAIN.getValue("CUSTID") });
        commit(Constants.M_SETCUST, { item: (ret.data.items[0] || {}) });
        let OSALEPLCID = MAIN.getValue("SALEPLCID");
        //获取销售政策
        ret = await service.doQuerySalePlc({ BILLDATE, SNODEID });
        commit(Constants.M_SETSALEPLC, { item: (ret.data.items[0] || {}) });
        let SALEPLCID = MAIN.getValue("SALEPLCID");
        //政策改变重新取
        if (SALEPLCID != OSALEPLCID) {
            await dispatch("changeSalePlc");
        }
    },
    async changeBillDate({ commit, dispatch }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let SNODEID = MAIN.getValue("SNODEID");
        let BILLDATE = MAIN.getValue("BILLDATE");
        let OSALEPLCID = MAIN.getValue("SALEPLCID");
        //获取销售政策
        ret = await service.doQuerySalePlc({ BILLDATE, SNODEID });
        commit(Constants.M_SETSALEPLC, { item: (ret.data.items[0] || {}) });
        let SALEPLCID = MAIN.getValue("SALEPLCID");
        //政策改变重新取
        if (SALEPLCID != OSALEPLCID) {
            await dispatch("changeSalePlc");
        }
    },
    async changeSalePlc({ commit }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        //获取销售政策明细
        ret = await service.doQuerySalePlcDts({ SALEPLCID });
        commit(Constants.M_INITDATA, { path: Constants.P_PATHS.MAT, data: (ret.data || {}).items });
        //获取最小金额
        ret = await service.doQueryAMTLMT({ DISTID: MAIN.getValue("SNODEID.DISTID"), SNODEID: MAIN.getValue("SNODEID"), BILLDATE: MAIN.getValue("BILLDATE"), MNGTYPEID: MAIN.getValue("MNGTYPEID") });
        commit(Constants.M_INITDATA, { path: Constants.P_PATHS.AMTLMT, data: (ret.data || {}).items });
        //设置最小金额
        commit(Constants.M_SETAMTLMT);
        //依据政策新增明细表
        commit(Constants.M_ADDDTS);
    },
    async open({ commit }, DID) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        let ret = await service.doOpen({ MAIN, DTS, DID });
        commit(Constants.M_BATCHSETDATA, { data: ret.data || {} });
    },
    async save() {
        let saveTables = {};
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        saveTables[Constants.P_PATHS.MAIN] = MAIN.getXML();
        saveTables[Constants.P_PATHS.DTS] = DTS.getXML();
        await service.doSave({ saveTables });
    },
    async delete() {
        let saveTables = {};
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        //MAIN.clear();
        //DTS.clear();
        saveTables[Constants.P_PATHS.MAIN] = MAIN.getXML();
        saveTables[Constants.P_PATHS.DTS] = DTS.getXML();
        await service.doDelete({ saveTables });
    }
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

export { mapState, mapGetters, mapDateTable, Constants }