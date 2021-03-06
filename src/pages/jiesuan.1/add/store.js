import Store from "@/store"
import { createNamespacedHelpers } from 'vuex'
import service from "../service";
import { Store01, Constants as SConstants } from "rs-vcore/store/Store01";
import { dateToString, getTime } from "rs-vcore/utils/Date";
import { execFormula, isNull } from "rs-vcore/utils/String";

const Constants = Object.assign({}, SConstants, {
    STORE_NAME: "jiesuan1",
    M_ADDDEFAULT: "addDefault",
    M_SETDTS01: "setDts01",
    M_SETDTS02: "setDts02",
    M_SETDTS03: "setDts03",
    M_SETDTS04: "setDts04",
    M_SETDTS05: "setDts05",
    M_SETAMT: "setAMT",
    M_SETEMP: "setEmp",
    M_SETSNODE: "setSnode",
    M_SETSETDTS: "setSetDTS",
    M_SETDTSISDELBYU: "setDTSISDELBYU",
    M_SETREJECTAMT: "setRejectAMT",
    M_SETDEADLINE: "setDEADLINE"
});
const { mapState, mapGetters } = createNamespacedHelpers(Constants.STORE_NAME);
const storeHelper = new Store01({
    service: service,
    paths: { "MAIN": "TBV_SNSTL_M", "DTS": "TBV_SNSTLDTS_M", "SETDTS": "TBV_SNSTLDTS_M", "STLFMITEM": "TBV_STLFMITEM", "COPYDTS": "TBV_SNSTLDTS_M", "SNODE": "TBV_CHAINSND_SEL" },
    MAINPATH: "MAIN",
    SUBPATH: ["DTS"],
    XULID: "0000051437",
    OPRTFLOWID: "30307",
    EMPFIELD: "MANAGERID"
});

const state = {
    params: { ACTION: "", STLTYPEID: "", BILLTYPEID: "" },
    ...storeHelper.mixState()
}

