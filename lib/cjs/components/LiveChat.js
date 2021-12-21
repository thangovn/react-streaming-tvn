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
var emoji_mart_1 = require("emoji-mart");
// import { socket } from "../index";
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var sessionActions_1 = __importDefault(require("../stores/actions/sessionActions"));
var BoxGift_1 = __importDefault(require("./BoxGift"));
var index_1 = require("../images/index");
var useSocketIO_1 = __importDefault(require("../hooks/useSocketIO"));
exports.default = (function (_a) {
    var channelChat = _a.channelChat, onReceiveGift = _a.onReceiveGift, socketURL = _a.socketURL;
    var _b = (0, react_redux_1.useSelector)(function (state) { return state; }), _c = _b.sessionState, currentLoginInformation = _c.currentLoginInformation, currentChanel = _c.currentChanel, chanelMessages = _b.liveStreamingState.chanelMessages;
    var _d = react_1.default.useState(null), anchorEl = _d[0], setAnchorEl = _d[1];
    var _e = (0, react_1.useState)(""), mess = _e[0], setMess = _e[1];
    var open = Boolean(anchorEl);
    var id = open ? "simple-popover" : undefined;
    var dispatch = (0, react_redux_1.useDispatch)();
    var _f = (0, useSocketIO_1.default)(socketURL), joinState = _f.joinState, sendMessage = _f.sendMessage, joinChat = _f.joinChat, leaveChat = _f.leaveChat, errors = _f.errors, messages = _f.messages;
    (0, react_1.useEffect)(function () {
        if (currentLoginInformation && channelChat) {
            dispatch(sessionActions_1.default.setCurrentChanel(channelChat));
            joinChat(__assign(__assign({}, currentLoginInformation), { chanel_id: channelChat }));
        }
        return function () {
            leaveChat(__assign(__assign({}, currentLoginInformation), { chanel_id: channelChat }));
        };
    }, []);
    // useEffect(() => {
    //   joinChat("khoa", "khoa", "bacarat-18");
    //   return () => leaveChat("khoa", "khoa", "bacarat-18");
    // }, []);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleHideChat = function (event) {
        var _a, _b, _c;
        (_a = document.getElementById("box-chat")) === null || _a === void 0 ? void 0 : _a.classList.toggle("show");
        (_b = document.getElementById("chatInputWrap")) === null || _b === void 0 ? void 0 : _b.classList.toggle("show");
        (_c = document.getElementById("hideIcon")) === null || _c === void 0 ? void 0 : _c.classList.toggle("back");
    };
    var addEmoji = function (emj) {
        setMess(mess + String.fromCodePoint(parseInt(emj.unified, 16)));
    };
    var onSend = function () {
        if (mess === "")
            return;
        var data = __assign(__assign({}, currentLoginInformation), { chanel_id: currentChanel, message: mess });
        // console.log(data);
        sendMessage(data);
        setMess("");
    };
    return (react_1.default.createElement("div", { className: "live-chat", style: { position: "absolute" } },
        react_1.default.createElement(BoxGift_1.default, null),
        react_1.default.createElement("div", { id: "box-chat", className: "box-chat hide--slide-y show" },
            (0, lodash_1.map)((0, lodash_1.get)(chanelMessages, currentChanel), function (item, index) {
                return (react_1.default.createElement("div", { key: index, className: (0, classnames_1.default)("box-chat-item rounded-pill", {
                        "text-end": currentLoginInformation.user_id === item.user_id,
                        "text-start": currentLoginInformation.user_id !== item.user_id,
                    }) },
                    react_1.default.createElement("span", { className: (0, classnames_1.default)("box-chat-item--text", {
                            current: currentLoginInformation.user_id === item.user_id,
                        }) },
                        react_1.default.createElement("b", null,
                            item.user_name,
                            ":"),
                        " ",
                        item.message)));
            }),
            react_1.default.createElement("a", { id: "end" })),
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Button, { onClick: handleHideChat, variant: "text", disableTouchRipple: true },
                react_1.default.createElement("img", { id: "hideIcon", className: "ticon rotate-225 back", src: index_1.ticon_arrow_bottom.default, style: { width: 20, height: 20 } }))),
        react_1.default.createElement("div", { className: "chatInputWrap hide--slide-x hide--slide-y show", id: "chatInputWrap" },
            react_1.default.createElement(material_1.TextField, { className: "overflow-hidden", variant: "standard", id: "chatInput", fullWidth: true, value: mess, size: "medium", onKeyDown: function (e) { return Boolean(e.keyCode == 13) && onSend(); }, onChange: function (e) { return setMess(e.target.value); }, InputProps: {
                    startAdornment: (react_1.default.createElement(material_1.Button, { onClick: handleClick, "aria-describedby": id, variant: "text", disableTouchRipple: true },
                        react_1.default.createElement(material_1.Icon, { className: "hover--opacity" }, "mood"))),
                    endAdornment: (react_1.default.createElement(material_1.Button, { name: "SEND", onClick: onSend, className: "btn-send-chat br-5" }, "SEND")),
                    disableUnderline: true,
                } })),
        react_1.default.createElement(material_1.Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, elevation: 0, disablePortal: true, anchorOrigin: { vertical: "top", horizontal: "right" }, transformOrigin: { vertical: "bottom", horizontal: "left" } },
            react_1.default.createElement(emoji_mart_1.Picker, { theme: "dark", showPreview: false, showSkinTones: false, useButton: false, emojiSize: 20, sheetSize: 20, onSelect: addEmoji }))));
});
