let _subpackages = {};
let _remoteBundles = {};
let _server;
let _downloader = cc.assetManager.downloader;
let _originInit = cc.assetManager.init;
let _zipCache = {}; // 属性名: zip 包路径; 属性值: zip 包解压后根目录的本地路径
let _fsm = ral.getFileSystemManager();
const CACHED_FILE_PATH = ral.env.USER_DATA_PATH + "/cacheList.json";

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
                    if (out.isZip) {
                        let zipVersion = out.zipVersion;
                        let zipUrl = `${bundlePath}/res.${zipVersion ? zipVersion + '.' : ''}zip`;
                        _handleZip(zipUrl, function (err, unzipPath) {
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


function _handleZip(zipUrl, onComplete) {
    /**
    * 判断是否需要解压(USER_DATA_PATH 路径下是否已经有 url 指向文件所解压的文件)
    * 1.若不需要解压，则将根目录传给 onComplete 回调函数
    * 2.若要解压，则解压到指定路径，并将根目录的传给 onComplete 回调函数
    */
    let isCachedUnzip = _zipCache[zipUrl];
    if (isCachedUnzip) {
        let cachedUnzipPath = _zipCache[zipUrl];
        onComplete && onComplete(null, cachedUnzipPath);
    } else {
        let time = Date.now().toString();
        let unZipTargetPath = `${ral.env.USER_DATA_PATH}/${time}`;

        ral.downloadFile({
            url: zipUrl,
            filePath: unZipTargetPath + ".zip",
            success: function (res) {
                if (res.statusCode === 200) {
                    _fsm.unzip({
                        zipFilePath: res.filePath,
                        targetPath: unZipTargetPath,
                        success: function () {
                            _zipCache[zipUrl] = unZipTargetPath;
                            _fsm.writeFileSync(CACHED_FILE_PATH, JSON.stringify(_zipCache), 'utf8');
                            onComplete && onComplete(null, unZipTargetPath);
                        },
                        fail: function (res) {
                            console.warn(`Unzip file failed: path: ${zipUrl}`);
                            onComplete && onComplete(new Error(res.errMsg), null);
                        }
                    });
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

}


_downloader.register("bundle", downloadBundle);