import { useState, useEffect } from "react"
import AgoraRTC from "agora-rtc-sdk-ng"

export default function useAgora(client) {
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined)
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined)

  const [errors, setErrors] = useState([])

  const [joinState, setJoinState] = useState(false)
  // console.log(client?.connectionState);

  const [remoteUsers, setRemoteUsers] = useState([])

  async function createLocalTracks(audioConfig, videoConfig) {
    const [
      microphoneTrack,
      cameraTrack
    ] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig)
    setLocalAudioTrack(microphoneTrack)
    setLocalVideoTrack(cameraTrack)
    return [microphoneTrack, cameraTrack]
  }

  async function join(appid, channel, token, uid) {
    if (!client) return
    try {
      const [microphoneTrack, cameraTrack] = await createLocalTracks(
        undefined,
        {
          optimizationMode: "motion",
          encoderConfig: "720p_2"
        }
      )

      await client.setClientRole("host")
      await client.join(appid, channel, token || null, uid)
      await client.publish([microphoneTrack, cameraTrack])
      window.client = client
      window.videoTrack = cameraTrack

      setJoinState(true)
    } catch (error) {
      setErrors([...errors, error])
    }
  }

  async function joinAu(appid, channel, token, uid) {
    if (!client) return
    try {
      // const [microphoneTrack, cameraTrack] = await createLocalTracks()

      await client.setClientRole("audience")
      await client.join(appid, channel, token || null)
      // await client.publish([microphoneTrack, cameraTrack])
      window.client = client
      // ;(window as any).videoTrack = cameraTrack

      setJoinState(true)
    } catch (error) {
      setErrors([...errors, error])
    }
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop()
      localAudioTrack.close()
    }
    if (localVideoTrack) {
      localVideoTrack.stop()
      localVideoTrack.close()
    }
    setRemoteUsers([])
    setJoinState(false)
    await client?.leave()
  }

  useEffect(() => {
    if (!client) return
    setRemoteUsers(client.remoteUsers)

    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType)
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }
    const handleUserUnpublished = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }
    const handleUserJoined = user => {
      console.log(user)

      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }
    const handleUserLeft = user => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers))
    }
    client.on("user-published", handleUserPublished)
    client.on("user-unpublished", handleUserUnpublished)
    client.on("user-joined", handleUserJoined)
    client.on("user-left", handleUserLeft)

    return () => {
      client.off("user-published", handleUserPublished)
      client.off("user-unpublished", handleUserUnpublished)
      client.off("user-joined", handleUserJoined)
      client.off("user-left", handleUserLeft)
    }
  }, [client])

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    errors,
    joinAu
  }
}
