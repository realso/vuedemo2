import Vue from 'vue'
import Rui from 'rs-ui1'
Vue.prototype.$isPower = function(code) {
    return !!this.$store.getters.pcode[code];
}

Vue.prototype.$alert = async function(message, title) {
    return Rui.MessageBox.alert(message, title);
}

Vue.prototype.$confirm = async function(message, title) {
    return Rui.MessageBox.confirm(message, title);
}

Vue.prototype.$busy = function(options) {
    return this.$indicator.open(options);
}

Vue.prototype.$free = function() {
    return this.$indicator.close();
}

Vue.prototype.$callAsync = async function({ method, params, timeOut }) {
    this.$busy();
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            method(...params).then((data) => {
                resolve(data)
            }).catch(e => {
                this.$toast(e.message);
                reject(e);
            }).then(() => {
                this.$free();
            });
        }, timeOut || 0);
    })
}

Vue.prototype.$callAction = function({ action, param, successText, errorText, successCall, errorCall, isBusy, isSuccessBack, isErrorBack, timeOut }) {
    setTimeout(async() => {
        this.$indicator.open();
        this.$store
            .dispatch(action, param)
            .then(() => {
                this.$indicator.close();
                if (successText) {
                    this.$toast({
                        message: successText,
                        position: "bottom"
                    });
                }
                if (successCall) {
                    successCall();
                }
                if (isSuccessBack)
                    this.$router.goBack();
            })
            .catch(e => {
                this.$indicator.close();
                this.$toast({
                    message: errorText || e.message || "加载失败",
                    position: "bottom"
                });
                if (errorCall) {
                    errorCall();
                }
                if (isErrorBack)
                    this.$router.goBack();
            });
    }, timeOut || 0);
}