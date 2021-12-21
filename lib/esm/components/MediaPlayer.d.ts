/// <reference types="react" />
import { ILocalAudioTrack, ILocalVideoTrack, IRemoteAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
export interface VideoPlayerProps {
    videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
    audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}
declare const MediaPlayer: (props: VideoPlayerProps) => JSX.Element;
export default MediaPlayer;
