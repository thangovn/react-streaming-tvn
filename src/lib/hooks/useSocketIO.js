import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import io from "socket.io-client"
import liveStreamingActions from "../stores/actions/liveStreamingActions"

export default function useSocketIO(url) {
  const socket = useMemo(() => {
    return io(url, {
      transports: ["websocket"],
      withCredentials: true
    })
  }, [url])
  const scrollDown = () => {
    document.getElementById("end")?.scrollIntoView({ behavior: "smooth" })
  }
  const [errors, setErrors] = useState([])
  const [joinState, setJoinState] = useState(false)
  const [messages, setMessages] = useState([])
  const dispatch = useDispatch()

  function sendMessage(data) {
    if (!socket) return
    try {
      socket.emit("send_message", data)
    } catch (error) {
      setErrors([...errors, error])
    }
  }

  function sendGift(data) {
    if (!socket) return
    try {
      socket.emit("send_gift", data)
    } catch (error) {
      setErrors([...errors, error])
    }
  }

  function joinChat(data) {
    socket.emit("join_room", data)
    setJoinState(true)
  }
  function leaveChat(data) {
    socket.emit("leave_room", data)
    setJoinState(true)
  }

  useEffect(() => {
    if (joinState) return
    const handleConnect = () => {
      console.log("connected")
    }
    const handleDisconnect = async () => {
      console.log("dis chat")
      setJoinState(false)
    }
    const handleReceiveGift = async data => {
      console.log("subscribe.receive_gift", { data })
      dispatch(liveStreamingActions.closeGift())
      dispatch(liveStreamingActions.handleRapidPushGift(data))
    }
    const handleSubChanelMessage = async payload => {
      dispatch(liveStreamingActions.setLiveChatMessages(payload))
      //   setMessages(payload.messages);
      scrollDown()
    }
    const handleChanelConcurrent = async ({ concurrent, chanel_id }) => {
      console.log({ concurrent, chanel_id })
    }
    const handleNewMessage = async data => {
      dispatch(liveStreamingActions.appendLiveChatMessage(data))
      scrollDown()
    }

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)
    socket.on("subscribe.receive_gift", handleReceiveGift)
    socket.on("subscribe.chanel_messages", handleSubChanelMessage)
    socket.on("subscribe.chanel_concurrent", handleChanelConcurrent)
    socket.on("subscribe.new_message", handleNewMessage)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
      socket.off("subscribe.receive_gift", handleReceiveGift)
      socket.off("subscribe.chanel_messages", handleSubChanelMessage)
      socket.off("subscribe.chanel_concurrent", handleChanelConcurrent)
      socket.off("subscribe.new_message", handleNewMessage)
    }
  }, [url])

  return {
    joinState,
    sendMessage,
    joinChat,
    leaveChat,
    errors,
    messages,
    sendGift
  }
}
