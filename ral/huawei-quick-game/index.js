import _UTIL from "../util";
import _FEATURE from "../feature";

if (window.jsb) {
    window.ral = Object.assign({}, window.jsb);
} else {
    window.ral = {};
}

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
// network
require("./network/download");
// rendering
require("./rendering/canvas");
require("./rendering/webgl");
require("./rendering/font");
require("./rendering/frame");
require("./rendering/image");
_UTIL.exportTo("getFeaturePropertyString", _FEATURE, ral);
_UTIL.exportTo("registerFeaturePropertyListener", _FEATURE, ral);
_UTIL.exportTo("getFeaturePropertyInt", _FEATURE, ral);
_UTIL.exportTo("setFeaturePropertyInt", _FEATURE, ral);