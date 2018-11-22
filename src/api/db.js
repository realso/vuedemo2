import axios from 'axios';
import store from "@/store"
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

const getUrl = function(type) {
    var url = "";
    switch (type) {
        case "upload":
            url = getURL("url") + "/upload/file.aspx?appId=2";
            break;
        case "url":
            url = "http://218.22.251.156/gj-app-2/data2.aspx?appId=2";
            if (store.state.user.userInfo.sessionID) {
                url += "&sessionID=" + store.state.user.userInfo.sessionID;
            }
            break;
        case "socket":
            url = "ws://ydzl.gujing.net:9091";
            break;
        default:
            alert('类型：' + type + '不存在！');

    }
    return url;
}
const postData = function(param) {
    return new Promise(
        function(resolve, reject) {
            axios.post(getUrl("url"), param).then(function(res) {
                if ("-201" == res.data.resulttype) {
                    $app.$router.replace("/loginout");
                }
                if ("-100" == res.data.resulttype) {
                    console.error(res)
                    reject((res.data));
                } else {
                    resolve(res.data);
                }
            }).catch(function(e) {
                reject(e);
            });
        }
    )
}

const open = function(params) {
    let param = {};
    if (params["sqlId"]) {
        param["tp"] = "query6";
        param["json"] = encodeURIComponent(JSON.stringify({ params }));
    } else {
        params["tp"] = "query1";
        param = params;
    }
    return postData(param);
}

const _getQueryInfo = function(para) {
    var queryInfo = { where: "", orderBy: "", pageSize: 20, pageIndex: 1, groupBy: "", egg: "", having: "" };
    queryInfo = Object.assign(queryInfo, para)
    return queryInfo;
}

const openTables = function(paths) {
    let param = {};
    let postPaths = {};
    paths.forEach(p => {
        let path = p["path"];
        let para = p["para"];
        para = _getQueryInfo(para);
        p["para"] = para;
        postPaths[path] = p;
    });
    param["tp"] = "query4";
    param["json"] = encodeURIComponent(JSON.stringify(postPaths));
    return postData(param);
}

const getNewID = function(scmName, inc) {
    var param = { tp: "getid", modalName: scmName, col: inc };
    return postData(param)
}

const call = function(para) {
    let param = {
        tp: "call",
        json: encodeURIComponent(JSON.stringify({ para: para }))
    };
    return postData(param);
};


export default {
    getUrl,
    postData,
    open,
    openTables,
    getNewID,
    call
}