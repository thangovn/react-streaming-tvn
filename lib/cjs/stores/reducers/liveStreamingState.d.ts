import { LiveChatMessagePayload, LiveGiftMessagePayload } from "../../stores/actions/liveStreamingActions";
export interface LiveStreamingState {
    showGift: boolean;
    tryReconnect: boolean;
    gift: LiveGiftMessagePayload | null;
    giftNotifyBaseClass: string;
    giftContainerId: string;
    giftContainerBaseClass: string;
    chanelMessages?: {
        [key: string]: LiveChatMessagePayload[];
    } | null;
    chanelGifts?: {
        [key: string]: LiveGiftMessagePayload[];
    } | null;
}
declare const _default: (state: LiveStreamingState | undefined, action: any) => {
    showGift: boolean;
    gift: any;
    tryReconnect: boolean;
    giftNotifyBaseClass: string;
    giftContainerId: string;
    giftContainerBaseClass: string;
    chanelMessages?: {
        [key: string]: LiveChatMessagePayload[];
    } | null | undefined;
    chanelGifts?: {
        [key: string]: LiveGiftMessagePayload[];
    } | null | undefined;
} | {
    chanelMessages: {
        [x: number]: any;
    };
    showGift: boolean;
    tryReconnect: boolean;
    gift: LiveGiftMessagePayload | null;
    giftNotifyBaseClass: string;
    giftContainerId: string;
    giftContainerBaseClass: string;
    chanelGifts?: {
        [key: string]: LiveGiftMessagePayload[];
    } | null | undefined;
};
export default _default;
