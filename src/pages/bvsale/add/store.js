import Store from "@/store"
import { createNamespacedHelpers } from 'vuex'
import service from "../service";
import { Store02, Constants as SConstants } from "rs-vcore/store/Store02";
import { dateToString, dateAdd, stringToDate } from "rs-vcore/utils/Date";
import { isNumber, toNumber, isNull } from "rs-vcore/utils/String";
import { getPromise } from "rs-vcore/utils/Promise";

const Constants = Object.assign({}, SConstants, {
    STORE_NAME: "bvsale",
    M_ADDDEFAULT: "addDefault",
    M_SETBUSTYPE: "setBusType",
    M_SETSNODE: "setSnode",
    M_SETSNODEXY: "setSnodeXY",
    M_SETSALEPLC: "setSalePlc",
    M_SETAMTLMT: "setAMTLMT",
    M_SETMINQTY: "setMinQty",
    M_SETCUST: "setCust",
    M_SETPERIOD: "setPeriod",
    M_ADDDTS: "addDTS",
    M_SETMAINKEY: "setMainKey",
    M_SETDTSKEY: "setDtsKey",
    M_SETMAKEINFO: "setMakeInfo",
    M_SETDTSQTY: "setDtsQty",
    M_SETSELECTED: "setSelected",
    M_SETBILLCODE: "setBillCode",
    P_PATHS: {
        MAIN: "MAIN",
        DTS: "DTS",
        MAT: "MAT",
        AMTLMT: "AMTLMT"
    }
});

const { mapState, mapGetters } = createNamespacedHelpers(Constants.STORE_NAME);

const storeHelper = new Store02({
    paths: { "MAIN": "TSL_SALE_4MOBILE", "DTS": "TSL_SALEDTSPC", "SALEDTS": "TSL_SALEDTS", "SALEDTSF": "TSL_SALEDTSF", "MAT": "VSL_MATERIAL_SEL_4BVSALE", "AMTLMT": "" }
});

const state = {
    params: { ACTION: "", BILLTYPEID: "" },
    SELECTED: "1",
    OQTY: {},
    PLCMID: {},
    ...storeHelper.mixState()
}

