/// <reference types="react" />
interface Props {
    appid: string;
    channel: string | any;
    token?: string;
    uid?: string | number;
    showSetting: boolean;
    autoJoin: boolean;
}
declare const LiveAgoraTVN: ({ appid, channel, token, uid, showSetting, autoJoin, }: Props) => JSX.Element;
export default LiveAgoraTVN;
