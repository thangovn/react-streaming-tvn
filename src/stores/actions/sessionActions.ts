const setCurrentChanel = (currentChanel: string | null) => ({
  type: "SET_CURRENT_CHANEL",
  currentChanel
})

const setCurrentLoginInformations = (currentLoginInformation: any) => ({
  type: "SET_CURRENT_LOGIN_INFORMATION",
  currentLoginInformation
})

export default {
  setCurrentChanel,
  setCurrentLoginInformations
}