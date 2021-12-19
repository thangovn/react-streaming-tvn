import { all } from 'redux-saga/effects'
import liveStreamingSaga from './liveStreamingSaga'

export default function* rootSaga() {
  yield all([
    liveStreamingSaga()
  ])
}