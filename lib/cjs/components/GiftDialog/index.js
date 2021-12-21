"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var material_1 = require("@mui/material");
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var useToggle_1 = __importDefault(require("react-use/lib/useToggle"));
var dtos_1 = require("../../dtos");
var useSocketIO_1 = __importDefault(require("../../hooks/useSocketIO"));
var index_1 = require("../../images/index");
var GiftGif_1 = __importDefault(require("./GiftGif"));
var GiftLottie_1 = __importDefault(require("./GiftLottie"));
var GiftDialog = function (_a) {
    var className = _a.className, value = _a.value, loading = _a.loading, socketURL = _a.socketURL;
    var sendGift = (0, useSocketIO_1.default)(socketURL).sendGift;
    var dialogRef = (0, react_1.useRef)(null);
    var _b = (0, useToggle_1.default)(false), open = _b[0], toggleOpen = _b[1];
    var _c = (0, react_redux_1.useSelector)(function (state) { return state.sessionState; }), currentChanel = _c.currentChanel, currentLoginInformation = _c.currentLoginInformation;
    var onGiftClicked = function (item) {
        sendGift(__assign({ chanel_id: currentChanel, quantity: 99, gift_data: item, time: new Date().toISOString() }, currentLoginInformation));
        toggleOpen();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Button, { variant: "text", onClick: toggleOpen, disableRipple: true, className: (0, classnames_1.default)(className) },
            react_1.default.createElement("img", { src: index_1.gift_icon.default, className: "ms-auto", style: { width: "5rem" } })),
        react_1.default.createElement(material_1.Dialog, { ref: dialogRef, open: true, onClose: toggleOpen, className: (0, classnames_1.default)({ "d-none": !open }), "aria-labelledby": "alert-dialog-title", PaperProps: { className: "dark-dialog gift-dialog" }, "aria-describedby": "alert-dialog-description", maxWidth: "sm" },
            react_1.default.createElement(material_1.DialogContent, { className: "text-light" },
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 1, className: "gift-container" },
                    loading && react_1.default.createElement(material_1.CircularProgress, null),
                    !loading &&
                        (0, lodash_1.map)(value, function (item, idx) {
                            return (react_1.default.createElement(material_1.Grid, { item: true, md: 3, key: idx, className: (0, classnames_1.default)("position-relative") },
                                item.gift_type === dtos_1.GiftType.LOTTIE && (react_1.default.createElement(GiftLottie_1.default, { resource: item.resource, name: item.name, isStopped: !open, onClick: function () { return onGiftClicked(item); } })),
                                item.gift_type === dtos_1.GiftType.GIF && (react_1.default.createElement(GiftGif_1.default, { resource: item.resource, name: item.name, isStopped: !open, onClick: function () { return onGiftClicked(item); } }))));
                        }))))));
};
exports.default = GiftDialog;
