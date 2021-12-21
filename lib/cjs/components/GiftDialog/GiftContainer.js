"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_lottie_1 = __importDefault(require("react-lottie"));
var react_redux_1 = require("react-redux");
var GiftLottie_1 = require("./GiftLottie");
var dtos_1 = require("../../dtos");
exports.default = react_1.default.memo(function () {
    var gift = (0, react_redux_1.useSelector)(function (state) { return state.liveStreamingState; }).gift;
    console.log(gift);
    return (react_1.default.createElement("div", { id: "gift-container", className: "animate__animated" },
        (gift === null || gift === void 0 ? void 0 : gift.gift_data.gift_type) == dtos_1.GiftType.LOTTIE && (react_1.default.createElement(react_lottie_1.default, { options: (0, GiftLottie_1.prepareAinimation)(gift.gift_data.resource), style: { zIndex: 10000 } })),
        (gift === null || gift === void 0 ? void 0 : gift.gift_data.gift_type) == dtos_1.GiftType.GIF && (react_1.default.createElement("img", { src: gift.gift_data.resource, alt: "", style: { zIndex: 10000 } }))));
});
