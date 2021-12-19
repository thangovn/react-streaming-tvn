
export interface SessionState {
  currentChanel?: string | null
  currentLoginInformation: {
    user_name: string
    user_id: string
  }
}

const initialState: SessionState = {
  currentChanel: null,
  currentLoginInformation: {
    user_name: "",
    user_id: ''
  }
}


export default (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_CURRENT_CHANEL":
      return {
        ...state,
        currentChanel: action.currentChanel
      }
    case "SET_CURRENT_LOGIN_INFORMATION":
      return {
        ...state,
        currentLoginInformation: action.currentLoginInformation
      }
    default:
      return state
  }

}