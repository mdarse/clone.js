/**
 * Clone.js
 * 
 * Full source at http://github.com/mdarse/clone.js
 * Copyright (c) 2013 Mathieu Darse <hello@mathieudarse.fr>
 *
 * Clone.js may be freely distributed under the MIT license.
 */
Object.clone || Object.clone = function clone(object, deepClone, clonePrototype) {
    var visited = [],
        set = [];
    return _clone(object);

    function _clone(object) {
        if (typeof object !== 'object' || object === null) { // because typeof null => 'object'
            // immutable primitive types (string, number, boolean, undefined), function or null
            clone = object;
        } else {
            var index = visited.indexOf(object), clone;
            if (index === -1) {
                clone = _createInstance(object);
                visited.push(object);
                set.push(clone);
                _extend(clone, object);
            } else {
                clone = set[index];
            }
        }
        return clone;
    }

    function _createInstance(object) {
        var className = Object.prototype.toString.call(object).slice(8, -1);
        switch (className) {
            // primitive wrapper types
            case 'Boolean':
                return new Boolean(!!object);
            case 'Number': // includes NaN
                return new Number(+object);
            case 'String':
                return new String('' + object);
            // special types
            case 'Function': // TODO clone with Function.prototype.bind ?
            case 'Error':
                return object; // Can't clone these
            case 'Date':
                return new Date(+object);
            case 'RegExp':
                return new RegExp(object);
            // regular types
            case 'Array':
                return new Array(object.length);
            case 'Object':
                var prototype = Object.getPrototypeOf(object);
                if (clonePrototype && prototype !== Object.prototype) {
                    var ctorDescriptor = {
                        value: prototype.constructor,
                        writable: true,
                        enumerable: false,
                        configurable: true
                    };
                    prototype = _clone(prototype);
                    Object.defineProperty(prototype, 'constructor', ctorDescriptor);
                }
                return Object.create(prototype);
            default:
                throw new TypeError("Can't clone object, type \"%1\" is unsupported".replace('%1', className));
        }
    }

    function _extend(base, object) {
        if (base === object) return;
        var keys = Object.keys(object);
        // var keys = Object.getOwnPropertyNames(object);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            var value = object[key];
            var descriptor = Object.getOwnPropertyDescriptor(object, key);
            descriptor.value = deepClone ? _clone(value) : value;
            Object.defineProperty(base, key, descriptor);
        }
    }
};