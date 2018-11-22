import db from "@/api/db";
import { setDB, doOpen, doSave } from "rs-vcore/service/Service01";
setDB(db);
const doInitData = async function() {
    return db.openTables([{ path: "P1", para: { scmName: "TBS_DEPT", where: "1aa" } }])
}
export default { doOpen, doSave, doInitData }