
'use strict';

function new_constructor(extend, initializer, methods) {
    var func, prototype = Object.create(extend && extend.prototype);

    if (methods) {
        methods.keys().forEach(function(key) {
            prototype[key] = methods[key];
        });
    }

    func = function() {
        var that = Object.create(prototype);
        if (typeof initializer === 'function') {
            initializer.apply(that, arguments);
        }
        return that
    }
    func.prototype = prototype;
    prototype.constructor = func;
    return func;
}


var sx = sx || {};
sx.array = sx.array || {};
sx.str = sx.str || {};

// get angular directive elements height
sx.elHeight = function(element) {
    return element[0].getBoundingClientRect().height;
}

function isFunction(value) {
  return typeof value == 'function';
}





// Array.prototype.makeQuote = function(quoted) {
//
//     for (var i = 0; i < this.length; i++) {
//         this[i] = '>'+this[i];
//     }
//     var msg = this.join('\n\n');
//     return quoted + ': \n' + msg;
//
// }



sx.array.remove = function(arr, removed) {
    var index = -1;
    var length = arr ? arr.length : 0;
    var array = arr;
    var remove = removed;

    while (++index < length) {
        if (array[index] == remove) {
            array.splice(index, 1);
            index--
        }
    }
    return array;
}

sx.compose = function() {
    var fns = arguments;
    var length = fns.length;

    while (length--) {
        if (!isFunction(fns[length])) {
            throw new TypeError;
        }
    }
    return function() {
        var args = arguments;
        var length = fns.length;

        while (length--) {
            args = [fns[length].apply(this, args)];
        }
        return args[0];
    };
}
