let _map = new WeakMap();

export default class NodeList {
    constructor() {
        _map.set(this, {
            array: []
        });

        return new Proxy(this, {
            get(target, key) {
                if (typeof key === "symbol") {
                    return function () { return "" };
                }

                if(/^[0-9]*$/.test(key)) {
                    return _map.get(target).array[key];
                }

                let result = target[key];
                if(typeof result === "function") {
                    result = result.bind(target);
                }

                return result;
            }
        });
    }

    push(element) {
        _map.get(this).array.push(element);
    }

    item(index) {
        return _map.get(this).array[index];
    }

    get length() {
        return _map.get(this).array.length;
    }

    concat() {
        let array = _map.get(this).array;
        return array.concat.apply(array, arguments);
    }
}