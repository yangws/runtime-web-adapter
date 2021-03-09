import _UTIL from "../util";
import _FEATURE from "../feature";
if (!window.jsb) {
    window.ral = {};
} else {
    window.ral = Object.assign({}, window.jsb);
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
require("./rendering/font");
require("./rendering/frame");
require("./rendering/image");

// other
_UTIL.exportTo("getFeatureProperty", _FEATURE, ral);