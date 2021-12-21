import React from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { prepareAinimation } from "./GiftLottie";
import { GiftType } from "../../dtos";
export default React.memo(function () {
    var gift = useSelector(function (state) { return state.liveStreamingState; }).gift;
    console.log(gift);
    return (React.createElement("div", { id: "gift-container", className: "animate__animated" },
        (gift === null || gift === void 0 ? void 0 : gift.gift_data.gift_type) == GiftType.LOTTIE && (React.createElement(Lottie, { options: prepareAinimation(gift.gift_data.resource), style: { zIndex: 10000 } })),
        (gift === null || gift === void 0 ? void 0 : gift.gift_data.gift_type) == GiftType.GIF && (React.createElement("img", { src: gift.gift_data.resource, alt: "", style: { zIndex: 10000 } }))));
});
