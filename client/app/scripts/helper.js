
'use strict';

var sx = sx || {};
sx.array = sx.array || {};
sx.str = sx.str || {};

function isFunction(value) {
  return typeof value == 'function';
}

Array.prototype.quote = function(quoted) {
    // remove the empty indexes

    for (var i = 0; i < this.length; i++) {
        this[i] = '>'+this[i];
    }
    var msg = this.join('\n\n');
    return quoted + ': \n' + msg + '\n\n';

}



sx.array.remove = function(arr, removed) {
    var index = -1;
    var length = arr ? arr.length : 0;

    while (++index < length) {
        if (arr[index] == removed) {
            arr.splice(index, 1);
            index--
        }
    }
    return arr;
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
