let _subpackages = {};
let _remoteBundles = {};
let _server;
let _downloader = cc.assetManager.downloader;
let _originInit = cc.assetManager.init;

cc.assetManager.init = function (options) {
    options.subpackages && options.subpackages.forEach(x => _subpackages[x] = true);
    options.remoteBundles && options.remoteBundles.forEach(x => _remoteBundles[x] = true);
    _server = options.server + "/remote/";
    _originInit.apply(this, arguments);
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
        }

        // 加载 bundle 中的 json 文件
        _downloader.downloadFile(bundleConfig, options, options.onFileProgress, function (err, response) {
            if (err) {
                error = err;
            }
            if (typeof response === 'string') {
                try {
                    response = JSON.parse(response);
                    out = response;
                    out && (out.base = bundlePath + '/');
                } catch (e) {
                    error = e;
                }
            }
            // 当 json 文件与 js 文件都加载完成，才将 json 对象赋值给回调函数
            count++;
            if (count === 2) {
                onComplete(error, out);
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

_downloader.register("bundle", downloadBundle);