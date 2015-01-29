
'use strict';


if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(check) {
        return this.slice(0, check.length) === check;
    };
}
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(check) {
        return this.slice(-check.length) === check;
    };
}
