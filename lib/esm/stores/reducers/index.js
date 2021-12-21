import { combineReducers } from 'redux';
import liveStreamingState from './liveStreamingState';
import sessionState from './sessionState';
var rootReducer = combineReducers({
    liveStreamingState: liveStreamingState,
    sessionState: sessionState
});
export default rootReducer;
