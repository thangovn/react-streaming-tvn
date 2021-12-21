"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var MediaPlayer = function (props) {
    var container = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!container.current)
            return;
        (_a = props.videoTrack) === null || _a === void 0 ? void 0 : _a.play(container.current);
        return function () {
            var _a;
            (_a = props.videoTrack) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [container, props.videoTrack]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (props.audioTrack) {
            (_a = props.audioTrack) === null || _a === void 0 ? void 0 : _a.play();
        }
        return function () {
            var _a;
            (_a = props.audioTrack) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [props.audioTrack]);
    return (react_1.default.createElement("div", { ref: container, className: "video-player", style: { width: "100%", height: "100%", position: "absolute" } }));
};
exports.default = MediaPlayer;
