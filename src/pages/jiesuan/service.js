import db from "@/api/db";
const doCall = function(param) {
    const api = { "namespace": "GJ.EBZ.RV", "class": "FDBK", "method": "DoExecute", params: [param] };
    return db.call(api);
}
const getAddData = function(param) {
    param["TYPE"] = "addData";
    return db.open({
        modalName: "TBV_STLFMITEM",
        where:
        "[STLFMID] = (SELECT STLFMID FROM VBV_STLFM_REF WHERE STATE = '当前' AND STLTYPENAME ='门店日结算')" ,
        orderBy: "[ENTRYNUM]",
        pageSize: 50,
        pageIndex: 1
    })
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