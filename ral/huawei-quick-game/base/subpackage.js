let _loadSubpackage = hbs.loadSubpackage.bind(hbs);
ral.loadSubpackage = function (object) {
    let obj = object;
    if (typeof object === "object") {
        obj = Object.assign({}, object);
        obj.subpackage = object.name;
    }
    return _loadSubpackage.call(this, obj);
};