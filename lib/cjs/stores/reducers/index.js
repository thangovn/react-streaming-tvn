"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var liveStreamingState_1 = __importDefault(require("./liveStreamingState"));
var sessionState_1 = __importDefault(require("./sessionState"));
var rootReducer = (0, redux_1.combineReducers)({
    liveStreamingState: liveStreamingState_1.default,
    sessionState: sessionState_1.default
});
exports.default = rootReducer;
