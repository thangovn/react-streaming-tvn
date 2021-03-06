import { useState, useEffect } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from "agora-rtc-sdk-ng";

export default function useAgora(client: IAgoraRTCClient | undefined): {
  localAudioTrack: ILocalAudioTrack | undefined;
  localVideoTrack: ILocalVideoTrack | undefined;
  joinState: boolean;
  leave: Function;
  join: Function;
  joinAu: Function;
  remoteUsers: IAgoraRTCRemoteUser[];
  errors: any[];
} {
  const [localVideoTrack, setLocalVideoTrack] = useState<
    ILocalVideoTrack | undefined
  >(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined);

  const [errors, setErrors] = useState([]);

  const [joinState, setJoinState] = useState(false);
  // console.log(client?.connectionState);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CameraVideoTrackInitConfig
  ): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
    const [microphoneTrack, cameraTrack] =
      await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  async function join(
    appid: string,
    channel: string,
    token?: string,
    uid?: string | number | null
  ) {
    if (!client) return;
    try {
      const [microphoneTrack, cameraTrack] = await createLocalTracks(
        undefined,
        {
          optimizationMode: "motion",
          encoderConfig: "720p_2",
        }
      );

      await client.setClientRole("host");
      await client.join(appid, channel, token || null, uid);
      await client.publish([microphoneTrack, cameraTrack]);
      (window as any).client = client;
      (window as any).videoTrack = cameraTrack;

      setJoinState(true);
    } catch (error) {
      setErrors([...errors, error] as any);
    }
  }

  async function joinAu(
    appid: string,
    channel: string,
    token?: string,
    uid?: string | number | null
  ) {
    if (!client) return;
    try {
      // const [microphoneTrack, cameraTrack] = await createLocalTracks()

      await client.setClientRole("audience");
      await client.join(appid, channel, token || null);
      // await client.publish([microphoneTrack, cameraTrack])
      (window as any).client = client;
      // ;(window as any).videoTrack = cameraTrack

      setJoinState(true);
    } catch (error) {
      setErrors([...errors, error] as any);
    }
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      console.log(user);

      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    errors,
    joinAu,
  };
}
