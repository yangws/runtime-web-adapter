window.ral = window.ral || {};
export default class Screen {
    availTop = 0;
    availLeft = 0;
    availHeight = window.innerHeight;
    availWidth = window.innerWidth;
    colorDepth = 8;
    pixelDepth = 0;
    left = 0;
    top = 0;
    width = window.innerWidth;
    height = window.innerHeight;
    orientation = { //FIXME:cjh
        type: 'portrait-primary' // portrait-primary, portrait-secondary, landscape-primary, landscape-secondary
    };

    onorientationchange() {
    }
}