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
import liveStreamingActions from "../../stores/actions/liveStreamingActions";
import { get, set } from "lodash";
var initialState = {
    giftNotifyBaseClass: "d-flex align-items-center box-gift-item rounded-pill p-1 my-3 animate__animated",
    giftContainerBaseClass: "gift-animate-container animate__animated",
    giftContainerId: "gift-container",
    showGift: false,
    tryReconnect: false,
    gift: null,
    chanelMessages: null,
};
export default (function (state, action) {
    var _a, _b, _c;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case liveStreamingActions.actionTypes.SHOW_GIFT:
            return __assign(__assign({}, state), { showGift: true, gift: action.gift });
        case liveStreamingActions.actionTypes.SHOW_GIFT:
            return __assign(__assign({}, state), { showGift: true, gift: action.gift });
        case liveStreamingActions.actionTypes.CLOSE_GIFT:
            return __assign(__assign({}, state), { showGift: false, gift: null });
        case liveStreamingActions.actionTypes.SET_LIVE_CHAT_MESSAGES:
            return __assign(__assign({}, state), { chanelMessages: (_a = {},
                    _a[action.payload.chanel_id] = action.payload.messages,
                    _a) });
        case liveStreamingActions.actionTypes.APPEND_LIVE_CHAT_MESSAGE:
            if (!get(state, ["chanelMessages", action.payload.chanel_id]))
                set(state, ["chanelMessages", action.payload.chanel_id], []);
            state.chanelMessages[action.payload.chanel_id].push(action.payload);
            return __assign(__assign({}, state), { chanelMessages: state.chanelMessages });
        case liveStreamingActions.actionTypes.CLEAR_LIVE_CHAT_MESSAGE:
            set(state, ["chanelMessages", action.chanel_id], []);
            return __assign({}, state);
        case liveStreamingActions.actionTypes.PUT_RECONNECT_FLAG:
            return __assign(__assign({}, state), { tryReconnect: true });
        case liveStreamingActions.actionTypes.DESTROY_RECONNECT_FLAG:
            return __assign(__assign({}, state), { tryReconnect: false });
        case liveStreamingActions.actionTypes.APPEND_GIFT_HISTORY:
            set(state, ["chanelGifts", action.payload.chanel_id, action.payload.queue_id], action.payload);
            return __assign(__assign({}, state), { chanelGifts: __assign({}, state.chanelGifts) });
        case liveStreamingActions.actionTypes.DESTROY_GIFT_HISTORY: {
            return __assign(__assign({}, state), { chanelGifts: __assign(__assign({}, state.chanelGifts), (_b = {}, _b[action.payload.chanel_id] = (_c = {},
                    _c[action.payload.queue_id] = undefined,
                    _c), _b)) });
        }
        case liveStreamingActions.actionTypes.CLEAR_GIFT_HISTORIES:
            set(state, ["chanelGifts", action.chanel_id], null);
            return __assign({}, state);
        default:
            return state;
    }
});
