"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@mui/material");
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = require("lodash");
var react_redux_1 = require("react-redux");
var react_1 = __importDefault(require("react"));
var BoxGridLiveItem = function (_a) {
    var gift = _a.gift;
    var giftNotifyBaseClass = (0, react_redux_1.useSelector)(function (state) { return state.liveStreamingState; }).giftNotifyBaseClass;
    return (react_1.default.createElement("div", { id: gift.queue_id, className: (0, classnames_1.default)(giftNotifyBaseClass, "animate__fadeInRight") },
        react_1.default.createElement(material_1.Avatar, { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkwYQuTYcqB7wnAvzApNYO2MLl_Llz4RyyA&usqp=CAU" }),
        react_1.default.createElement("div", { className: "d-flex flex-column ms-2" },
            react_1.default.createElement("div", { className: "fw-bolder" }, gift.user_name),
            react_1.default.createElement("div", null,
                "Send ",
                gift.gift_data.name))));
};
exports.default = (function () {
    var _a = (0, react_redux_1.useSelector)(function (state) { return state; }), chanelGifts = _a.liveStreamingState.chanelGifts, _b = _a.sessionState, currentChanel = _b.currentChanel, currentLoginInformation = _b.currentLoginInformation;
    var gifts = (0, lodash_1.cloneDeep)((0, lodash_1.filter)((0, lodash_1.get)(chanelGifts, currentChanel)));
    return (react_1.default.createElement("div", { className: "box-gift d-flex flex-column justify-content-end" }, (0, lodash_1.map)(gifts, function (item, idx) { return (react_1.default.createElement(BoxGridLiveItem, { key: idx, gift: item })); })));
});
