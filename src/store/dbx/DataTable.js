/**
 * 数据管理对象
 */
class DataTable {
    constructor(path, scm) {
        this.path = path;
        this.idx = 0;
        this.scm = scm;
        this.dataObj = {};
        this.data = [];
        this._changeInfo = {
            _rawData: [],
            _rawIdxData: {},
            _addIdxRows: {},
            _modifyIdxRows: {},
            _deleteIdxRows: {}
        }
    }

    /**
     * 初始化
     * @param {初始化数据} data 
     */
    initData(data) {
        this.idx = 0;
        this.data = [];
        data = data || [];
        this._changeInfo = {
            _rawData: [],
            _rawIdxData: {},
            _addIdxRows: {},
            _modifyIdxRows: {},
            _deleteIdxRows: {}
        }
        data.map(item => {
            item["_idx_"] = this.idx++;
            item["_type_"] = "old";
            this._changeInfo._rawIdxData[item["_idx_"]] = item;
            this.data.push(Object.assign({}, this.dataObj, item));
        })
        this._changeInfo._rawData = data;
    }

    /**
     * 设置数据
     * @param {数据} data 
     * @param {是否追加} isAdd 
     */
    setData(data, isAdd) {
        if (!isAdd) {
            this.initData();
        }
        data.map(item => {
            item["_idx_"] = this.idx++;
            item["_type_"] = "old";
            this._changeInfo._rawIdxData[item["_idx_"]] = item;
            this.data.push(Object.assign({}, this.dataObj, item));
        });
        this._changeInfo._rawData = this._changeInfo._rawData.concat(data);
    }

    getData(where, order) {
        where = where || "";
        order = order || "";
        return this.data;
    }

    getValue(field, idxOrItem) {
        console.log("getValue:" + field);
        console.log(idxOrItem);
        let ret = "";
        let idx = idxOrItem || 0;
        let item = idxOrItem || {};
        if (typeof(idxOrItem) != "object") {
            if (idx > this.data.length) {
                throw new Error("DataTable.getValue idx太长了");
            }
            if (this.data.length > 0) {
                item = this.data[idx];
            }
        }
        ret = item[field];
        return ret;
    }

    setValue(field, value, idxOrItem) {
        console.log("setValue:" + field + "=" + value);
        console.log(idxOrItem);
        let idx = idxOrItem || 0;
        let item = idxOrItem || {};
        if (typeof(idxOrItem) != "object") {
            if (this.data.length == 0) {
                item = {};
                this.add(item);
            }
            if (idx > this.data.length) {
                throw new Error("DataTable.getValue太长了");
            } else {
                item = this.data[idx];
            }
        }


        item[field] = value;

        //放入修改记录
        const titem = this._changeInfo._rawIdxData[item["_idx_"]];
        if (titem && Object.keys(titem).includes(field)) {
            if (titem[field] != value) {
                this._changeInfo._modifyIdxRows[item["_idx_"]] = item;
            }
        }
    }

    getValues(field) {
        return this.data.map(function(item) {
            return item[field];
        })
    }

    add(item) {
        item = Object.assign({}, this.dataObj, item);
        this.data.push(item);
        item["_idx_"] = this.idx++;
        item["_type_"] = "new";
        this._changeInfo._addIdxRows[item["_idx_"]] = item;
    }

    del(index) {
        index = index || 0;
        if (index < 0 && index > this.data.length) {
            throw new Error("DataTable.del:index不正确");
        }
        let item = this.data.splice(index, 1)[0];
        if (item["_type_"] == "new") {
            delete this._changeInfo._rawIdxData[item["_idx_"]];
        } else {
            this._changeInfo._deleteIdxRows[item["_idx_"]] = item;
        }
    }

    count() {
        return this.data.length;
    }

    bindField(aFields) {
        aFields = aFields || [];
        for (let i = 0, field; i < aFields.length; i++) {
            field = aFields[i];
            let v = this.dataObj[field];
            if (typeof(v) == "undefined") {
                let robj = {};
                robj[field] = "";
                this.dataObj = Object.assign({}, this.dataObj, robj)
            }
        }
    }