const getters = {
    TITLE(state) {
        return state.params.BILLTYPEID == '109304' ? '分时结算' : '日结算'
    },
    ISTIME(state) {
        return state.params.BILLTYPEID == '109304'
    },
    ISSHOWSAVE(state, getters, rootState, rootGetters) {
        return (state.STATE == "Add" || state.STATE == "ToVerify") && rootGetters.pcode[getters.ISTIME ? "jiesuan-fsjs-submit" : "jiesuan-rijs-submit"];
    },
    ISSHOWDELETE(state, getters, rootState, rootGetters) {
        return (state.STATE == "ToVerify") && rootGetters.pcode[getters.ISTIME ? "jiesuan-fsjs-delete" : "jiesuan-rijs-delete"];
    },
    ISSHOWCHECK(state, getters, rootState, rootGetters) {
        return (state.STATE == "ToVerify") && rootGetters.pcode[getters.ISTIME ? "jiesuan-fsjs-verify" : "jiesuan-rijs-verify"];
    },
    ISSHOWRECHECK(state, getters, rootState, rootGetters) {
        return state.STATE == (getters.ISTIME ? "Verified" : "ToTally") && rootGetters.pcode[getters.ISTIME ? "jiesuan-fsjs-reverify" : "jiesuan-rijs-reverify"];
    }
}
const mutations = {
    ...storeHelper.mixMutations(),
    [Constants.M_SETPARAMS]: function(state, params) {
        state.params = params;
        if (state.params.BILLTYPEID == "109303") {
            storeHelper.setConfig({ XULID: "0000051437", OPRTFLOWID: "30307" });
        }
        if (state.params.BILLTYPEID == "109304") {
            storeHelper.setConfig({ XULID: "0000051465", OPRTFLOWID: "30244" });
        }
    },
    [Constants.M_ADDDEFAULT]: function(state) {
        //新增默认值
        let MAIN = storeHelper.getTable("MAIN");
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
        let item = {};
        MAIN.add(item);
        //当前账套，单据类型=日结算，经营门店=用户.经营门店 ，日期=当前日，店长=当前员工，……
        MAIN.setValue("AID", this.getters.userInfo.AID);
        MAIN.setValue("BILLTYPEID", state.params.BILLTYPEID);
        MAIN.setValue("SNODEID", this.getters.userInfo.DSNODEID);
        MAIN.setValue("SNODEID.SNODECODE", this.getters.userInfo.DSNODECODE);
        MAIN.setValue("SNODEID.SNODENAME", this.getters.userInfo.DSNODENAME);
        //员工....
        MAIN.setValue("MANAGERID", this.getters.userInfo.EMPID);
        MAIN.setValue("MANAGER", this.getters.userInfo.EMPNAME);
        MAIN.setValue("BILLDATE", dateToString(new Date()));
        MAIN.setValue("STLFMID", STLFMITEM.getValue("STLFMID"));
        MAIN.setValue("STLFMCODE", STLFMITEM.getValue("STLFMCODE"));
        if (this.getters[Constants.STORE_NAME + "/ISTIME"]) {
            MAIN.setValue("DEADLINE", getTime(new Date()));
        }
    },
    [Constants.M_SETDEADLINE]: function(state) {
        let MAIN = storeHelper.getTable("MAIN");
        let DEADLINE = MAIN.getValue("DEADLINE");
        let FHOUR = "";
        let FMINUTE = "";
        if (DEADLINE) {
            FHOUR = DEADLINE.split(':')[0];
            FMINUTE = DEADLINE.split(':')[1];
        }
        MAIN.setValue("FHOUR", FHOUR);
        MAIN.setValue("FMINUTE", FMINUTE);
    },
    [Constants.M_SETDTS01]: function(state) {
        //加载 结算模板.所有 结算项目 判断 处理方式
        let MAIN = storeHelper.getTable("MAIN");
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
        let DTS = storeHelper.getTable("DTS");
        //删除数据非初始化
        DTS.clear();
        STLFMITEM.data.forEach(item => {
            let titem = {};
            titem["ITEMID"] = item["ITEMID"];
            titem["ITEMID.PARANAME"] = item["ITEMID.PARANAME"];
            titem["STLITEMID"] = item["STLITEMID"];
            Object.keys(item).forEach(function(f) {
                titem[`STLITEMID.${f}`] = item[f];
            });
            titem["DEALTYPE"] = item["DEALTYPE"];
            DTS.add(titem);
        });
        let ISREADSTL = MAIN.getValue("SNODEID.ISREADSTL");
        if (ISREADSTL != "1") {
            DTS.data.map(item => {
                if (item["DEALTYPE"] == "EDI") {
                    DTS.setValue("DEALTYPE", "Write", item);
                }
            })
        }
    },
    [Constants.M_SETDTS02]: function(state) {
        //继承 用户移除(否)
        let COPYDTS = storeHelper.getTable("COPYDTS");
        let DTS = storeHelper.getTable("DTS");
        DTS.data.forEach(item1 => {
            DTS.setValue("ISDELBYU", 0, item1);
            if ("select" == item1["STLITEMID.ITEMPROPERTY"]) {
                let item2 = COPYDTS.data.find(item2 => { return item2["STLITEMID"] == item1["STLITEMID"] });
                if (item2) {
                    DTS.setValue("ISDELBYU", item2["ISDELBYU"], item1);
                }
            }
        })
    },
    [Constants.M_SETDTS03]: function(state) {
        //判断 项目显示(否)
        let DTS = storeHelper.getTable("DTS");
        DTS.data.forEach(item1 => {
            let ITEMPROPERTY = item1["STLITEMID.ITEMPROPERTY"];
            let ISDELBYU = item1["ISDELBYU"];
            let ISHOW = 1;
            if ("fixed" == ITEMPROPERTY) {
                ISHOW = 1;
            }
            if ("select" == ITEMPROPERTY) {
                if ("1" == ISDELBYU) {
                    ISHOW = 0;
                }
            }
            if ("hide" == ITEMPROPERTY) {
                ISHOW = 0;
            }
            DTS.setValue("ISSHOW", ISHOW, item1);
        })
        DTS.data.forEach(item1 => {
            let ITEMPROPERTY = item1["STLITEMID.ITEMPROPERTY"];
            let ISHOW = 0;
            if ("judge" == ITEMPROPERTY) {
                if (DTS.data.find(item => {
                        return (item["STLITEMID.GRPID"] == item1["ITEMID"]) && (item["ISSHOW"] == 1) && (item["ITEMID"] != item["STLITEMID.GRPID"])
                    })) {
                    ISHOW = 1;
                }
                DTS.setValue("ISSHOW", ISHOW, item1);
            }
        })
    },
    [Constants.M_SETDTS04]: function(state) {
        //据 结算项目.分录号(顺序)、整理 分录号
        let DTS = storeHelper.getTable("DTS");
        let items = DTS.data.sort((item1, item2) => {
            return parseFloat(item1["STLITEMID.ENTRYNUM"]) - parseFloat(item2["STLITEMID.ENTRYNUM"])
        })
        let ENTRYNUM = 1;
        items.forEach(item => {
            DTS.setValue("ENTRYNUM", "", item);
            if (1 == item["ISSHOW"]) {
                DTS.setValue("ENTRYNUM", ENTRYNUM++, item);
            }
        })
    },
    [Constants.M_SETDTS05]: function(state) {
        //处理 金额
        let DTS = storeHelper.getTable("DTS");
        DTS.data.forEach(item1 => {
            let AMT = "";
            if ("1" == item1["ISDELBYU"]) {
                //TODO:通过可判断
                AMT = "";
            } else {
                AMT = item1["AMT"] || item1["STLITEMID.DEFAULTVALUE"]
            }
            if ("EDI" == item1["DEALTYPE"]) {
                //TODO:待接通后考虑
            }
            DTS.setValue("AMT", AMT, item1);
        });
    },
    [Constants.M_SETAMT]: function(state) {
        let MAIN = storeHelper.getTable("MAIN");
        let DTS = storeHelper.getTable("DTS");
        let items = DTS.data.filter(item => {
            return item["STLITEMID.CFORMULA"] != ""
        }).sort((item1, item2) => {});
        items.forEach(item => {
            let AMT = execFormula(item["ITEMID.PARANAME"], (name) => {
                let titem = DTS.data.find(item1 => {
                    return item1["ITEMID.PARANAME"] == name
                })
                if (titem) {
                    return titem["STLITEMID.CFORMULA"];
                }
            }, (name) => {
                let titem = DTS.data.find(item1 => {
                    return item1["ITEMID.PARANAME"] == name
                })
                if (titem) {
                    return titem["AMT"] || 0;
                } else {
                    return 0;
                }
            });
            DTS.setValue("AMT", AMT, item);
        });
        //设置主表字段
        const FILEDITEMS = { "OFFLINEAMT": 107070, "ONLINEAMT": 107069, "DIFFAMT": 107064, "CALAMT": 107063 }
        Object.keys(FILEDITEMS).forEach(field => {
            let titem = DTS.data.find(item => {
                return item["ITEMID"] == FILEDITEMS[field];
            })
            let AMT = (titem || {})["AMT"] || 0;
            MAIN.setValue(field, AMT, titem);
        });
        let OFFLINEAMT = MAIN.getValue("OFFLINEAMT");
        let ONLINEAMT = MAIN.getValue("ONLINEAMT");
        let DIFFAMT = MAIN.getValue("DIFFAMT");
        let OFFLINERATE = parseFloat((parseFloat(OFFLINEAMT) / (parseFloat(OFFLINEAMT) + parseFloat(ONLINEAMT)) * 100).toFixed("1"));
        let ONLINERATE = parseFloat((parseFloat(ONLINEAMT) / (parseFloat(OFFLINEAMT) + parseFloat(ONLINEAMT)) * 100).toFixed("1"));
        let DIFFRATE = parseFloat((parseFloat(DIFFAMT) / (parseFloat(OFFLINEAMT) + parseFloat(ONLINEAMT)) * 100).toFixed("1"));
        MAIN.setValue("OFFLINERATE", OFFLINERATE);
        MAIN.setValue("ONLINERATE", ONLINERATE);
        MAIN.setValue("DIFFRATE", DIFFRATE);
    },
    [Constants.M_SETEMP]: function(state, { path, item }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("MANAGERID", item["EMPID"]);
        dt.setValue("MANAGER", item["EMPNAME"]);
    },
    [Constants.M_SETSNODE]: function(state, { path, item }) {
        const dt = storeHelper.getTable(path);
        dt.setValue("SNODEID", item["SNODEID"]);
        dt.setValue("SNODEID.SNODECODE", item["SNODECODE"]);
        dt.setValue("SNODEID.SNODENAME", item["SNODENAME"]);
    },
    [Constants.M_SETSETDTS]: function(state) {
        let DTS = storeHelper.getTable("DTS");
        let SETDTS = storeHelper.getTable("SETDTS");
        SETDTS.initData();
        DTS.data.forEach(item => {
            let titme = {};
            let ITEMPROPERTY = item["STLITEMID.ITEMPROPERTY"];
            let ISDELBYU = item["ISDELBYU"]
            Object.keys(item).forEach(f => {
                titme[f] = item[f];
            })
            titme["DISABLE"] = false;
            titme["ISSELECT"] = true;
            if ("select" == ITEMPROPERTY) {
                if ("1" == ISDELBYU) {
                    titme["ISSELECT"] = false;
                }
            } else {
                titme["DISABLE"] = true;
            }
            SETDTS.add(titme);
        })
    },
    [Constants.M_SETDTSISDELBYU]: function() {
        let DTS = storeHelper.getTable("DTS");
        let SETDTS = storeHelper.getTable("SETDTS");
        SETDTS.data.filter(item => { return item["DISABLE"] == false }).forEach(item1 => {
            let titem = DTS.data.find(item2 => { return item2["ITEMID"] == item1["ITEMID"] });
            if (titem) {
                DTS.setValue("ISDELBYU", (item1["ISSELECT"] ? 0 : 1), titem);
            }
        })
    },
    [Constants.M_SETREJECTAMT]: function(state, { item }) {
        let DTS = storeHelper.getTable("DTS");
        let AMT = item["AMT"];
        let STLITEMID_ISPN = item["STLITEMID.ISPN"];
        let STLITEMID_ISZERO = item["STLITEMID.ISZERO"];
        let STLITEMID_ISNN = item["STLITEMID.ISNN"];
        if ((STLITEMID_ISPN == 0 && AMT > 0) || (STLITEMID_ISZERO == 0 && AMT == 0) || (STLITEMID_ISNN == 0 && AMT < 0)) {
            DTS.setValue("AMT", "", item);
        }
    }
}

