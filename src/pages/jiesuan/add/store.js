import Store from "@/store"
import db from "@/api/db";
import { mapState } from 'vuex'
import { DataTable } from "@/store/dbx/DataTable";
import { getAddData, saveData, openData } from "../service";

const Constants = {
    "STORE_NAME": "jiesuan-add",
    "F_INITDATA": "initData",
    "P_MAIN": "main",
    "P_DTS": "dts",
    "P_DTS_COPY": "dtsCopy",
    "P_STLFMITEMS": "stlfmitems",
}
const state = {
    params: { ACTION: "", SNODEID: "", FDBKTYPEID: "" },
    dt: {
        [Constants.P_MAIN]: new DataTable(Constants.P_MAIN, "TBV_SNSTL_M"),
        "dts": new DataTable("dts", "TBV_SNSTLDTS_M"),
        "dtsCopy": new DataTable("dts", "TBV_SNSTLDTS_M"),
        "stlfmitems": new DataTable("stlfmitems", "TBV_STLFMITEM")
    }
}
const mutations = {
    [Constants.F_INITDATA]: function(state) {
        this.dt["main"].data = {};
    },
    "setValue": function(state, { path, field, value, idx }) {
        state.dt[path].setValue(field, value, idx);
    },
    "setEmp": function(state, { path, item, idx }) {
        const dt = state.dt[path];
        dt.setValue("MKEMPID", item["EMPID"], idx);
        dt.setValue("MKEMPID.EMPCODE", item["EMPCODE"], idx);
        dt.setValue("MKEMPID.EMPNAME", item["EMPNAME"], idx);
    },
    "addEmp": function(state, { path, item }) {
        let vitem = {};
        vitem["EMPID"] = item["EMPID"];
        vitem["EMPID.EMPCODE"] = item["EMPCODE"];
        vitem["EMPID.EMPNAME"] = item["EMPNAME"];
        state.dt[path].add(vitem);
    },
    "delEmp": function(state, { index }) {
        state.dt["dts"].del(index);
    },
    "setParams": function(state, params) {
        state.params = params;
    }
}

const actions = {
    add: function({
        state
    }, param) {
        debugger;
        state.dt["main"].initData([]);
        state.dt["dts"].initData([]);
        state.dt["stlfmitems"].initData([]);
        state.dt["main"].add();
        return getAddData(param).then(function(data){
            const {
                data:{
                    items:items1
                }
            } = data;
            items1.map(function(item) {
                state.dt["stlfmitems"].add(item)
                //实例化门店结算
                state.dt["dts"].add();
                //第一步 加载 结算模板.所有 结算项目  +  判断 处理方式
                state.dt["dts"].setValue("STLITEMID",item.STLITEMID);
                state.dt["dts"].setValue("ITEMID",item.ITEMID);
                state.dt["dts"].setValue("AMT",item.DEFAULTVALUE);
                if(item.DEALTYPE=="EDI"&&Store.state.user.userInfo.DSNODEID=="1"){
                    state.dt["dts"].setValue("DeALTYPE","EDI");
                }else{
                    state.dt["dts"].setValue("DeALTYPE",item.DEALTYPE);
                }
                
                
                
                //第二步  继承 用户移除(否)
                if(item.ITEMPROPERTY == "select"){
                    db.open({
                        modalName: "TBV_SNSTLDTS_M",
                        where:
                        "[BILLID] = (SELECT BILLID FROM TBV_SNSTL_M WHERE AID = '"+ Store.state.user.userInfo.AID 
                        + "' AND SNODEID = '"+ Store.state.user.userInfo.DSNODEID 
                        + "' AND STLFMID = '"+ item.STLFMID + "' AND NVL(ISDEL,0) = 0  AND ROWNUM <2 ORDERBY  BILLDATE,FHOUR,FMINUTE DESC)" ,
                        orderBy: "[BILLDATE]",
                        pageSize: 10,
                        pageIndex: 1
                    }).then(function(data){
                        const {
                            data:{
                                items:items2
                            }
                        } = data;
    
                        if(items2.length>0){
                            items2.map(function(item) {
                                state.dt["dtsCopy"].add(item)
                            })
                        }
    
                        let copyitem = state.dt["dtsCopy"].filter(v => v.ITEMID==item.ITEMID)
                        state.dt["dts"].setValue("ISDELBYU",copyitem[0].ISDELBYU);
                    })
                }
                
                //第三步 判断 项目显示(否)
                state.dt["dts"].setValue("ISSHOW","");
                
            });

            //第四步 计算 分录号：项目显示=1.分录，据 结算项目.分录号(顺序)、整理 分录号
            //第五步 处理 金额

        })
        
    },
    delete: function() {},
    save: function({
        state
    }) {
        const main = state.dt["main"];
        const dts = state.dt["dts"];
        const imgdts = state.dt["imgdts"];
        let param = {};
        param["MAIN"] = main.getXML();
        param["DTS"] = dts.getXML();
        param["IMGDTS"] = imgdts.getXML();
        return saveData(param).then(function(data) {
            const {
                data: {
                    DTS: {
                        items: items1
                    },
                    MAIN: {
                        items: items2
                    }
                }
            } = data;
            main.initData(items2);
            dts.initData(items1);
        });
    },
    open: function({ state }, param) {
        const main = state.dt["main"];
        const dts = state.dt["dts"];
        const imgdts = state.dt["imgdts"];
        return openData(param).then(function(data) {
            const {
                data: {
                    DTS: {
                        items: items1
                    },
                    MAIN: {
                        items: items2
                    }
                }
            } = data;
            main.initData(items2);
            dts.initData(items1);
        });
    }
}
Store.registerModule(Constants.STORE_NAME, {
    namespaced: true,
    state,
    mutations,
    actions
});

const mapGetters = function(path, aFields) {
    aFields = aFields || [];
    let dt = state.dt[path];
    return dt.bindField(aFields);
}

export { mapState, mapGetters, Constants };