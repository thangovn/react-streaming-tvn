import AgoraRTC from "agora-rtc-sdk-ng"
import React, { useEffect } from "react"
import useAgora from "../hooks/useAgora"
import MediaPlayer from "./MediaPlayer"
const client = AgoraRTC.createClient({ codec: "h264", mode: "live" })
const LiveAgoraTVN = ({
  appid = "3098260ca7614087844230aec70a64eb",
  channel = "demo",
  token,
  uid,
  showSetting = false,
  autoJoin = true
}) => {
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    errors,
    joinAu
  } = useAgora(client ?? null)

  useEffect(() => {
    if (autoJoin) joinAu(appid, channel, token)
  }, [])
  return (
    <div className="call h-100">
      {Boolean(showSetting) && (
        <div className="button-group">
          <button
            id="join"
            type="button"
            className="btn-primary mr-2"
            disabled={joinState}
            onClick={() => {
              join(appid, channel, token)
            }}
          >
            Create Chanel
          </button>
          <button
            id="join"
            type="button"
            className="btn-primary mr-2"
            disabled={joinState}
            onClick={() => {
              joinAu(appid, channel, token)
            }}
          >
            Join
          </button>
          <button
            id="leave"
            type="button"
            color="error"
            disabled={!joinState}
            onClick={() => {
              leave()
            }}
          >
            Leave
          </button>
        </div>
      )}
      <div className="player-container h-100 position-relative">
        {Boolean(joinState) && (
          <div className="loading-wrap">
            <div className="loader m-auto"></div>
            <div className="content">Waiting for connection</div>
          </div>
        )}
        {remoteUsers.map(user => (
          <div className="remote-player-wrapper" key={user.uid}>
            {/* <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p> */}
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveAgoraTVN
