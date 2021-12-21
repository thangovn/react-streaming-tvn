import { LiveStreamingState } from './liveStreamingState';
import { SessionState } from './sessionState';
declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    liveStreamingState: {
        showGift: boolean;
        gift: any;
        tryReconnect: boolean;
        giftNotifyBaseClass: string;
        giftContainerId: string;
        giftContainerBaseClass: string;
        chanelMessages?: {
            [key: string]: import("../actions/liveStreamingActions").LiveChatMessagePayload[];
        } | null | undefined;
        chanelGifts?: {
            [key: string]: import("../actions/liveStreamingActions").LiveGiftMessagePayload[];
        } | null | undefined;
    } | {
        chanelMessages: {
            [x: number]: any;
        };
        showGift: boolean;
        tryReconnect: boolean;
        gift: import("../actions/liveStreamingActions").LiveGiftMessagePayload | null;
        giftNotifyBaseClass: string;
        giftContainerId: string;
        giftContainerBaseClass: string;
        chanelGifts?: {
            [key: string]: import("../actions/liveStreamingActions").LiveGiftMessagePayload[];
        } | null | undefined;
    };
    sessionState: {
        currentChanel: any;
        currentLoginInformation: {
            user_name: string;
            user_id: string;
        };
    } | {
        currentLoginInformation: any;
        currentChanel?: string | null | undefined;
    };
}>, import("redux").AnyAction>;
export interface AppState {
    liveStreamingState: LiveStreamingState;
    sessionState: SessionState;
}
export default rootReducer;
