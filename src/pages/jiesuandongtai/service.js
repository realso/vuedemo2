import db from "@/api/db";
import { setDB, doOpen, doDelete, doSave, doCheck, doReCheck } from "rs-vcore/service/Service01";
setDB(db);


const _getMAIN = function(SNODEID,BILLDATE) {
    return {
        modalName: "VBV_STLTRENDS_M",
        where: `[SNODEID] ='${SNODEID}' AND [BILLDATE] =TO_DATE('${BILLDATE}','YYYY-MM-DD') AND NVL(ISDEL,0)=0`,
        orderBy: "",
        pageSize: 1,
        pageIndex: 1
    }
}

const _getDTS = function(BILLID) {
    return {
        modalName: "TBV_SNSTLDTS_M",
        where: `[BILLID] ='${BILLID}'`,
        orderBy: "ENTRYNUM",
        pageSize: 1,
        pageIndex: 1
    }
}

const doLoadMAIN = async function({SNODEID,BILLDATE}) {
    return db.open(_getMAIN(SNODEID,BILLDATE))
}
const doLoadDTS = async function({ BILLID }) {
    return db.open(_getDTS(BILLID))
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

const doQuery = async function(para) {
    return db.open(para);
}

export default { doLoadMAIN,doLoadDTS, doLoadSnode, doOpen, doSave, doDelete, doCheck, doReCheck,doQuery }