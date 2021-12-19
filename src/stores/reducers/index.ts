import { combineReducers } from 'redux';
import liveStreamingState, { LiveStreamingState } from './liveStreamingState';
import sessionState, { SessionState } from './sessionState';

const rootReducer = combineReducers({
  liveStreamingState,
  sessionState
})

export interface AppState {
  liveStreamingState: LiveStreamingState
  sessionState: SessionState
}

export default rootReducer