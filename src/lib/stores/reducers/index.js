import { combineReducers } from "redux"
import liveStreamingState from "./liveStreamingState"
import sessionState from "./sessionState"

const rootReducer = combineReducers({
  liveStreamingState,
  sessionState
})

export default rootReducer
