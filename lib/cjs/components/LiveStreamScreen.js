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
var signInKey_1 = require("../utils/signInKey");
var react_1 = __importStar(require("react"));
var react_helmet_async_1 = require("react-helmet-async");
var react_redux_1 = require("react-redux");
var react_2 = require("redux-persist/integration/react");
var ScreenLayout_1 = __importDefault(require("../layouts/ScreenLayout"));
var stores_1 = require("../stores");
require("../styles/app.scss");
var GiftDialog_1 = __importDefault(require("./GiftDialog"));
var GiftContainer_1 = __importDefault(require("./GiftDialog/GiftContainer"));
var LiveAgoraTVN_1 = __importDefault(require("./LiveAgoraTVN"));
var LiveChat_1 = __importDefault(require("./LiveChat"));
var sessionActions_1 = __importDefault(require("../stores/actions/sessionActions"));
exports.default = react_1.default.memo(function (_a) {
    var _b = _a.userInfo, user_id = _b.user_id, user_name = _b.user_name, _c = _a.configChat, _d = _c.socketURL, socketURL = _d === void 0 ? "18.138.225.4:5000" : _d, channelChat = _c.channelChat, _e = _a.configLive, _f = _e.autoJoin, autoJoin = _f === void 0 ? true : _f, _g = _e.showSetting, showSetting = _g === void 0 ? false : _g, uid = _e.uid, appid = _e.appid, token = _e.token, channelLive = _e.channelLive, giftData = _a.giftData;
    var _h = (0, react_1.useState)(""), appId = _h[0], setAppId = _h[1];
    var _j = (0, react_1.useState)(null), statusAppId = _j[0], setStatusAppId = _j[1];
    var dispatch = (0, react_redux_1.useDispatch)();
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
    (0, react_1.useEffect)(function () {
        (0, signInKey_1.fetchSignInKey)(appid)
            .then(function (res) {
            initial(res);
        })
            .catch();
    }, [appid]);
    (0, react_1.useEffect)(function () {
        dispatch(sessionActions_1.default.setCurrentLoginInformations({
            user_name: user_name,
            user_id: user_id,
        }));
    }, [user_id, user_name]);
    (0, react_1.useEffect)(function () {
        dispatch(sessionActions_1.default.setCurrentChanel(channelChat));
    }, [channelChat]);
    var rederResult = function () {
        if ((statusAppId === null || statusAppId === void 0 ? void 0 : statusAppId.statusCode) == 200) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(GiftContainer_1.default, null),
                react_1.default.createElement(LiveChat_1.default, { socketURL: socketURL, channelChat: channelChat, onReceiveGift: function (gift) {
                        console.log(gift);
                    } }),
                react_1.default.createElement(GiftDialog_1.default, { className: "gift-absolute", value: giftData.value, loading: giftData.loading, socketURL: socketURL }),
                react_1.default.createElement(LiveAgoraTVN_1.default, { appid: appId, channel: channelLive, autoJoin: autoJoin, showSetting: showSetting, token: token, uid: uid })));
        }
        else {
            return (react_1.default.createElement("div", { className: "loading-wrap" },
                react_1.default.createElement("div", { className: "content" }, statusAppId === null || statusAppId === void 0 ? void 0 : statusAppId.message)));
        }
    };
    return (react_1.default.createElement(react_redux_1.Provider, { store: stores_1.store },
        react_1.default.createElement(react_2.PersistGate, { loading: null, persistor: stores_1.persistor },
            react_1.default.createElement(react_helmet_async_1.HelmetProvider, null,
                react_1.default.createElement("div", { className: "live-streaming-screen container d-flex flex-column flex-fill" },
                    react_1.default.createElement(ScreenLayout_1.default, { className: "screen " }, rederResult()))))));
});
