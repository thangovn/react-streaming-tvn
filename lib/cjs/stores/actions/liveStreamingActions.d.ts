import { IGiftItem } from "../../dtos";
declare const _default: {
    actionTypes: {
        SHOW_GIFT: string;
        CLOSE_GIFT: string;
        APPEND_LIVE_CHAT_MESSAGE: string;
        CLEAR_LIVE_CHAT_MESSAGE: string;
        SET_LIVE_CHAT_MESSAGES: string;
        PUT_RECONNECT_FLAG: string;
        DESTROY_RECONNECT_FLAG: string;
        APPEND_GIFT_HISTORY: string;
        DESTROY_GIFT_HISTORY: string;
        CLEAR_GIFT_HISTORIES: string;
        HANDLE_RAPID_PUSH_GIFT: string;
    };
    showGift: (gift: any) => {
        type: string;
        gift: any;
    };
    closeGift: () => {
        type: string;
    };
    appendLiveChatMessage: (payload: LiveChatMessagePayload) => {
        type: string;
        payload: LiveChatMessagePayload;
    };
    clearLiveChatMessage: (chane_id: string) => {
        type: string;
        chane_id: string;
    };
    setLiveChatMessages: (payload: any) => {
        type: string;
        payload: any;
    };
    putReconnectFlag: () => {
        type: string;
    };
    destroyReconnectFlag: () => {
        type: string;
    };
    appendGiftHistories: (payload: LiveGiftMessagePayload) => {
        type: string;
        payload: LiveGiftMessagePayload;
    };
    destroyGiftHistory: (payload: LiveGiftMessagePayload) => {
        type: string;
        payload: LiveGiftMessagePayload;
    };
    clearGiftHistories: (chanel_id: string) => {
        type: string;
        chanel_id: string;
    };
    handleRapidPushGift: (payload: LiveGiftMessagePayload) => {
        type: string;
        payload: LiveGiftMessagePayload;
    };
};
export default _default;
export interface LiveChatMessagePayload {
    user_name: string;
    user_id: string;
    message: string;
    chanel_id: string;
    is_syste: boolean;
}
export interface LiveGiftMessagePayload {
    queue_id: string;
    chanel_id: string;
    gift_data: IGiftItem;
    user_name: string;
    user_id: string;
    quantity: number;
}
