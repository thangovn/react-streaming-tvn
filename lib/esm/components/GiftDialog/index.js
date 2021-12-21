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
import { Button, CircularProgress, Dialog, DialogContent, Grid, } from "@mui/material";
import classNames from "classnames";
import { map } from "lodash";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useToggle from "react-use/lib/useToggle";
import { GiftType } from "../../dtos";
import useSocketIO from "../../hooks/useSocketIO";
import { gift_icon } from "../../images/index";
import GiftGif from "./GiftGif";
import GiftLottie from "./GiftLottie";
var GiftDialog = function (_a) {
    var className = _a.className, value = _a.value, loading = _a.loading, socketURL = _a.socketURL;
    var sendGift = useSocketIO(socketURL).sendGift;
    var dialogRef = useRef(null);
    var _b = useToggle(false), open = _b[0], toggleOpen = _b[1];
    var _c = useSelector(function (state) { return state.sessionState; }), currentChanel = _c.currentChanel, currentLoginInformation = _c.currentLoginInformation;
    var onGiftClicked = function (item) {
        sendGift(__assign({ chanel_id: currentChanel, quantity: 99, gift_data: item, time: new Date().toISOString() }, currentLoginInformation));
        toggleOpen();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { variant: "text", onClick: toggleOpen, disableRipple: true, className: classNames(className) },
            React.createElement("img", { src: gift_icon.default, className: "ms-auto", style: { width: "5rem" } })),
        React.createElement(Dialog, { ref: dialogRef, open: true, onClose: toggleOpen, className: classNames({ "d-none": !open }), "aria-labelledby": "alert-dialog-title", PaperProps: { className: "dark-dialog gift-dialog" }, "aria-describedby": "alert-dialog-description", maxWidth: "sm" },
            React.createElement(DialogContent, { className: "text-light" },
                React.createElement(Grid, { container: true, spacing: 1, className: "gift-container" },
                    loading && React.createElement(CircularProgress, null),
                    !loading &&
                        map(value, function (item, idx) {
                            return (React.createElement(Grid, { item: true, md: 3, key: idx, className: classNames("position-relative") },
                                item.gift_type === GiftType.LOTTIE && (React.createElement(GiftLottie, { resource: item.resource, name: item.name, isStopped: !open, onClick: function () { return onGiftClicked(item); } })),
                                item.gift_type === GiftType.GIF && (React.createElement(GiftGif, { resource: item.resource, name: item.name, isStopped: !open, onClick: function () { return onGiftClicked(item); } }))));
                        }))))));
};
export default GiftDialog;
