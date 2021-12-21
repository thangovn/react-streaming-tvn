"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomNo = function (num) {
    return Math.floor(Math.random() * num);
};
var getRandomStyles = function () {
    var r = randomNo(255);
    var g = randomNo(255);
    var b = randomNo(255);
    var mt = randomNo(200);
    var ml = randomNo(50);
    var dur = randomNo(5) + 5;
    return {
        backgroundColor: "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.7)"),
        color: "rgba(".concat(r, ",").concat(g, ",").concat(b, ",0.7)"),
        boxShadow: "inset -7px -3px 10px rgba(".concat(r - 10, ",").concat(g - 10, ",").concat(b - 10, ",0.7)"),
        margin: "".concat(mt, "px 0 0 ").concat(ml, "px"),
        animation: "float ".concat(4, "s ease-in infinite")
    };
};
var ballon = {
    getRandomStyles: getRandomStyles
};
exports.default = ballon;
