Object.defineProperty(PIXI.settings.RENDER_OPTIONS, "width", {
    get() {
        return window.innerWidth;
    },
    set(value) {
    }
});

Object.defineProperty(PIXI.settings.RENDER_OPTIONS, "height", {
    get() {
        return window.innerHeight;
    },
    set(value) {
    }
});