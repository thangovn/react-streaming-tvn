"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = __importDefault(require("classnames"));
var react_1 = __importDefault(require("react"));
var LiveStreamingScreenLayout = function (props) {
    var children = props.children, className = props.className;
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(className, "position-relative flex-fill") },
        react_1.default.createElement("div", { className: "screen-player" }, children)));
};
exports.default = LiveStreamingScreenLayout;
