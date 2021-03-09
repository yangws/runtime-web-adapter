import _UTIL from "../../util"


_UTIL.exportTo("getFileSystemManager", qg, ral);
//TODO 这里会污染 qg.getFileSystemManager().readFileSync 返回值
let fs = ral.getFileSystemManager();
let readFileSync = fs.readFileSync;
fs.readFileSync = function (path, encode) {
    try {
        let res = readFileSync.bind(this)(path, encode);
        return res.data;
    } catch (error) {
        throw error;
    }
}