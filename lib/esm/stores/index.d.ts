/// <reference types="redux-persist/types/persistreducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
declare let store: import("redux").Store<import("redux").EmptyObject & {
    liveStreamingState: {
        showGift: boolean;
        gift: any;
        tryReconnect: boolean;
        giftNotifyBaseClass: string;
        giftContainerId: string;
        giftContainerBaseClass: string;
        chanelMessages?: {
            [key: string]: import("./actions/liveStreamingActions").LiveChatMessagePayload[];
        } | null | undefined;
        chanelGifts?: {
            [key: string]: import("./actions/liveStreamingActions").LiveGiftMessagePayload[];
        } | null | undefined;
    } | {
        chanelMessages: {
            [x: number]: any;
        };
        showGift: boolean;
        tryReconnect: boolean;
        gift: import("./actions/liveStreamingActions").LiveGiftMessagePayload | null;
        giftNotifyBaseClass: string;
        giftContainerId: string;
        giftContainerBaseClass: string;
        chanelGifts?: {
            [key: string]: import("./actions/liveStreamingActions").LiveGiftMessagePayload[];
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
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction> & {
    dispatch: unknown;
};
declare const persistor: import("redux-persist").Persistor;
export { store, persistor };
