const setCurrentChanel = currentChanel => ({
  type: "SET_CURRENT_CHANEL",
  currentChanel
})

const setCurrentLoginInformations = currentLoginInformation => ({
  type: "SET_CURRENT_LOGIN_INFORMATION",
  currentLoginInformation
})

export default {
  setCurrentChanel,
  setCurrentLoginInformations
}
