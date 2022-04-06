let _subpackages = {};
let _remoteBundles = {};
let _server;
let _downloader = cc.assetManager.downloader;
let _originInit = cc.assetManager.init;
let _zipCache = {}; // 属性名: remote ZipBundle 的 url; 属性值: {zip 包解压后根目录的本地路径, bundle 最后更新时间}
let _fsm = ral.getFileSystemManager();
const CACHED_FILE_PATH = ral.env.USER_DATA_PATH + "/zipBundleCacheList.json";

cc.assetManager.init = function (options) {
    options.subpackages && options.subpackages.forEach(x => _subpackages[x] = true);
    options.remoteBundles && options.remoteBundles.forEach(x => _remoteBundles[x] = true);
    _server = options.server + "/remote/";
    _originInit.apply(this, arguments);

    if (options.remoteBundles) {
        try {
            let str = _fsm.readFileSync(CACHED_FILE_PATH, 'utf8');
            _zipCache = JSON.parse(str);
        } catch (e) { }
    }
};

function downloadBundle(bundleName, options, onComplete) {
    let bundleVersion = options.version || _downloader.bundleVers[bundleName];
    let bundlePath = 'assets/' + bundleName;
    let bundleConfig = `${bundlePath}/config.${bundleVersion ? bundleVersion + '.' : ''}json`;
    let bundleJS = `${bundlePath}/index.${bundleVersion ? bundleVersion + '.' : ''}js`;

    // 根据bundleName 判断当前 bundle 为分包资源、远程包资源还是本地资源， 并分别做相应处理
    if (_subpackages[bundleName]) {
        // 加载分包
        let task = ral.loadSubpackage({
            name: bundleName,
            success() {
                options.responseType = "json";
                bundleConfig = `${bundleName}/config.${bundleVersion ? bundleVersion + '.' : ''}json`;
                cc.assetManager.downloader.downloadFile(bundleConfig, options, options.onFileProgress, function (err, data) {
                    if (!err && typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            err = e;
                        }
                    }
                    data && (data.base = `${bundleName}/`);
                    onComplete && onComplete(err, data);
                });
            },
            fail(res) {
                console.warn(`Load Subpackage failed: path: ${bundleName} message: ${res.errMsg}`);
                onComplete && onComplete(new Error(`Failed to load subpackage ${bundleName}: ${res.errMsg}`));
            }
        });
        // 监听分包加载进度变化
        if (typeof options.onFileProgress === "function") {
            task.onProgressUpdate(options.onFileProgress);
        }
        return;

    } else {
        // 若为远程包或本地包
        let out = null;
        let count = 0;
        let error = null;
        if (_remoteBundles[bundleName]) {
            bundlePath = _server + bundleName;
            bundleConfig = `${bundlePath}/config.${bundleVersion ? bundleVersion + '.' : ''}json`;
            bundleJS = `${"src/scripts/" + bundleName}/index.${bundleVersion ? bundleVersion + '.' : ''}js`;
        }

        // 加载 bundle 中的 json 文件
        _downloader.downloadFile(bundleConfig, options, options.onFileProgress, function (err, response) {
            if (err) {
                error = err;
            }
            if (typeof response === 'string') {
                try {
                    out = JSON.parse(response);
                    if (out && out.isZip) {
                        let zipVersion = out.zipVersion;
                        _handleZip(bundlePath, zipVersion, function (err, unzipPath) {
                            if (err) {
                                onComplete && onComplete(err);
                                return;
                            }
                            out.base = unzipPath + '/res/';
                            count++;
                            if (count === 2) {
                                onComplete(error, out);
                            }
                        });
                    } else {
                        out && (out.base = bundlePath + '/');
                        count++;
                        if (count === 2) {
                            onComplete(error, out);
                        }
                    }
                } catch (e) {
                    error = e;
                }
            }
        });

        // 加载 bundle 中的 js 文件
        _downloader.downloadScript(bundleJS, options, function (err) {
            if (err) {
                error = err;
            }
            count++;
            if (count === 2) {
                onComplete(error, out);
            }
        });
    }
}


function _handleZip(bundlePath, zipVersion, onComplete) {
    /**
     * 1.从 _zipCache 中获取本地已解压的 zip bundle 信息
     * 2.使用downloadFile 下载zip 文件，header 参数带 If-Modified-Since 字段用于避免重复下载相同 zip 文件
     *     (1) status Code == 200，更新 cacheList.json
     *        若是已存在的bundle更新，则解压到新目录，删除原有目录，
     *        若是未存在的bundle，不做其它操作
     *     (2) status Code == 304, 将已缓存的本地路径传给 onComplete 回调
     *     (3) status Code 等于其它或者downloadFile 返回 fail的回调，进行失败处理
     */
    let header = {};
    let unZipTargetPath = `${ral.env.USER_DATA_PATH}/${Date.now().toString()}`;
    let zipUrl = `${bundlePath}/res.${zipVersion ? zipVersion + '.' : ''}zip`;

    if (_zipCache[bundlePath]) {
        header["If-Modified-Since"] = _zipCache[bundlePath].lastModifiedTime;
    } else {
        // 本地未记录该 remote zipped bundle 的相关信息，表示第一次下载该 url, 必须要下载
        header["If-Modified-Since"] = null;
    }

    ral.downloadFile({
        url: zipUrl,
        header: header,
        filePath: unZipTargetPath + ".zip",
        success: function (res) {
            if (res.statusCode === 200) {
                _fsm.unzip({
                    zipFilePath: res.filePath,
                    targetPath: unZipTargetPath,
                    success: function () {
                        /**
                         * 1.判断是否是对已有 bundle 的版本替换
                         * (1) 若是，删除老版本 bundle 的解压目录
                         * (2) 若不是，不用操作
                         * 2.更新 json 文件
                         */
                        try {
                            if (_zipCache[bundlePath]) {
                                _fsm.rmdirSync(_zipCache[bundlePath].unZipTargetPath, true);
                            }
                            let lastModifiedTime = (new Date()).toUTCString();
                            _zipCache[bundlePath] = {
                                unzipPath: unZipTargetPath,
                                lastModifiedTime: lastModifiedTime
                            };
                            _fsm.writeFileSync(CACHED_FILE_PATH, JSON.stringify(_zipCache), 'utf8');
                        } catch (e) {
                            console.warn(e);
                        }
                        onComplete && onComplete(null, unZipTargetPath);
                    },
                    fail: function (res) {
                        console.warn(`Unzip file failed: path: ${zipUrl}`);
                        onComplete && onComplete(new Error(res.errMsg), null);
                    }
                });
            } else if (res.statusCode === 304) {
                onComplete && onComplete(null, _zipCache[bundlePath].unzipPath);
            } else {
                console.warn(`Download file failed: path: ${zipUrl} message: ${res.statusCode}`);
                onComplete && onComplete(new Error(res.statusCode), null);
            }
        },
        fail: function (res) {
            console.warn(`Download file failed: path: ${zipUrl} message: ${res.statusCode}`);
            onComplete && onComplete(new Error(res.errMsg), null);
        }
    });
}
_downloader.register("bundle", downloadBundle);