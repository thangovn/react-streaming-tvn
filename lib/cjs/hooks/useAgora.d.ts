import { IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalVideoTrack, ILocalAudioTrack } from "agora-rtc-sdk-ng";
export default function useAgora(client: IAgoraRTCClient | undefined): {
    localAudioTrack: ILocalAudioTrack | undefined;
    localVideoTrack: ILocalVideoTrack | undefined;
    joinState: boolean;
    leave: Function;
    join: Function;
    joinAu: Function;
    remoteUsers: IAgoraRTCRemoteUser[];
    errors: any[];
};
