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
var initialState = {
    currentChanel: null,
    currentLoginInformation: {
        user_name: "",
        user_id: ''
    }
};
export default (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "SET_CURRENT_CHANEL":
            return __assign(__assign({}, state), { currentChanel: action.currentChanel });
        case "SET_CURRENT_LOGIN_INFORMATION":
            return __assign(__assign({}, state), { currentLoginInformation: action.currentLoginInformation });
        default:
            return state;
    }
});
