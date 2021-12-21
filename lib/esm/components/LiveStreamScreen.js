import { fetchSignInKey } from "../utils/signInKey";
import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LiveStreamingScreenLayout from "../layouts/ScreenLayout";
import { persistor, store } from "../stores";
import "../styles/app.scss";
import GiftDialog from "./GiftDialog";
import GiftContainer from "./GiftDialog/GiftContainer";
import LiveAgoraTVN from "./LiveAgoraTVN";
import LiveChat from "./LiveChat";
import sessionActions from "../stores/actions/sessionActions";
export default React.memo(function (_a) {
    var _b = _a.userInfo, user_id = _b.user_id, user_name = _b.user_name, _c = _a.configChat, _d = _c.socketURL, socketURL = _d === void 0 ? "18.138.225.4:5000" : _d, channelChat = _c.channelChat, _e = _a.configLive, _f = _e.autoJoin, autoJoin = _f === void 0 ? true : _f, _g = _e.showSetting, showSetting = _g === void 0 ? false : _g, uid = _e.uid, appid = _e.appid, token = _e.token, channelLive = _e.channelLive, giftData = _a.giftData;
    var _h = useState(""), appId = _h[0], setAppId = _h[1];
    var _j = useState(null), statusAppId = _j[0], setStatusAppId = _j[1];
    var dispatch = useDispatch();
    var initial = function (res) {
        if (res.error) {
            setStatusAppId({
                statusCode: res.error.statusCode,
                name: res.error.name,
                message: res.error.message,
            });
        }
        else {
            setAppId(res.secret);
            setStatusAppId({
                statusCode: 200,
                name: "ok",
                message: "ok",
            });
        }
    };
    useEffect(function () {
        fetchSignInKey(appid)
            .then(function (res) {
            initial(res);
        })
            .catch();
    }, [appid]);
    useEffect(function () {
        dispatch(sessionActions.setCurrentLoginInformations({
            user_name: user_name,
            user_id: user_id,
        }));
    }, [user_id, user_name]);
    useEffect(function () {
        dispatch(sessionActions.setCurrentChanel(channelChat));
    }, [channelChat]);
    var rederResult = function () {
        if ((statusAppId === null || statusAppId === void 0 ? void 0 : statusAppId.statusCode) == 200) {
            return (React.createElement(React.Fragment, null,
                React.createElement(GiftContainer, null),
                React.createElement(LiveChat, { socketURL: socketURL, channelChat: channelChat, onReceiveGift: function (gift) {
                        console.log(gift);
                    } }),
                React.createElement(GiftDialog, { className: "gift-absolute", value: giftData.value, loading: giftData.loading, socketURL: socketURL }),
                React.createElement(LiveAgoraTVN, { appid: appId, channel: channelLive, autoJoin: autoJoin, showSetting: showSetting, token: token, uid: uid })));
        }
        else {
            return (React.createElement("div", { className: "loading-wrap" },
                React.createElement("div", { className: "content" }, statusAppId === null || statusAppId === void 0 ? void 0 : statusAppId.message)));
        }
    };
    return (React.createElement(ReduxProvider, { store: store },
        React.createElement(PersistGate, { loading: null, persistor: persistor },
            React.createElement(HelmetProvider, null,
                React.createElement("div", { className: "live-streaming-screen container d-flex flex-column flex-fill" },
                    React.createElement(LiveStreamingScreenLayout, { className: "screen " }, rederResult()))))));
});
