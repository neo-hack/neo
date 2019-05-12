"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
/**
 * replace `&` to `-`
 * @params str<string>: filename
 */
exports.replaceInvalidCharter = function (str) {
    var regex = /&|\+|@/g;
    return str.replace(regex, '-');
};
/**
 * rename file by replaceInvaliCharter
 * @params fileNames<string[]>: all files in [folderName]
 * @params foderName<string>: parent folder of fileNames
 * @params callback<func>: amend callback funcs
 */
exports.rename = function (fileNames, folderName, callback) {
    if (callback === void 0) { callback = exports.replaceInvalidCharter; }
    var newFileNames = [];
    fileNames.forEach(function (fileName) {
        var newFileName = callback(fileName);
        fs.renameSync(folderName + "/" + fileName, folderName + "/" + newFileName);
        newFileNames.push(newFileName);
    });
    return newFileNames;
};