const getters = {
    ISSHOWSAVE() {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        return MAIN.getValue("ISTALLY") != "1" && MAIN.count() == 1
    },
    ISSHOWDELETE() {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        return MAIN.getValue("ISTALLY") != "1" && MAIN.count() == 1 && !MAIN.isAdd()
    },
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
    },
    DTSITEMS(state) {
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        return DTS.data.filter((item) => {
            if (state.SELECTED == "1") {
                return true
            }
            if (state.SELECTED == "2") {
                return item["QTY"] > 0;
            }
            if (state.SELECTED == "3") {
                return item["QTY"] <= 0;
            }
        });
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
        MAIN.setValue("SNODEID.SNODECODE", item["SNODECODE"]);
        MAIN.setValue("SNODEID.SNODENAME", item["SNODENAME"]);
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
    [Constants.M_SETAMTLMT]: function(state, { data }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let MINAMT = 0;
        if (data.length > 0) {
            MINAMT = isNumber(data[0]["MINAMT"]) ? data[0]["MINAMT"] : 0;
        }
        MAIN.setValue("MINAMT", MINAMT);
    },
    [Constants.M_SETMINQTY]: function(state, { data }) {
        state.PLCMID = {};
        data.forEach(item => {
            state.PLCMID[item["MID"]] = item["MINQTY"];
        })
    },
    [Constants.M_ADDDTS]: function(state) {
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
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
            titem["AMT"] = "";
            titem["TAXRATE"] = item["TAXRATE"];
            titem["QTY"] = state.OQTY[item["MID"]] || "";
            titem["MINQTY"] = state.PLCMID[item["MID"]] || "";
            titem["MID.MNAME"] = item["MID.MNAME"];
            titem["MID.SIZETYPE"] = item["MID.SIZETYPE"];
            titem["UNITID"] = item["MID.SUNITID"];
            titem["MID.UNITNAME"] = item["MID.SUNITNAME"];
            titem["MID.UNITRATE"] = item["MID.SUNITRATE"];
            titem["MID.SUNITRATE"] = item["MID.SUNITRATE"];
            titem["MID.UUNITRATE"] = item["MID.UUNITRATE"];
            titem["MID.SUNITNAME"] = item["MID.SUNITNAME"];
            titem["MID.UUNITNAME"] = item["MID.UUNITNAME"];
            titem["MID.MUNITNAME"] = item["MID.MUNITNAME"];
            titem["MID.SQTYPREC"] = item["MID.SQTYPREC"];
            titem["MID.MQTYPREC"] = item["MID.MQTYPREC"];
            DTS.add(titem);
        });
    },
    [Constants.M_SETPERIOD]: function(state, { PTYPE, VALUE }) {
        let YEAR = VALUE.PYEAR || "";
        let MONTH = VALUE.PMONTH || "";
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue(PTYPE == 192 ? "FYEAR" : "PYEAR", YEAR);
        MAIN.setValue(PTYPE == 192 ? "FMONTH" : "PMONTH", MONTH);
    },
    [Constants.M_SETMAINKEY]: function(state, { data }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        MAIN.setValue("BILLID", data);
        DTS.data.forEach((item) => {
            DTS.setValue("BILLID", data, item);
        })
    },
    [Constants.M_SETDTSKEY]: function(state, { data }) {
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        let items = DTS.data.filter((item) => {!item["ENTRYID"] });
        data = parseFloat(data);
        items.forEach((item, i) => {
            item["ENTRYID"] = (data - items.length + 1 + i)
        })
    },
    [Constants.M_SETMAKEINFO]: function(state, { data }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue("MAKEDATE", data);
        MAIN.setValue("MAKERID", this.getters.userInfo.AUID);
    },
    [Constants.M_SETDTSQTY]: function(state, { QTY, item }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        var UNITRATE = item["MID.SUNITRATE"] /*单位转换率*/ ,
            UUNITRATE = item["MID.UUNITRATE"] /*常用单位转换率*/ ,
            UNITNAME = item["MID.SUNITNAME"] /*单位名称*/ ,
            UUNITNAME = item["MID.UUNITNAME"] /*常用单位*/ ,
            MUNITNAME = item["MID.MUNITNAME"] /*基本单位*/ ,
            QTYPREC = ~~item["MID.SQTYPREC"] /*单位精度*/ ,
            MQTYPREC = ~~item["MID.MQTYPREC"] /*基本单位精度*/ ,
            PRC = toNumber(item["PRC"]);
        QTY = toNumber(QTY);
        QTY = Math.round(QTY * Math.pow(10, QTYPREC)) / Math.pow(10, QTYPREC);
        let MQTY = QTY * UNITRATE;
        if (parseInt(MQTY, 10) != parseFloat(MQTY))
            QTY = 0;
        DTS.setValue("QTY", QTY || '', item);
        DTS.setValue("AMT", parseFloat((QTY * PRC).toFixed(2)), item);
        var UQTY = QTY2UQTY(QTY, UNITRATE, UUNITRATE, UUNITNAME, MUNITNAME, MQTYPREC);
        DTS.setValue("UQTY", UQTY, item);

        let AMT = 0;
        DTS.data.forEach((item) => {
            AMT += toNumber(item["PRC"] * item["QTY"]);
        })
        MAIN.setValue("AMT", AMT);
    },
    [Constants.M_SETSELECTED]: function(state, v) {
        state.SELECTED = v;
    },
    [Constants.M_SETBILLCODE]: function(state, { data }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        MAIN.setValue("BILLCODE", data);
    }
}

