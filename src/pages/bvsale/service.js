import db from "@/api/db";

const SQLID = {
    "杜阿姨_销货单_日是否订货": 51494,
    "杜阿姨_销货单_日网点是否息业": 51495,
    "杜阿姨_销货单_日网点销售政策": 51498,
    "杜阿姨_销货单_最小金额": 51499,
    "杜阿姨_销货单_客户信息": 51500
}

//查询当日是否订货
const doCheckIsOrder = async function({ BILLDATE, SNODEID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_日是否订货, BILLDATE, SNODEID })
}

//查询业务类型详细信息
const doQueryBusType = async function({ BILLTYPEID, BUSTYPEID }) {
    return db.open({
        modalName: "VBS_SALETYPE_4ZCC",
        where: `[BUSTYPEID] ='${BUSTYPEID}' AND [BILLTYPEID] = '${BILLTYPEID}' AND AID=@AID AND ISUSE = 1 AND ISVERIFY = 1 AND NVL(ISDEL,0) = 0`,
        orderBy: "",
        pageSize: 1,
        pageIndex: 1
    })
}

//通过日期查询期间
const doGetPeriod = async function({ PTYPE, BILLDATE }) {
    let param = { periodTypeID: PTYPE, date: BILLDATE, accountType: "ISCHECKOUT4" };
    const api = { "namespace": "GJ.EBZ.BS", "class": "Period", "method": "GetCheckPeriod", params: [param], ISCHECKREPEAT: true };
    return db.call(api).then((ret) => {
        debugger;
    });
}

//查询网点详细信息
const doQuerySnode = async function({ SNODEID }) {
    return db.open({
        modalName: "VBS_SNODE",
        where: `[SNODEID] ='${SNODEID}'`,
        orderBy: "",
        pageSize: 1,
        pageIndex: 1
    })
}

//查询网点详细信息
const doQueryCust = async function({ CUSTID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_客户信息, CUSTID })
}

//查询网点息业信息
const doCheckXiYe = async function({ BILLDATE, SNODEID, WEEK }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_日网点是否息业, BILLDATE, SNODEID, WEEK })
}

//查询网点销售政策
const doQuerySalePlc = async function({ BILLDATE, SNODEID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_日网点销售政策, BILLDATE, SNODEID })
}

//查询销售政策明细
const doQuerySalePlcDts = async function({ SALEPLCID }) {
    return db.open({
        modalName: "VSL_MATERIAL_SEL_4BVSALE",
        where: `[SALEPLCID] ='${SALEPLCID}' AND [TAG]=1`,
        orderBy: "[MID.MBRULECODE],[MID.MLORDERCODE],[MID.FMCODE],[MID.MTORDERCODE],[MID.ORDERCODE],[MID.MCODE]",
        pageSize: 1,
        pageIndex: 1
    })
}

//查询最小订货额
const doQueryAMTLMT = async function({ DISTID, SNODEID, BILLDATE, MNGTYPEID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_最小金额, DISTID, SNODEID, BILLDATE, MNGTYPEID })
}

//保存接口
const doSave = async function({ saveTables }) {
    var param = { EXETYPE: "Delete" };
    const api = { "namespace": "GJ.EBZ.SL", "class": "Sale", "method": "BVSaleExecute", params: [param, saveTables], ISCHECKREPEAT: true };
    return db.call(api).then((ret) => {
        debugger;
    });
}

//删除接口
const doDelete = async function({ saveTables }) {
    var param = { EXETYPE: "Save" };
    const api = { "namespace": "GJ.EBZ.SL", "class": "Sale", "method": "BVSaleExecute", params: [param, saveTables], ISCHECKREPEAT: true };
    return db.call(api).then((ret) => {
        debugger;
    });
}

//查询接口
const doOpen = async function({ MAIN, DTS, DID }) {
    return db.openTables([
        { path: MAIN.path, scmName: MAIN.scmName, para: { where: `BILLID=${DID}` } }, { path: DTS.path, scmName: DTS.scmName, para: { where: `BILLID=${DID}` } }
    ]);
}

export default { doCheckIsOrder, doQueryBusType, doGetPeriod, doQuerySnode, doQueryCust, doCheckXiYe, doQuerySalePlc, doQuerySalePlcDts, doQueryAMTLMT, doOpen, doSave, doDelete }