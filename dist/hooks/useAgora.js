"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAgora;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _agoraRtcSdkNg = _interopRequireDefault(require("agora-rtc-sdk-ng"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useAgora(client) {
  const [localVideoTrack, setLocalVideoTrack] = (0, _react.useState)(undefined);
  const [localAudioTrack, setLocalAudioTrack] = (0, _react.useState)(undefined);
  const [errors, setErrors] = (0, _react.useState)([]);
  const [joinState, setJoinState] = (0, _react.useState)(false); // console.log(client?.connectionState);

  const [remoteUsers, setRemoteUsers] = (0, _react.useState)([]);

  async function createLocalTracks(audioConfig, videoConfig) {
    const [microphoneTrack, cameraTrack] = await _agoraRtcSdkNg.default.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  async function join(appid, channel, token, uid) {
    if (!client) return;

    try {
      const [microphoneTrack, cameraTrack] = await createLocalTracks(undefined, {
        optimizationMode: "motion",
        encoderConfig: "720p_2"
      });
      await client.setClientRole("host");
      await client.join(appid, channel, token || null, uid);
      await client.publish([microphoneTrack, cameraTrack]);
      window.client = client;
      window.videoTrack = cameraTrack;
      setJoinState(true);
    } catch (error) {
      setErrors([...errors, error]);
    }
  }

  async function joinAu(appid, channel, token, uid) {
    if (!client) return;

    try {
      // const [microphoneTrack, cameraTrack] = await createLocalTracks()
      await client.setClientRole("audience");
      await client.join(appid, channel, token || null); // await client.publish([microphoneTrack, cameraTrack])

      window.client = client; // ;(window as any).videoTrack = cameraTrack

      setJoinState(true);
    } catch (error) {
      setErrors([...errors, error]);
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
    await (client === null || client === void 0 ? void 0 : client.leave());
  }

  (0, _react.useEffect)(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType); // toggle rerender while state of remoteUsers changed.

      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const handleUserUnpublished = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const handleUserJoined = user => {
      console.log(user);
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const handleUserLeft = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
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
    joinAu
  };
}