const QTY2UQTY = function(QTY, UNITRATE, UUNITRATE, UUNITNAME, MUNITNAME, MQTYPREC) {
    var T1 = 0,
        T2 = 0;
    QTY = isNull(QTY) || isNaN(QTY) ? 0 : QTY;
    UNITRATE = isNull(UNITRATE) || isNaN(UNITRATE) ? 0 : UNITRATE;
    UUNITRATE = isNull(UUNITRATE) || isNaN(UUNITRATE) ? 0 : UUNITRATE;
    UUNITNAME = isNull(UUNITNAME) ? "" : UUNITNAME;
    MUNITNAME = isNull(MUNITNAME) ? "" : MUNITNAME;
    MQTYPREC = isNull(MQTYPREC) || isNaN(MQTYPREC) ? 0 : MQTYPREC;

    if (1 == UNITRATE && 1 == UUNITRATE) {
        return 0 == QTY ? "" : (QTY + UUNITNAME);
    }
    if (~~UNITRATE != 0 && ~~UUNITRATE != 0) {
        T1 = Math.abs(parseInt((QTY * UNITRATE) / UUNITRATE), 10);
        T2 = this.DealWithQTYPREC(Math.abs(QTY * UNITRATE) - T1 * UUNITRATE, MQTYPREC);
    }
    return (QTY >= 0 ? "" : "-") + (T1 == 0 ? "" : T1 + UUNITNAME) + (T2 == 0 ? "" : T2 + MUNITNAME);
}