const getPromise = async function(func) {
    return new Promise(
        function(resolve, reject) {
            try {
                resolve(func());
            } catch (e) {
                reject(e);
            }
        }
    )
}

const actions = {
    ...storeHelper.mixActions(),
    add: async function({ dispatch, commit, state }) {
        await getPromise(function() {})
            //初始化所有数据源
        commit(Constants.M_INITBYPATH, {
            paths: ["MAIN", "DTS"]
        });
        //获取模板
        let ret1 = await service.doLoadSTLFMITE({ STLTYPEID: state.params.STLTYPEID, BILLDATE: dateToString(new Date()) });
        commit(Constants.M_INITDATA, { path: "STLFMITEM", data: (ret1.data || {}).items });
        //新增主表数据源
        commit(Constants.M_ADDDEFAULT);

        //获取继承数据
        let MAIN = storeHelper.getTable("MAIN");
        let DSNODEID = MAIN.getValue("SNODEID");
        let STLFMID = MAIN.getValue("STLFMID");
        let ret2 = await service.doLoadCOPYDTS({ DSNODEID, STLFMID });
        commit(Constants.M_INITDATA, { path: "COPYDTS", data: (ret2.data || {}).items });
        //五步运算
        commit(Constants.M_SETDTS01);
        commit(Constants.M_SETDTS02);
        commit(Constants.M_SETDTS03);
        commit(Constants.M_SETDTS04);
        commit(Constants.M_SETDTS05);
        commit(Constants.M_SETAMT);
        commit(Constants.M_SETSTATE);
    },
    loadCOPYDTS: async function({ dispatch, commit }) {
        let MAIN = storeHelper.getTable("MAIN");
        let DSNODEID = MAIN.getValue("SNODEID");
        let STLFMID = MAIN.getValue("STLFMID");
        let ret = await service.doLoadCOPYDTS({ DSNODEID, STLFMID });
        commit(Constants.M_INITDATA, { path: "COPYDTS", data: (ret.data || {}).items });
        commit(Constants.M_SETDTS01);
        commit(Constants.M_SETDTS02);
        commit(Constants.M_SETDTS03);
        commit(Constants.M_SETDTS04);
        commit(Constants.M_SETDTS05);
        commit(Constants.M_SETAMT);
    },
    loadSTLFMITE: async function({ dispatch, commit, state }) {
        let STLFMITEM = storeHelper.getTable("STLFMITEM");
        let STLFMID = STLFMITEM.getValue("STLFMID");
        let MAIN = storeHelper.getTable("MAIN");
        console.log(MAIN);
        let ret = await service.doLoadSTLFMITE({ STLTYPEID: state.params.STLTYPEID, BILLDATE: MAIN.getValue("BILLDATE") });
        commit(Constants.M_INITDATA, { path: "STLFMITEM", data: (ret.data || {}).items });
        if (STLFMID != STLFMITEM.getValue("STLFMID")) {
            dispatch("loadCOPYDTS");
        }
    },
    setSnode: async function({ dispatch, commit }, { path, item }) {
        commit(Constants.M_SETSNODE, { path, item });
        await dispatch("loadCOPYDTS");
    },
    setSetDTS: function({ commit }) {
        commit(Constants.M_SETDTSISDELBYU);
        commit(Constants.M_SETDTS03);
        commit(Constants.M_SETDTS04);
        commit(Constants.M_SETDTS05);
        commit(Constants.M_SETAMT);
    },
    mySave: async function({ dispatch, commit }) {
        await getPromise(checkNull);
        await dispatch("save");
    }
}
const checkNull = function() {
    //主表：“经营门店,日期,店长,单据号,<差异说明>，不可空！”
    //明细：值域的合法性    vs 可正数(否)、可0(否)、可空(否)、可负数(否)
    let MAIN = storeHelper.getTable("MAIN");
    let DTS = storeHelper.getTable("DTS");
    let nullFields = [];
    if (isNull(MAIN.getValue("SNODEID"))) {
        nullFields.push("经营门店");
    }
    if (isNull(MAIN.getValue("BILLDATE"))) {
        nullFields.push("日期");
    }
    if (isNull(MAIN.getValue("MANAGERID"))) {
        nullFields.push("店长");
    }

    if (!Store.getters[Constants.STORE_NAME + "/ISTIME"]) {
        if (isNull(MAIN.getValue("DEADTIME"))) {
            nullFields.push("截止时间");
        }
    }

    let item = DTS.data.find(item => {
        return item["ITEMID.PARANAME"] == "差异"
    })

    if (item) {
        if (!isNull(item["AMT"]) && item["AMT"] != 0) {
            if (isNull(MAIN.getValue("DIFFREMARK"))) {
                nullFields.push("差异说明");
            }
        }
    }
    let nullDtsFields = [];
    DTS.data.forEach(item => {
        let AMT = item["AMT"];
        let STLITEMID_ISPN = item["STLITEMID.ISPN"];
        let STLITEMID_ISNULLF = item["STLITEMID.ISNULLF"]
        let STLITEMID_ISZERO = item["STLITEMID.ISZERO"];
        let STLITEMID_ISNN = item["STLITEMID.ISNN"];
        if ((STLITEMID_ISPN == 0 && AMT > 0) || (STLITEMID_ISNULLF == 0 && isNull(AMT)) || (STLITEMID_ISZERO == 0 && AMT == 0) || (STLITEMID_ISNN == 0 && AMT < 0)) {

        }
        if (STLITEMID_ISPN == 0 && AMT > 0) {
            nullDtsFields.push("\n" + item["ITEMID.PARANAME"] + "金额不可大于零");
        }
        if (STLITEMID_ISNULLF == 0 && isNull(AMT)) {
            nullDtsFields.push("\n" + item["ITEMID.PARANAME"] + "金额不可为空");
        }
        if (STLITEMID_ISZERO == 0 && AMT == "0") {
            nullDtsFields.push("\n" + item["ITEMID.PARANAME"] + "金额不可为零");
        }
        if (STLITEMID_ISNN == 0 && AMT < 0) {
            nullDtsFields.push("\n" + item["ITEMID.PARANAME"] + "金额不可小于零");
        }
    });

    if (nullFields.length > 0 || nullDtsFields.length > 0) {
        if (nullFields.length > 0) {
            throw new Error(nullFields.join(',') + " 空," + nullDtsFields.join(',') + " \n不可保存");
        }
        throw new Error(nullDtsFields.join(',') + " \n不可保存");
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

export { mapState, mapGetters, mapDateTable, Constants };