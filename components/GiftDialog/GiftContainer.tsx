import { AppState } from "../../stores/reducers";
import React from "react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { prepareAinimation } from "./GiftLottie";

export default React.memo(() => {
  const { gift } = useSelector((state: AppState) => state.liveStreamingState);

  return (
    <div id="gift-container" className="animate__animated">
      {gift && <Lottie options={prepareAinimation(gift)} />}
    </div>
  );
});
