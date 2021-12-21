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
var agora_rtc_sdk_ng_1 = __importDefault(require("agora-rtc-sdk-ng"));
function useAgora(client) {
    var _this = this;
    var _a = (0, react_1.useState)(undefined), localVideoTrack = _a[0], setLocalVideoTrack = _a[1];
    var _b = (0, react_1.useState)(undefined), localAudioTrack = _b[0], setLocalAudioTrack = _b[1];
    var _c = (0, react_1.useState)([]), errors = _c[0], setErrors = _c[1];
    var _d = (0, react_1.useState)(false), joinState = _d[0], setJoinState = _d[1];
    // console.log(client?.connectionState);
    var _e = (0, react_1.useState)([]), remoteUsers = _e[0], setRemoteUsers = _e[1];
    function createLocalTracks(audioConfig, videoConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, microphoneTrack, cameraTrack;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, agora_rtc_sdk_ng_1.default.createMicrophoneAndCameraTracks(audioConfig, videoConfig)];
                    case 1:
                        _a = _b.sent(), microphoneTrack = _a[0], cameraTrack = _a[1];
                        setLocalAudioTrack(microphoneTrack);
                        setLocalVideoTrack(cameraTrack);
                        return [2 /*return*/, [microphoneTrack, cameraTrack]];
                }
            });
        });
    }
    function join(appid, channel, token, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, microphoneTrack, cameraTrack, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!client)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, createLocalTracks(undefined, {
                                optimizationMode: "motion",
                                encoderConfig: "720p_2",
                            })];
                    case 2:
                        _a = _b.sent(), microphoneTrack = _a[0], cameraTrack = _a[1];
                        return [4 /*yield*/, client.setClientRole("host")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client.join(appid, channel, token || null, uid)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, client.publish([microphoneTrack, cameraTrack])];
                    case 5:
                        _b.sent();
                        window.client = client;
                        window.videoTrack = cameraTrack;
                        setJoinState(true);
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        setErrors(__spreadArray(__spreadArray([], errors, true), [error_1], false));
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function joinAu(appid, channel, token, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!client)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // const [microphoneTrack, cameraTrack] = await createLocalTracks()
                        return [4 /*yield*/, client.setClientRole("audience")];
                    case 2:
                        // const [microphoneTrack, cameraTrack] = await createLocalTracks()
                        _a.sent();
                        return [4 /*yield*/, client.join(appid, channel, token || null)];
                    case 3:
                        _a.sent();
                        // await client.publish([microphoneTrack, cameraTrack])
                        window.client = client;
                        // ;(window as any).videoTrack = cameraTrack
                        setJoinState(true);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        setErrors(__spreadArray(__spreadArray([], errors, true), [error_2], false));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function leave() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (localAudioTrack) {
                            localAudioTrack.stop();
                            localAudioTrack.close();
                        }
                        if (localVideoTrack) {
                            localVideoTrack.stop();
                            localVideoTrack.close();
                        }
                        setRemoteUsers([]);
                        setJoinState(false);
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.leave())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    (0, react_1.useEffect)(function () {
        if (!client)
            return;
        setRemoteUsers(client.remoteUsers);
        var handleUserPublished = function (user, mediaType) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.subscribe(user, mediaType)];
                    case 1:
                        _a.sent();
                        // toggle rerender while state of remoteUsers changed.
                        setRemoteUsers(function (remoteUsers) { return Array.from(client.remoteUsers); });
                        return [2 /*return*/];
                }
            });
        }); };
        var handleUserUnpublished = function (user) {
            setRemoteUsers(function (remoteUsers) { return Array.from(client.remoteUsers); });
        };
        var handleUserJoined = function (user) {
            console.log(user);
            setRemoteUsers(function (remoteUsers) { return Array.from(client.remoteUsers); });
        };
        var handleUserLeft = function (user) {
            setRemoteUsers(function (remoteUsers) { return Array.from(client.remoteUsers); });
        };
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        client.on("user-joined", handleUserJoined);
        client.on("user-left", handleUserLeft);
        return function () {
            client.off("user-published", handleUserPublished);
            client.off("user-unpublished", handleUserUnpublished);
            client.off("user-joined", handleUserJoined);
            client.off("user-left", handleUserLeft);
        };
    }, [client]);
    return {
        localAudioTrack: localAudioTrack,
        localVideoTrack: localVideoTrack,
        joinState: joinState,
        leave: leave,
        join: join,
        remoteUsers: remoteUsers,
        errors: errors,
        joinAu: joinAu,
    };
}
exports.default = useAgora;
