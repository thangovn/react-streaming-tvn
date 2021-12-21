"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var liveStreamingActions_1 = __importDefault(require("../stores/actions/liveStreamingActions"));
function useSocketIO(url) {
    var _this = this;
    var socket = (0, react_1.useMemo)(function () {
        return (0, socket_io_client_1.default)(url, {
            transports: ["websocket"],
            withCredentials: true,
        });
    }, [url]);
    var scrollDown = function () {
        var _a;
        (_a = document.getElementById("end")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    var _a = (0, react_1.useState)([]), errors = _a[0], setErrors = _a[1];
    var _b = (0, react_1.useState)(false), joinState = _b[0], setJoinState = _b[1];
    var _c = (0, react_1.useState)([]), messages = _c[0], setMessages = _c[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    function sendMessage(data) {
        if (!socket)
            return;
        try {
            socket.emit("send_message", data);
        }
        catch (error) {
            setErrors(__spreadArray(__spreadArray([], errors, true), [error], false));
        }
    }
    function sendGift(data) {
        if (!socket)
            return;
        try {
            socket.emit("send_gift", data);
        }
        catch (error) {
            setErrors(__spreadArray(__spreadArray([], errors, true), [error], false));
        }
    }
    function joinChat(data) {
        socket.emit("join_room", data);
        setJoinState(true);
    }
    function leaveChat(data) {
        socket.emit("leave_room", data);
        setJoinState(true);
    }
    (0, react_1.useEffect)(function () {
        if (joinState)
            return;
        var handleConnect = function () {
            console.log("connected");
        };
        var handleDisconnect = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("dis chat");
                setJoinState(false);
                return [2 /*return*/];
            });
        }); };
        var handleReceiveGift = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("subscribe.receive_gift", { data: data });
                dispatch(liveStreamingActions_1.default.closeGift());
                dispatch(liveStreamingActions_1.default.handleRapidPushGift(data));
                return [2 /*return*/];
            });
        }); };
        var handleSubChanelMessage = function (payload) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dispatch(liveStreamingActions_1.default.setLiveChatMessages(payload));
                //   setMessages(payload.messages);
                scrollDown();
                return [2 /*return*/];
            });
        }); };
        var handleChanelConcurrent = function (_a) {
            var concurrent = _a.concurrent, chanel_id = _a.chanel_id;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    console.log({ concurrent: concurrent, chanel_id: chanel_id });
                    return [2 /*return*/];
                });
            });
        };
        var handleNewMessage = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dispatch(liveStreamingActions_1.default.appendLiveChatMessage(data));
                scrollDown();
                return [2 /*return*/];
            });
        }); };
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("subscribe.receive_gift", handleReceiveGift);
        socket.on("subscribe.chanel_messages", handleSubChanelMessage);
        socket.on("subscribe.chanel_concurrent", handleChanelConcurrent);
        socket.on("subscribe.new_message", handleNewMessage);
        return function () {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("subscribe.receive_gift", handleReceiveGift);
            socket.off("subscribe.chanel_messages", handleSubChanelMessage);
            socket.off("subscribe.chanel_concurrent", handleChanelConcurrent);
            socket.off("subscribe.new_message", handleNewMessage);
        };
    }, [url]);
    return {
        joinState: joinState,
        sendMessage: sendMessage,
        joinChat: joinChat,
        leaveChat: leaveChat,
        errors: errors,
        messages: messages,
        sendGift: sendGift,
    };
}
exports.default = useSocketIO;
