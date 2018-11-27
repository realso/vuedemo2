import db from "@/api/db";
import Store from "@/store"
import { setDB, doOpen, doDelete, doSave, doCheck, doReCheck } from "rs-vcore/service/Service01";
setDB(db);

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

const _getSTLFMITEMPara = function(STLTYPEID,BILLDATE) {
    return {
        modalName: "TBV_STLFMITEM",
        where: `[STLFMID] = (SELECT STLFMID FROM VBV_STLFM_REF WHERE  STLTYPEID ='${STLTYPEID}' AND TO_DATE('${BILLDATE}','YYYY-MM-DD') BETWEEN SDATE AND NVL (EDATE,TO_DATE('2099-12-31','YYYY-MM-DD')))`,
        orderBy: "[ENTRYNUM]",
        pageSize: 1,
        pageIndex: 1
    }
}

const _getCOPYDTSPara = function(DSNODEID, STLFMID) {
    return {
        modalName: "TBV_SNSTLDTS_M",
        where: `[BILLID] IN (SELECT * FROM (SELECT BILLID FROM TBV_SNSTL WHERE AID = @AID AND SNODEID = '${DSNODEID}' AND STLFMID = '${STLFMID}' AND NVL(ISDEL,0) = 0  ORDER BY  BILLDATE,FHOUR,FMINUTE DESC) WHERE  ROWNUM <2  )`,
        orderBy: "",
        pageSize: 1,
        pageIndex: 1
    }
}

const doLoadCOPYDTS = async function({ DSNODEID, STLFMID }) {
    return db.open(_getCOPYDTSPara(DSNODEID, STLFMID))
}

const doLoadSTLFMITE = async function({ STLTYPEID }) {
    return db.open(_getSTLFMITEMPara(STLTYPEID))
}

const doLoadSnode = async function({ SNODEID }) {
    return db.open({
        modalName: "TBV_CHAINSND_SEL",
        where: `[SNODEID] ='${SNODEID}'`,
        orderBy: "",
        pageSize: 1,
        pageIndex: 1
    })
}

export default { doLoadCOPYDTS, doLoadSTLFMITE, doLoadSnode, doOpen, doSave, doDelete, doCheck, doReCheck }