const checkNull = async function() {
    let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
    let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
    let nullError = [];
    let msg = [];
    if (!MAIN.getValue("SNODEID")) {
        nullError.push("经营网点");
    }
    if (!MAIN.getValue("BILLDATE")) {
        nullError.push("单据日期");
    }
    if (nullError.length > 0) {
        msg.push(nullError + " 空")
    }
    if (msg.length > 0) {
        throw new Error(msg.join('\n') + "，不可保存");
    }
    if (DTS.data.filter((item) => { return item['QTY'] > 0 }) == 0) {
        msg.push("没有具体订货")
    }

    if (DTS.data.find((item) => { return toNumber(item["MINQTY"]) > toNumber(item["QTY"]) })) {
        msg.push("最小订量,未满足")
    }
    if (toNumber(DTS.getValue("AMT")) < toNumber(MAIN.getValue("MINAMT"))) {
        msg.push("订货金额<最小金额")
    }

    let BILLDATE = MAIN.getValue("BILLDATE");
    let DAY = (await service.doGetDate()).data;
    let DAY1 = dateToString(dateAdd(stringToDate(DAY), "d", 1));
    let DAY10 = dateToString(dateAdd(stringToDate(DAY), "d", 10));
    //“订货日期<当前日期+1，不可保存！”
    if (BILLDATE < DAY1) {
        msg.push("订货日期<当前日期+1")
    }
    //“订货日期>当前日期+10，不可保存！”
    if (BILLDATE > DAY10) {
        msg.push("订货日期>当前日期+10")
    }
    ///订货日期<经营期限.开始日期 or 订货日期>经营期限.结束日期：“该网点,超经营期限，不可保存！”
    let SDATE = MAIN.getValue('SNODEID.SDATE');
    let EDATE = MAIN.getValue('SNODEID.EDATE');
    if (BILLDATE) {
        if (BILLDATE < SDATE || BILLDATE > EDATE) {
            msg.push("该网点,超经营期限")
        }
    }
    if (msg.length > 0) {
        throw new Error(msg.join('\n') + "，不可保存");
    }
    if (!MAIN.isAdd()) {
        //已审核 ，不可保存！
        let ret = await service.doQueryOrderStatus({ BILLID: MAIN.getValue("BILLID") })
        if (ret.data.items.length == 0) {
            msg.push("已删除")
        } else if (ret.data.items[0]["ISTALLY"] == 1) {
            msg.push("已审核")
        }
        if (msg.length > 0) {
            throw new Error(msg.join('\n') + "，不可保存");
        }
    }
    //对应日期,已有订货，不可保存！
    let ret = await service.doCheckIsOrder({ BILLID: MAIN.getValue("BILLID"), BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID"), BILLDATE, SNODEID: MAIN.getValue("SNODEID") })
    if (ret.data.items.length > 0) {
        msg.push("对应日期,已有订货")
    }

    if (msg.length > 0) {
        throw new Error(msg.join('\n') + "，不可保存");
    }
}

const actions = {
    ...storeHelper.mixActions(),
    async add({ commit, state, dispatch }) {
        commit(Constants.M_SETSELECTED, "1");
        //初始化
        commit(Constants.M_INITBYPATH, { paths: [Constants.P_PATHS.MAIN, Constants.P_PATHS.DTS] });
        //新增默认
        commit(Constants.M_ADDDEFAULT);
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        //网点赋值
        let SNODEID = MAIN.getValue("SNODEID");
        let BILLDATE = MAIN.getValue("BILLDATE");
        //判断当前是否已做销货单
        let ret = await service.doCheckIsOrder({ SNODEID, BILLDATE, BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID") });
        if (ret.data.items.length == 1) {
            dispatch("open", ret.data.items[0]["BILLID"]);
            return
        }
        //业务类型赋值
        ret = await service.doQueryBusType({ BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID") });
        commit(Constants.M_SETBUSTYPE, { item: (ret.data.items[0] || {}) });

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
        if (BILLDATE) {
            //获取期间
            //会计期间
            ret = await service.doGetPeriod({ PTYPE: "191", BILLDATE });
            commit(Constants.M_SETPERIOD, { PTYPE: 191, VALUE: (ret.data.VALUE || {}) })

            //销售期间
            ret = await service.doGetPeriod({ PTYPE: "192", BILLDATE });
            commit(Constants.M_SETPERIOD, { PTYPE: 192, VALUE: (ret.data.VALUE || {}) })
        }

    },
    async changeSnode({ commit, dispatch }, { item }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        //网点赋值
        commit(Constants.M_SETSNODE, { item });
        let SNODEID = MAIN.getValue("SNODEID");
        let BILLDATE = MAIN.getValue("BILLDATE");
        //判断当前是否已做销货单
        let ret = await service.doCheckIsOrder({ SNODEID, BILLDATE, BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID") });
        if (ret.data.items.length == 1) {
            dispatch("open", ret.data.items[0]["BILLID"]);
            return
        }
        let WEEK = stringToDate(BILLDATE);
        WEEK = WEEK.getDay() == 0 ? 7 : WEEK.getDay();
        //息业信息
        ret = await service.doCheckXiYe({ SNODEID, BILLDATE, WEEK });
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
        //判断当前是否已做销货单
        let ret = await service.doCheckIsOrder({ SNODEID, BILLDATE, BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID") });
        if (ret.data.items.length == 1) {
            dispatch("open", ret.data.items[0]["BILLID"]);
            return
        }
        //获取销售政策
        ret = await service.doQuerySalePlc({ BILLDATE, SNODEID });
        commit(Constants.M_SETSALEPLC, { item: (ret.data.items[0] || {}) });
        let SALEPLCID = MAIN.getValue("SALEPLCID");
        //政策改变重新取
        if (SALEPLCID != OSALEPLCID) {
            await dispatch("changeSalePlc");
        }
        //获取期间
        //会计期间
        ret = await service.doGetPeriod({ PTYPE: "191", BILLDATE });
        commit(Constants.M_SETPERIOD, { PTYPE: 191, VALUE: (ret.data.VALUE || {}) })

        //销售期间
        ret = await service.doGetPeriod({ PTYPE: "192", BILLDATE });
        commit(Constants.M_SETPERIOD, { PTYPE: 192, VALUE: (ret.data.VALUE || {}) })
    },
    async changeSalePlc({ commit }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let SALEPLCID = MAIN.getValue("SALEPLCID");
        //获取销售政策明细
        let ret = await service.doQuerySalePlcDts({ SALEPLCID });
        commit(Constants.M_INITDATA, { path: Constants.P_PATHS.MAT, data: (ret.data || {}).items });
        //获取最小金额
        ret = await service.doQueryAMTLMT({ DISTID: MAIN.getValue("SNODEID.DISTID"), SNODEID: MAIN.getValue("SNODEID"), BILLDATE: MAIN.getValue("BILLDATE"), MNGTYPEID: MAIN.getValue("MNGTYPEID") });
        //设置最小金额
        commit(Constants.M_SETAMTLMT, { data: (ret.data || {}).items });
        //获取最小订货量
        ret = await service.doQueryMINQTY({ SALEPLCID });
        commit(Constants.M_SETMINQTY, { data: (ret.data || {}).items });
        //依据政策新增明细表
        commit(Constants.M_ADDDTS);
    },
    async open({ commit }, DID) {
        commit(Constants.M_SETSELECTED, "2");
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        let ret = await service.doOpen({ MAIN, DTS, DID });
        commit(Constants.M_BATCHSETDATA, { data: ret.data || {} });
    },
    async _beforeSave({ commit }) {
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        //检查空
        await getPromise(checkNull);
        //debugger;
        //处理单据号
        if (!MAIN.getValue("BILLCODE")) {
            let ret = await service.doGetBillCode({ AID: this.getters.userInfo.AID, AUID: this.getters.userInfo.AUID, BILLTYPEID: MAIN.getValue("BILLTYPEID"), BUSTYPEID: MAIN.getValue("BUSTYPEID"), BILLDATE: MAIN.getValue("BILLDATE") })
            if (!ret.data) {
                throw new Error("单号获取失败！");
            } else {
                commit(Constants.M_SETBILLCODE, { data: ret.data });
            }

        }
        //处理主外键
        if (!MAIN.getValue("BILLID")) {
            let ret = await service.doGetNewID(MAIN.scm, 1);
            commit(Constants.M_SETMAINKEY, { data: ret.did });
        } else {
            commit(Constants.M_SETMAINKEY, { data: MAIN.getValue("BILLID") });
        }
        //设置明细表主键
        let len = DTS.data.filter((item) => { return !item["ENTRYID"] }).length;
        if (len > 0) {
            let ret = await service.doGetNewID(DTS.scm, len);
            commit(Constants.M_SETDTSKEY, { data: ret.did });
        }
        //处理制单人制单时间
        let ret = await service.doGetDateTime();
        commit(Constants.M_SETMAKEINFO, { data: ret.data });
    },
    async save({ dispatch }) {
        await dispatch("_beforeSave");
        let saveTables = {};
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        saveTables["SALE"] = MAIN.getXML();
        saveTables["SALEDTSPC"] = DTS.getXML();
        saveTables["SALEDTS"] = storeHelper.getTable("SALEDTS").getXML();
        saveTables["SALEDTSF"] = storeHelper.getTable("SALEDTSF").getXML();
        await service.doSave({ saveTables, BILLID: MAIN.getValue("BILLID") });
    },
    async delete() {
        let saveTables = {};
        let MAIN = storeHelper.getTable(Constants.P_PATHS.MAIN);
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        let BILLID = MAIN.getValue("BILLID");
        MAIN.clear();
        DTS.clear();
        saveTables["SALE"] = MAIN.getXML();
        saveTables["SALEDTSPC"] = DTS.getXML();
        saveTables["SALEDTS"] = storeHelper.getTable("SALEDTS").getXML();
        saveTables["SALEDTSF"] = storeHelper.getTable("SALEDTSF").getXML();
        await service.doDelete({ saveTables, BILLID });
    },
    upMat({ commit, state, getters }, item) {
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        let cidx = -2;
        let items = getters.DTSITEMS;
        items.forEach((titem, index) => {
            if (titem["MID"] == item["MID"]) {
                cidx = index;
            }
        });
        return items[cidx - 1];
    },
    downMat({ commit, getters }, item) {
        let DTS = storeHelper.getTable(Constants.P_PATHS.DTS);
        let cidx = -2;
        let items = getters.DTSITEMS;
        items.forEach((titem, index) => {
            if (titem["MID"] == item["MID"]) {
                cidx = index;
            }
        });
        return DTS.data[cidx + 1];
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