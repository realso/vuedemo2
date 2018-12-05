import db from "@/api/db";
import { setDB, doGetBillCode, doGetDate, doGetDateTime, doGetNewID } from "rs-vcore/service/Service02";
setDB(db);

const SQLID = {
    "杜阿姨_销货单_日是否订货": 51494,
    "杜阿姨_销货单_日网点是否息业": 51495,
    "杜阿姨_销货单_日网点销售政策": 51498,
    "杜阿姨_销货单_最小金额": 51499,
    "杜阿姨_销货单_最小订货量": 51509,
    "杜阿姨_销货单_客户信息": 51500,
    "杜阿姨_销货单_查询订单状态": 51510
}

//查询当日是否订货
const doCheckIsOrder = async function({ BILLDATE, SNODEID, BILLID, BILLTYPEID, BUSTYPEID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_日是否订货, BILLDATE, SNODEID, BILLID, BILLTYPEID, BUSTYPEID })
}

//查询订单状态
const doQueryOrderStatus = async function({ BILLID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_查询订单状态, BILLID })
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
        return new Promise(function(resolve, reject) {
            if (ret.data.ERRORCODE < 0) {
                reject(new Error(ret.data.ERRORTXT));
            } else {
                resolve(ret);
            }
        })
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

//查询最小订货量
const doQueryMINQTY = async function({ SALEPLCID }) {
    return db.open({ sqlId: SQLID.杜阿姨_销货单_最小订货量, SALEPLCID })
}

//保存接口
const doSave = async function({ saveTables, BILLID }) {
    var param = { EXETYPE: "Save" };
    param["BILLID"] = BILLID;
    const api = { "namespace": "GJ.EBZ.SL", "class": "Sale", "method": "BVSaleExecute", params: [param, saveTables], ISCHECKREPEAT: true };
    return db.call(api).then((ret) => {});
}

//删除接口
const doDelete = async function({ saveTables, BILLID }) {
    var param = { EXETYPE: "Delete" };
    param["BILLID"] = BILLID;
    const api = { "namespace": "GJ.EBZ.SL", "class": "Sale", "method": "BVSaleExecute", params: [param, saveTables], ISCHECKREPEAT: true };
    return db.call(api).then((ret) => {});
}

//查询接口
const doOpen = async function({ MAIN, DTS, DID }) {
    return db.openTables([
        { path: MAIN.path, para: { where: `[BILLID]=${DID}`, scmName: MAIN.scm } }, { path: DTS.path, para: { where: `[BILLID]=${DID}`, scmName: DTS.scm } }
    ]);
}

export default { doGetBillCode, doGetDate, doGetDateTime, doGetNewID, doCheckIsOrder, doQueryOrderStatus, doQueryBusType, doGetPeriod, doQuerySnode, doQueryCust, doCheckXiYe, doQuerySalePlc, doQuerySalePlcDts, doQueryAMTLMT, doQueryMINQTY, doOpen, doSave, doDelete }