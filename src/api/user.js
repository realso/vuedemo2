import db from "./db";

export async function login(userInfo) {
    userInfo["tp"] = "login";
    return db.postData(userInfo);
}

export async function loadMenu() {
    let para = {};
    para["tp"] = "loadmenu";
    return db.postData(para);
}