    /**
     * 复制数据
     * @param {来源表格} fromTable 
     * @param {isAdd:是否添加,exFields:剔除字段} param1 
     */
    copyTable(fromTable, { isAdd, exFields }) {
        const fieldAll = fromTable.getFields();
        const data = fromTable.getData();
        exFields = exFields || [];
        modifyFields = modifyFields || [];
        if (!isAdd) {
            this.initData();
        }
        data.forEach(item => {
            let titem = {};
            fieldAll.forEach(field => {
                if (exFields.indexOf(field) == -1) {
                    titem[field] = item[field];
                }
            })
            this.add(titem);
        });
    }

    getFields() {
        let fieldAll = [];
        this.data.forEach(function(item) {
            fieldAll = fieldAll.concat(Object.keys(item));
        })
        this._changeInfo._rawData.forEach(function(item) {
            fieldAll = fieldAll.concat(Object.keys(item));
        })
        fieldAll = Array.from(new Set(fieldAll));
        return fieldAll;
    }

    getXML() {
        let fieldAll = this.getFields();
        let strSave = '<?xml version="1.0" encoding="UTF-8"?>';
        let newitems = "";
        let modifyitems = "";
        let delitems = "";
        let rootitem = "<" + this.scm + ' l="u" c="' + fieldAll + '" t="">';

        Object.keys(this._changeInfo._addIdxRows).forEach((idx) => {
            let item = this._changeInfo._addIdxRows[idx];
            let newitem = "";
            fieldAll.forEach((field, i) => {
                newitem = newitem + " c" + i + '="' + encodeURIComponent(item[field]) + '"';
            });
            newitems = newitems + "<r" + newitem + "/>";
        });
        newitems = "<a>" + newitems + "</a>";

        Object.keys(this._changeInfo._modifyIdxRows).forEach((idx) => {
            let item = this._changeInfo._modifyIdxRows[idx];
            let modifyitem = "";
            let titem = this._changeInfo._rawIdxData[idx];
            fieldAll.forEach((field, i) => {
                modifyitem = modifyitem + " c" + i + '="' + encodeURIComponent(item[field]) + '"' + " oc" + i + '="' + encodeURIComponent(titem[field]) + '"';
            });
            modifyitems = modifyitems + "<r" + modifyitem + "/>";
        });

        Object.keys(this._changeInfo._rawIdxData).forEach((idx) => {
            let item = this._changeInfo._rawIdxData[idx];
            let modifyitem = "";
            let titem = this._changeInfo._rawIdxData[idx];
            if (!this._changeInfo._modifyIdxRows[idx] && !this._changeInfo._deleteIdxRows[idx]) {
                fieldAll.forEach((field, i) => {
                    modifyitem = modifyitem + " c" + i + '="' + encodeURIComponent(item[field]) + '"' + " oc" + i + '="' + encodeURIComponent(titem[field]) + '"';
                });
                modifyitems = modifyitems + "<r" + modifyitem + "/>";
            }
        });

        modifyitems = "<m>" + modifyitems + "</m>";

        Object.keys(this._changeInfo._deleteIdxRows).forEach((idx) => {
            let item = this._changeInfo._deleteIdxRows[idx];
            let delitem = "";
            let titem = this._changeInfo._rawIdxData[idx];
            fieldAll.forEach(field => {
                delitem = delitem + " oc" + i + '="' + encodeURIComponent(titem[field]) + '"';
            });
            delitems = delitems + "<r" + delitem + "/>";
        });
        delitems = "<d>" + delitems + "</d>";
        var sts = newitems + modifyitems + delitems;
        strSave = strSave + rootitem + sts + "</" + this.scm + ">";
        return strSave;
    }

    acceptChange() {
        this.initData(this.data);
    }

    isModify() {
        return (Object.keys(this._changeInfo._modifyIdxRows).length + Object.keys(this._changeInfo._addIdxRows).length + Object.keys(this._changeInfo._deleteIdxRows).length) > 0;
    }
}
export {
    DataTable
};