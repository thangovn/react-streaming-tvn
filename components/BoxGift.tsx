import { Avatar } from "@mui/material";
import { LiveGiftMessagePayload } from "../stores/actions/liveStreamingActions";
import { AppState } from "../stores/reducers";
import classNames from "classnames";
import { cloneDeep, filter, get, map } from "lodash";
import { useSelector } from "react-redux";

const BoxGridLiveItem = ({ gift }: { gift: LiveGiftMessagePayload }) => {
  const { giftNotifyBaseClass } = useSelector(
    (state: AppState) => state.liveStreamingState
  );

  return (
    <div
      id={gift.queue_id}
      className={classNames(giftNotifyBaseClass, "animate__fadeInRight")}
    >
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkwYQuTYcqB7wnAvzApNYO2MLl_Llz4RyyA&usqp=CAU" />
      <div className="d-flex flex-column ms-2">
        <div className="fw-bolder">{gift.user_name}</div>
        <div>Send {gift.gift_data.name}</div>
      </div>
    </div>
  );
};

export default () => {
  const {
    liveStreamingState: { chanelGifts },
    sessionState: { currentChanel, currentLoginInformation },
  } = useSelector((state: AppState) => state);

  const gifts = cloneDeep(filter(get(chanelGifts, currentChanel!)));
  return (
    <div className="box-gift d-flex flex-column justify-content-end">
      {map(gifts, (item, idx) => (
        <BoxGridLiveItem key={idx} gift={item} />
      ))}
    </div>
  );
};
