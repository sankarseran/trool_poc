"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
function valsToArr(obj) {
    return Object.values(obj).map(function (header) { return header.trim(); });
}
exports.valsToArr = valsToArr;
function parseCell(cellValStr, imports) {
    cellValStr = cellValStr.trim();
    var cellValLowerCase = cellValStr.toLowerCase();
    if (!isNaN(Number(cellValStr))) {
        return Number(cellValStr);
    }
    else if (cellValLowerCase === 'true') {
        return true;
    }
    else if (cellValLowerCase === 'false') {
        return false;
    }
    else if (cellValLowerCase === 'null') {
        return null;
    }
    else if (cellValStr.startsWith('\'') && cellValStr.endsWith('\'')) {
        return cellValStr.substring(1, cellValStr.length - 1);
    }
    else if (cellValStr.startsWith('"') && cellValStr.endsWith('"')) {
        return cellValStr.substring(1, cellValStr.length - 1);
    }
    else if (cellValStr.startsWith('“') && cellValStr.endsWith('”')) {
        return cellValStr.substring(1, cellValStr.length - 1);
    }
    var importKey = cellValStr;
    var importVal;
    if (cellValStr.includes('.')) {
        var arr = cellValStr.split('.');
        importKey = arr[0];
        importVal = arr[1];
    }
    if (imports.hasOwnProperty(importKey)) {
        if (importVal) {
            return imports[importKey][importVal];
        }
        else {
            return imports[importKey];
        }
    }
    return cellValStr;
}
exports.parseCell = parseCell;
var Logger = (function () {
    function Logger(showLogs) {
        this._showsLogs = !!showLogs;
    }
    Object.defineProperty(Logger.prototype, "showLogs", {
        get: function () {
            return this._showsLogs;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.log = function (msg) {
        if (this._showsLogs) {
            console.log(colors.green(msg));
        }
    };
    Logger.prototype.warn = function (msg) {
        if (this._showsLogs) {
            console.log(colors.yellow(msg));
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=shared.js.map