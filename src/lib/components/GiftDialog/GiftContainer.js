import React from "react"
import Lottie from "react-lottie"
import { useSelector } from "react-redux"
import { prepareAinimation } from "./GiftLottie"

export default React.memo(() => {
  const { gift } = useSelector(state => state.liveStreamingState)
  // console.log(gift)

  return (
    <div id="gift-container" className="animate__animated">
      {gift?.gift_data.gift_type == 'Lottie' && (
        <Lottie
          options={prepareAinimation(gift.gift_data.resource)}
          style={{ zIndex: 10000 }}
        />
      )}
      {gift?.gift_data.gift_type == 'Gif' && (
        <img src={gift.gift_data.resource} alt="" style={{ zIndex: 10000 }} />
      )}
    </div>
  )
})
