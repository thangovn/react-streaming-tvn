"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setCurrentChanel = function (currentChanel) { return ({
    type: "SET_CURRENT_CHANEL",
    currentChanel: currentChanel
}); };
var setCurrentLoginInformations = function (currentLoginInformation) { return ({
    type: "SET_CURRENT_LOGIN_INFORMATION",
    currentLoginInformation: currentLoginInformation
}); };
exports.default = {
    setCurrentChanel: setCurrentChanel,
    setCurrentLoginInformations: setCurrentLoginInformations
};
