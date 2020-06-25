"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var csvToJson = require("csvtojson");
var shared_1 = require("./shared");
var DecisionTable_1 = require("./DecisionTable");
var TableErrs_1 = require("./TableErrs");
var Trool = (function () {
    function Trool(showLogs) {
        this.NO_TABLES_WARN = 'No decision tables found';
        this.IMPORT_START_ERR = 'Import start format error for';
        this.IMPORT_PROP_ERR = 'Import property can only be alpha-numeric and underscores ';
        this.UPDATE_START_MSG = ' DecisionTables found. Applying table logic to facts.';
        this.IMPORT_NAME_WARN = '!!WARNING!! The spreadsheet is using an import name ' +
            'already passed via the imports object. The spreadsheet will overwrite the import: ';
        this.logger = new shared_1.Logger(showLogs);
    }
    Trool.prototype.applyRules = function (filePath, facts, imports) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var jsonArr, allImports, decisionTables, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, csvToJson({noheader: true}).fromFile(filePath)];
                    case 1:
                        jsonArr = _a.sent();
                        allImports = this.setupImports(jsonArr, imports || {});
                        decisionTables = this.getTables(jsonArr, facts, allImports);
                        return [2, this.updateFacts(decisionTables)];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2];
                }
            });
        });
    };
    Trool.prototype.getImports = function (filePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var jsonArr, allImports, decisionTables, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, csvToJson({noheader: true}).fromFile(filePath)];
                    case 1:
                        jsonArr = _a.sent();
                        allImports = this.setupImports(jsonArr, {});
                        return [2, allImports];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2];
                }
            });
        });
    };
    Trool.prototype.setupImports = function (jsonArr, imports) {
        var importName = '';
        var newImportObj = {};
        for (var i = 0; i < jsonArr.length; i++) {
            var firstCell = jsonArr[i].field1.trim();
            if (firstCell.startsWith('Import:')) {
                importName = this.getImportName(firstCell, imports);
            }
            else if (importName) {
                if (!/^[a-zA-Z0-9-_]+$/.test(firstCell)) {
                    throw Error(this.IMPORT_PROP_ERR + firstCell);
                }
                newImportObj[firstCell] = shared_1.parseCell(jsonArr[i].field2, imports);
                if (this.isLastRow(jsonArr, i)) {
                    imports[importName] = newImportObj;
                    importName = '';
                    newImportObj = {};
                }
            }
        }
        return imports;
    };
    Trool.prototype.getImportName = function (firstCell, imports) {
        var firstCellArr = firstCell.split(' ');
        if (firstCellArr.length !== 2) {
            throw Error(this.IMPORT_START_ERR + (" '" + firstCell + "'"));
        }
        var importName = firstCellArr[1];
        if (imports.hasOwnProperty(importName)) {
            this.logger.warn(this.IMPORT_NAME_WARN + importName);
        }
        return importName;
    };
    Trool.prototype.getTables = function (jsonArr, facts, imports) {
        var decisionTables = [];
        var startCellArr = null;
        var tableStart = -1;
        for (var i = 0; i < jsonArr.length; i++) {
            var firstCol = jsonArr[i].field1.trim();
            if (firstCol.startsWith('Table:')) {
                tableStart = i;
                startCellArr = firstCol.split(' ');
            }
            else if (startCellArr && this.isLastRow(jsonArr, i)) {
                var showLogs = this.logger.showLogs;
                var id = decisionTables.length + 1;
                var tableRows = jsonArr.slice(tableStart, i + 1);
                var factArr = this.getFacts(startCellArr, id, facts);
                var table = new DecisionTable_1.default(id, startCellArr[1], showLogs);
                table.initTable(tableRows, factArr, imports);
                decisionTables.push(table);
                tableStart = -1;
                startCellArr = null;
            }
        }
        return decisionTables;
    };
    Trool.prototype.getFacts = function (startCellArr, id, facts) {
        var tableErrs = new TableErrs_1.default(id);
        if (startCellArr.length !== 2) {
            throw Error(tableErrs.startCell);
        }
        else if (!facts[startCellArr[1]]) {
            throw Error(tableErrs.factFalsey);
        }
        var factArr = facts[startCellArr[1]];
        return (factArr instanceof Array) ? factArr : [factArr];
    };
    Trool.prototype.updateFacts = function (decisionTables) {
        var tableCount = decisionTables.length;
        if (tableCount === 0) {
            this.logger.warn(this.NO_TABLES_WARN);
            return {};
        }
        else {
            this.logger.log(tableCount + this.UPDATE_START_MSG);
        }
        var updatedFacts = {};
        for (var i = 0; i < tableCount; i++) {
            var table = decisionTables[i];
            updatedFacts[table.factName] = table.updateFacts();
        }
        return updatedFacts;
    };
    Trool.prototype.isLastRow = function (jsonArr, idx) {
        var nextCell = jsonArr[idx + 1] ? jsonArr[idx + 1].field1.trim() : '';
        return !nextCell || nextCell.startsWith('Table:') || nextCell.startsWith('Import:');
    };
    return Trool;
}());
exports.default = Trool;
//# sourceMappingURL=Trool.js.map