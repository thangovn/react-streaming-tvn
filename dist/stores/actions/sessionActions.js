"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const setCurrentChanel = currentChanel => ({
  type: "SET_CURRENT_CHANEL",
  currentChanel
});

const setCurrentLoginInformations = currentLoginInformation => ({
  type: "SET_CURRENT_LOGIN_INFORMATION",
  currentLoginInformation
});

var _default = {
  setCurrentChanel,
  setCurrentLoginInformations
};
exports.default = _default;