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
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === `${config.url}${config.method}${config.data}`) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
    console.log(config);
}

//添加请求拦截器
axios.interceptors.request.use(config => {
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: `${config.url}${config.method}${config.data}`, f: c });
    });
    return config;
}, error => {
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(response => {
    removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return response;
}, error => {
    return {
        data: {
            resulttype: -100,
            message: "请求太快了"
        }
    }
});



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
                if (!res) {
                    reject("请求异常");
                }
                if ("-201" == res.data.resulttype) {
                    $app.$router.replace("/loginout");
                }
                if ("-100" == res.data.resulttype) {
                    console.error(res)
                    reject((res.data.message));
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
        para["scmName"] = para["scmName"] || para["modalName"];
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