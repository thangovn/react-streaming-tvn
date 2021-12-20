import liveStreamingActions from "../actions/liveStreamingActions"
import classNames from "classnames"
import { delay, put, select, throttle } from "redux-saga/effects"

function* handleGiftReceive(data) {
  const { giftNotifyBaseClass, giftContainerId } = yield select(
    state => state.liveStreamingState
  )

  yield put(liveStreamingActions.appendGiftHistories(data.payload))
  yield put(liveStreamingActions.showGift(data.payload))
  document
    .getElementById(giftContainerId)
    ?.setAttribute(
      "class",
      classNames(giftNotifyBaseClass, "animate__fadeInRight")
    )

  yield delay(2000, true)
  document
    .getElementById(data.payload.queue_id)
    ?.setAttribute(
      "class",
      classNames(giftNotifyBaseClass, "animate__fadeOutLeft")
    )
  document
    .getElementById(giftContainerId)
    ?.setAttribute(
      "class",
      classNames(giftNotifyBaseClass, "animate__animated animate__fadeOutLeft")
    )

  yield delay(2000, true)
  document.getElementById(data.payload.queue_id)?.remove()
}

export default function* liveStreamingSaga() {
  yield throttle(
    3000,
    liveStreamingActions.actionTypes.HANDLE_RAPID_PUSH_GIFT,
    handleGiftReceive
  )
}
