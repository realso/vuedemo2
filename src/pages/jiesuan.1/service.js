import db from "@/api/db";
import { setDB, doOpen, doSave, doCheck, doReCheck } from "rs-vcore/service/Service01";
setDB(db);

const _getSTLFMITEMPara = function(STLTYPEID) {
    return {
        modalName: "TBV_STLFMITEM",
        where: `[STLFMID] = (SELECT STLFMID FROM VBV_STLFM_REF WHERE STATE = '当前' AND STLTYPEID ='${STLTYPEID}')`,
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
        pageSize: 10,
        pageIndex: 1
    }
}

const doLoadCOPYDTS = async function({ DSNODEID, STLFMID }) {
    return db.open(_getCOPYDTSPara(DSNODEID, STLFMID))
}

const doLoadSTLFMITE = async function({ STLTYPEID }) {
    return db.open(_getSTLFMITEMPara(STLTYPEID))
}

export default { doLoadCOPYDTS, doLoadSTLFMITE, doOpen, doSave, doCheck, doReCheck }