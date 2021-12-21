"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var liveStreamingActions_1 = __importDefault(require("../../stores/actions/liveStreamingActions"));
var classnames_1 = __importDefault(require("classnames"));
var effects_1 = require("redux-saga/effects");
function handleGiftReceive(data) {
    var _a, giftNotifyBaseClass, giftContainerId;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, (0, effects_1.select)(function (state) { return state.liveStreamingState; })];
            case 1:
                _a = _f.sent(), giftNotifyBaseClass = _a.giftNotifyBaseClass, giftContainerId = _a.giftContainerId;
                return [4 /*yield*/, (0, effects_1.put)(liveStreamingActions_1.default.appendGiftHistories(data.payload))];
            case 2:
                _f.sent();
                return [4 /*yield*/, (0, effects_1.put)(liveStreamingActions_1.default.showGift(data.payload))];
            case 3:
                _f.sent();
                (_b = document
                    .getElementById(giftContainerId)) === null || _b === void 0 ? void 0 : _b.setAttribute("class", (0, classnames_1.default)(giftNotifyBaseClass, "animate__fadeInRight"));
                return [4 /*yield*/, (0, effects_1.delay)(2000, true)];
            case 4:
                _f.sent();
                (_c = document
                    .getElementById(data.payload.queue_id)) === null || _c === void 0 ? void 0 : _c.setAttribute("class", (0, classnames_1.default)(giftNotifyBaseClass, "animate__fadeOutLeft"));
                (_d = document
                    .getElementById(giftContainerId)) === null || _d === void 0 ? void 0 : _d.setAttribute("class", (0, classnames_1.default)(giftNotifyBaseClass, "animate__animated animate__fadeOutLeft"));
                return [4 /*yield*/, (0, effects_1.delay)(2000, true)];
            case 5:
                _f.sent();
                (_e = document.getElementById(data.payload.queue_id)) === null || _e === void 0 ? void 0 : _e.remove();
                return [2 /*return*/];
        }
    });
}
function liveStreamingSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, effects_1.throttle)(3000, liveStreamingActions_1.default.actionTypes.HANDLE_RAPID_PUSH_GIFT, handleGiftReceive)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.default = liveStreamingSaga;
