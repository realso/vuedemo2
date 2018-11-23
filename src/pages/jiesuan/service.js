import db from "@/api/db";
import Store from "@/store"
const doCall = function(param) {
    const api = { "namespace": "GJ.EBZ.RV", "class": "FDBK", "method": "DoExecute", params: [param] };
    return db.call(api);
}
const getAddData = function(param) {
    param["TYPE"] = "addData";
    return db.openTables([
        {
            path:"STLFMITEMS",para:{
                modalName: "TBV_STLFMITEM",
                where:
                "[STLFMID] = (SELECT STLFMID FROM VBV_STLFM_REF WHERE STATE = '当前' AND STLTYPENAME ='门店日结算')" ,
                orderBy: "[ENTRYNUM]",
                pageSize: 50,
                pageIndex: 1
            }
        },
        {
            path:"DTSCOPY",para:{
                modalName: "TBV_SNSTLDTS_M",
                where:
                "[BILLID] = (SELECT BILLID FROM (SELECT BILLID FROM TBV_SNSTL WHERE AID = '"+ Store.state.user.userInfo.AID 
                + "' AND SNODEID = '"+ ""
                + "' AND STLFMID = (SELECT STLFMID FROM VBV_STLFM_REF WHERE STATE = '当前' AND STLTYPENAME ='门店日结算')  AND NVL(ISDEL,0) = 0   ORDER BY  BILLDATE,FHOUR,FMINUTE DESC) WHERE ROWNUM <2)" ,
                orderBy: "",
                pageSize: 10,
                pageIndex: 1
            }
        }
    ])
}

const saveData = function(param) {
    param["TYPE"] = "save";
    return doCall(param);
}

const openData = function(param) {
    param["TYPE"] = "loadData";
    return doCall(param);
}

export { getAddData, saveData, openData }