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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agora_rtc_sdk_ng_1 = __importDefault(require("agora-rtc-sdk-ng"));
var react_1 = __importStar(require("react"));
var useAgora_1 = __importDefault(require("../hooks/useAgora"));
var MediaPlayer_1 = __importDefault(require("./MediaPlayer"));
var client = agora_rtc_sdk_ng_1.default.createClient({ codec: "h264", mode: "live" });
var LiveAgoraTVN = function (_a) {
    var _b = _a.appid, appid = _b === void 0 ? "3098260ca7614087844230aec70a64eb" : _b, _c = _a.channel, channel = _c === void 0 ? "demo" : _c, token = _a.token, uid = _a.uid, _d = _a.showSetting, showSetting = _d === void 0 ? false : _d, _e = _a.autoJoin, autoJoin = _e === void 0 ? true : _e;
    var _f = (0, useAgora_1.default)(client !== null && client !== void 0 ? client : null), localAudioTrack = _f.localAudioTrack, localVideoTrack = _f.localVideoTrack, leave = _f.leave, join = _f.join, joinState = _f.joinState, remoteUsers = _f.remoteUsers, errors = _f.errors, joinAu = _f.joinAu;
    (0, react_1.useEffect)(function () {
        if (autoJoin)
            joinAu(appid, channel, token);
    }, []);
    return (react_1.default.createElement("div", { className: "call h-100" },
        Boolean(showSetting) && (react_1.default.createElement("div", { className: "button-group" },
            react_1.default.createElement("button", { id: "join", type: "button", className: "btn-primary mr-2", disabled: joinState, onClick: function () {
                    join(appid, channel, token);
                } }, "Create Chanel"),
            react_1.default.createElement("button", { id: "join", type: "button", className: "btn-primary mr-2", disabled: joinState, onClick: function () {
                    joinAu(appid, channel, token);
                } }, "Join"),
            react_1.default.createElement("button", { id: "leave", type: "button", color: "error", disabled: !joinState, onClick: function () {
                    leave();
                } }, "Leave"))),
        react_1.default.createElement("div", { className: "player-container h-100 position-relative" },
            Boolean(joinState) && (react_1.default.createElement("div", { className: "loading-wrap" },
                react_1.default.createElement("div", { className: "loader m-auto" }),
                react_1.default.createElement("div", { className: "content" }, "Waiting for connection"))),
            remoteUsers.map(function (user) { return (react_1.default.createElement("div", { className: "remote-player-wrapper", key: user.uid },
                react_1.default.createElement(MediaPlayer_1.default, { videoTrack: user.videoTrack, audioTrack: user.audioTrack }))); }))));
};
exports.default = LiveAgoraTVN;
