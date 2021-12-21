import { Avatar } from "@mui/material";
import classNames from "classnames";
import { cloneDeep, filter, get, map } from "lodash";
import { useSelector } from "react-redux";
import React from "react";
var BoxGridLiveItem = function (_a) {
    var gift = _a.gift;
    var giftNotifyBaseClass = useSelector(function (state) { return state.liveStreamingState; }).giftNotifyBaseClass;
    return (React.createElement("div", { id: gift.queue_id, className: classNames(giftNotifyBaseClass, "animate__fadeInRight") },
        React.createElement(Avatar, { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkwYQuTYcqB7wnAvzApNYO2MLl_Llz4RyyA&usqp=CAU" }),
        React.createElement("div", { className: "d-flex flex-column ms-2" },
            React.createElement("div", { className: "fw-bolder" }, gift.user_name),
            React.createElement("div", null,
                "Send ",
                gift.gift_data.name))));
};
export default (function () {
    var _a = useSelector(function (state) { return state; }), chanelGifts = _a.liveStreamingState.chanelGifts, _b = _a.sessionState, currentChanel = _b.currentChanel, currentLoginInformation = _b.currentLoginInformation;
    var gifts = cloneDeep(filter(get(chanelGifts, currentChanel)));
    return (React.createElement("div", { className: "box-gift d-flex flex-column justify-content-end" }, map(gifts, function (item, idx) { return (React.createElement(BoxGridLiveItem, { key: idx, gift: item })); })));
});
