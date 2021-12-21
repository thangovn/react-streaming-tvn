var setCurrentChanel = function (currentChanel) { return ({
    type: "SET_CURRENT_CHANEL",
    currentChanel: currentChanel
}); };
var setCurrentLoginInformations = function (currentLoginInformation) { return ({
    type: "SET_CURRENT_LOGIN_INFORMATION",
    currentLoginInformation: currentLoginInformation
}); };
export default {
    setCurrentChanel: setCurrentChanel,
    setCurrentLoginInformations: setCurrentLoginInformations
};
