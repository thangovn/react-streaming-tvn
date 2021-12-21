"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAinimation = exports.GIF_ICON_HEIGHT = exports.GIF_ICON_WIDTH = void 0;
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = require("lodash");
var react_1 = __importDefault(require("react"));
exports.GIF_ICON_WIDTH = 120;
exports.GIF_ICON_HEIGHT = 120;
var prepareAinimation = function (animationData) { return ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStoped: true,
    isPause: true,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
}); };
exports.prepareAinimation = prepareAinimation;
exports.default = (function (_a) {
    var resource = _a.resource, onClick = _a.onClick, isStopped = _a.isStopped, name = _a.name;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, classnames_1.default)("gift-lottie p-1", {
                "d-none": isStopped,
            }), onClick: onClick, style: {
                display: "flex",
                alignItems: "center",
                //   top: "10%",
                //   left: "10%",
                //   bottom: 0,
                //   right: 0,
                height: exports.GIF_ICON_HEIGHT,
                width: exports.GIF_ICON_WIDTH,
                cursor: "pointer",
            } },
            react_1.default.createElement("img", { src: resource, alt: name, style: {
                    maxWidth: "90%",
                    maxHeight: "90%",
                } }),
            react_1.default.createElement("tspan", { style: { letterSpacing: "0.01rem", position: "absolute", bottom: 0 } }, (0, lodash_1.capitalize)(name)))));
});
