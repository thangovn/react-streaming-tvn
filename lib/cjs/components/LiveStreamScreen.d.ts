import React from "react";
import { GifiDto } from "../dtos";
import "../styles/app.scss";
interface Props {
    configChat: {
        socketURL?: string;
        channelChat: string;
    };
    configLive: {
        channelLive: string;
        appid: string;
        token?: string;
        uid?: string | number;
        showSetting?: boolean;
        autoJoin?: boolean;
    };
    giftData: {
        value: GifiDto[] | any;
        loading: boolean;
    };
    userInfo: {
        user_id: string | number | any;
        user_name: string;
    };
}
declare const _default: React.MemoExoticComponent<({ userInfo: { user_id, user_name }, configChat: { socketURL, channelChat }, configLive: { autoJoin, showSetting, uid, appid, token, channelLive, }, giftData, }: Props) => JSX.Element>;
export default _default;
