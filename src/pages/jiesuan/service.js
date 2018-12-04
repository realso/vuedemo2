import db from "@/api/db";
import { setDB, doOpen, doDelete, doSave, doCheck, doReCheck } from "rs-vcore/service/Service01";
setDB(db);

const _getSTLFMITEMPara = function(STLTYPEID,BILLDATE) {
    return {
        modalName: "TBV_STLFMITEM",
        where: `[STLFMID] = (SELECT STLFMID FROM VBV_STLFM_REF WHERE  ISVERIFY = 1 AND STLTYPEID ='${STLTYPEID}' AND TO_DATE('${BILLDATE}','YYYY-MM-DD') BETWEEN SDATE AND NVL (EDATE,TO_DATE('2099-12-31','YYYY-MM-DD')))`,
        orderBy: "[ENTRYNUM]",
        pageSize: 1,
        pageIndex: 1
    }
}

const _getCOPYDTSPara = function(DSNODEID, STLFMID) {
    return {
        modalName: "TBV_SNSTLDTS_M",
        where: `[BILLID] IN (SELECT * FROM (SELECT BILLID FROM TBV_SNSTL WHERE AID = @AID AND SNODEID = '${DSNODEID}' AND STLFMID = '${STLFMID}' AND NVL(ISDEL,0) = 0  ORDER BY  BILLDATE DESC,FHOUR DESC,FMINUTE DESC) WHERE  ROWNUM <2  )`,
        orderBy: "",
        pageSize: 1,
        pageIndex: 1
    }
}

const doLoadCOPYDTS = async function({ DSNODEID, STLFMID }) {
    return db.open(_getCOPYDTSPara(DSNODEID, STLFMID))
}

const doLoadSTLFMITE = async function({ STLTYPEID,BILLDATE }) {
    return db.open(_getSTLFMITEMPara(STLTYPEID,BILLDATE))
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