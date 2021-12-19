import liveStreamingActions, {
  LiveChatMessagePayload,
  LiveGiftMessagePayload,
} from "../../stores/actions/liveStreamingActions";
import { get, set } from "lodash";

export interface LiveStreamingState {
  showGift: boolean;
  tryReconnect: boolean;
  gift: LiveGiftMessagePayload | null;
  giftNotifyBaseClass: string;
  giftContainerId: string;
  giftContainerBaseClass: string;
  chanelMessages?: { [key: string]: LiveChatMessagePayload[] } | null;
  chanelGifts?: { [key: string]: LiveGiftMessagePayload[] } | null;
}

const initialState: LiveStreamingState = {
  giftNotifyBaseClass:
    "d-flex align-items-center box-gift-item rounded-pill p-1 my-3 animate__animated",
  giftContainerBaseClass: "gift-animate-container animate__animated",
  giftContainerId: "gift-container",
  showGift: false,
  tryReconnect: false,
  gift: null,
  chanelMessages: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case liveStreamingActions.actionTypes.SHOW_GIFT:
      return {
        ...state,
        showGift: true,
        gift: action.gift,
      };

    case liveStreamingActions.actionTypes.SHOW_GIFT:
      return {
        ...state,
        showGift: true,
        gift: action.gift,
      };
    case liveStreamingActions.actionTypes.CLOSE_GIFT:
      return {
        ...state,
        showGift: false,
        gift: null,
      };
    case liveStreamingActions.actionTypes.SET_LIVE_CHAT_MESSAGES:
      return {
        ...state,
        chanelMessages: {
          [action.payload.chanel_id]: action.payload.messages,
        },
      };
    case liveStreamingActions.actionTypes.APPEND_LIVE_CHAT_MESSAGE:
      if (!get(state, ["chanelMessages", action.payload.chanel_id]))
        set(state, ["chanelMessages", action.payload.chanel_id], []);

      state.chanelMessages![action.payload.chanel_id].push(action.payload);

      return {
        ...state,
        chanelMessages: state.chanelMessages,
      };
    case liveStreamingActions.actionTypes.CLEAR_LIVE_CHAT_MESSAGE:
      set(state, ["chanelMessages", action.chanel_id], []);
      return {
        ...state,
      };
    case liveStreamingActions.actionTypes.PUT_RECONNECT_FLAG:
      return {
        ...state,
        tryReconnect: true,
      };
    case liveStreamingActions.actionTypes.DESTROY_RECONNECT_FLAG:
      return {
        ...state,
        tryReconnect: false,
      };
    case liveStreamingActions.actionTypes.APPEND_GIFT_HISTORY:
      set(
        state,
        ["chanelGifts", action.payload.chanel_id, action.payload.queue_id],
        action.payload
      );
      return {
        ...state,
        chanelGifts: {
          ...state.chanelGifts,
        },
      };
    case liveStreamingActions.actionTypes.DESTROY_GIFT_HISTORY: {
      return {
        ...state,
        chanelGifts: {
          ...state.chanelGifts,
          [action.payload.chanel_id]: {
            [action.payload.queue_id]: undefined,
          },
        },
      };
    }

    case liveStreamingActions.actionTypes.CLEAR_GIFT_HISTORIES:
      set(state, ["chanelGifts", action.chanel_id], null);
      return { ...state };
    default:
      return state;
  }
};
