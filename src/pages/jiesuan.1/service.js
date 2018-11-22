import db from "@/api/db";
import { setDB, doOpen, doSave } from "rs-vcore/service/Service01";
setDB(db);
export default { doOpen, doSave }