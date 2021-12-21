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
import { Button, Icon, Popover, TextField } from "@mui/material";
import classNames from "classnames";
import { Picker } from "emoji-mart";
// import { socket } from "../index";
import { get, map } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sessionActions from "../stores/actions/sessionActions";
import BoxGift from "./BoxGift";
import { ticon_arrow_bottom } from "../images/index";
import useSocketIO from "../hooks/useSocketIO";
export default (function (_a) {
    var channelChat = _a.channelChat, onReceiveGift = _a.onReceiveGift, socketURL = _a.socketURL;
    var _b = useSelector(function (state) { return state; }), _c = _b.sessionState, currentLoginInformation = _c.currentLoginInformation, currentChanel = _c.currentChanel, chanelMessages = _b.liveStreamingState.chanelMessages;
    var _d = React.useState(null), anchorEl = _d[0], setAnchorEl = _d[1];
    var _e = useState(""), mess = _e[0], setMess = _e[1];
    var open = Boolean(anchorEl);
    var id = open ? "simple-popover" : undefined;
    var dispatch = useDispatch();
    var _f = useSocketIO(socketURL), joinState = _f.joinState, sendMessage = _f.sendMessage, joinChat = _f.joinChat, leaveChat = _f.leaveChat, errors = _f.errors, messages = _f.messages;
    useEffect(function () {
        if (currentLoginInformation && channelChat) {
            dispatch(sessionActions.setCurrentChanel(channelChat));
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
    return (React.createElement("div", { className: "live-chat", style: { position: "absolute" } },
        React.createElement(BoxGift, null),
        React.createElement("div", { id: "box-chat", className: "box-chat hide--slide-y show" },
            map(get(chanelMessages, currentChanel), function (item, index) {
                return (React.createElement("div", { key: index, className: classNames("box-chat-item rounded-pill", {
                        "text-end": currentLoginInformation.user_id === item.user_id,
                        "text-start": currentLoginInformation.user_id !== item.user_id,
                    }) },
                    React.createElement("span", { className: classNames("box-chat-item--text", {
                            current: currentLoginInformation.user_id === item.user_id,
                        }) },
                        React.createElement("b", null,
                            item.user_name,
                            ":"),
                        " ",
                        item.message)));
            }),
            React.createElement("a", { id: "end" })),
        React.createElement("div", null,
            React.createElement(Button, { onClick: handleHideChat, variant: "text", disableTouchRipple: true },
                React.createElement("img", { id: "hideIcon", className: "ticon rotate-225 back", src: ticon_arrow_bottom.default, style: { width: 20, height: 20 } }))),
        React.createElement("div", { className: "chatInputWrap hide--slide-x hide--slide-y show", id: "chatInputWrap" },
            React.createElement(TextField, { className: "overflow-hidden", variant: "standard", id: "chatInput", fullWidth: true, value: mess, size: "medium", onKeyDown: function (e) { return Boolean(e.keyCode == 13) && onSend(); }, onChange: function (e) { return setMess(e.target.value); }, InputProps: {
                    startAdornment: (React.createElement(Button, { onClick: handleClick, "aria-describedby": id, variant: "text", disableTouchRipple: true },
                        React.createElement(Icon, { className: "hover--opacity" }, "mood"))),
                    endAdornment: (React.createElement(Button, { name: "SEND", onClick: onSend, className: "btn-send-chat br-5" }, "SEND")),
                    disableUnderline: true,
                } })),
        React.createElement(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, elevation: 0, disablePortal: true, anchorOrigin: { vertical: "top", horizontal: "right" }, transformOrigin: { vertical: "bottom", horizontal: "left" } },
            React.createElement(Picker, { theme: "dark", showPreview: false, showSkinTones: false, useButton: false, emojiSize: 20, sheetSize: 20, onSelect: addEmoji }))));
});
