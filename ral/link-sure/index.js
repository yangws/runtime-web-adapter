import _UTIL from "../util";

if (!window.jsb) {
    window.jsb = {};
}
// 将外部已知需要鉴别 runtime 明确不支持的功能的名称添加到 runtimeNonsupports 中。
let _runtimeNonsupports = {
    runtimeNonsupports: []
};
_UTIL.weakMap.set(jsb, _runtimeNonsupports);
jsb.runtimeSupport = function (name) {
    return !(_runtimeNonsupports.runtimeNonsupports.find(function (value) {
        return name === value;
    }));
};

// base
require("./base/lifecycle");
require("./base/subpackage");
require("./base/system-info");
require("./base/touch-event");
// device
require("./device/accelerometer");
require("./device/battery");
// file
require("./file/file-system-manager");
// interface
require("./interface/keyboard");
require("./interface/window");
// media
require("./media/audio");
require("./media/video");
// network
require("./network/download");
// rendering
require("./rendering/canvas");
require("./rendering/webgl");
require("./rendering/font");
require("./rendering/frame");
require("./rendering/image");