import { store } from "../stores";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import liveStreamingActions from "../stores/actions/liveStreamingActions";
import { GifiDto } from "../dtos";

export default function useSocketIO(url: string): {
  joinState: boolean;
  sendMessage: Function;
  joinChat: Function;
  leaveChat: Function;
  sendGift: Function;
  errors: any[];
  messages: any[];
} {
  const socket = io(url, {
    transports: ["websocket"],
    withCredentials: true,
  });
  const scrollDown = () => {
    document.getElementById("end")?.scrollIntoView({ behavior: "smooth" });
  };
  const [currentChanel, setChanel] = useState([]);
  const [errors, setErrors] = useState([]);
  const [joinState, setJoinState] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const dispatch = useDispatch();

  function sendMessage(data: {
    message: string;
    chanel_id: string;
    user_name: string;
    user_id: string;
  }) {
    if (!socket) return;
    try {
      socket.emit("send_message", data);
    } catch (error) {
      setErrors([...errors, error] as any);
    }
  }

  function sendGift(data: {
    chanel_id: string;
    quantity: number;
    gift_data: GifiDto;
    time: string;
    user_name: string;
    user_id: string;
  }) {
    if (!socket) return;
    try {
      socket.emit("send_gift", data);
    } catch (error) {
      setErrors([...errors, error] as any);
    }
  }

  function joinChat(data: {
    user_name: string;
    user_id: string;
    chanel_id: string;
  }) {
    socket.emit("join_room", data);
    setJoinState(true);
  }
  function leaveChat(data: {
    user_name: string;
    user_id: string;
    chanel_id: string;
  }) {
    socket.emit("leave_room", data);
    setJoinState(true);
  }

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      const {
        liveStreamingState: { tryReconnect },
        sessionState: { currentLoginInformation, currentChanel },
      } = store.getState();
      if (tryReconnect && currentChanel && currentLoginInformation) {
        joinChat({
          ...currentLoginInformation,
          chanel_id: currentChanel,
        });
        store.dispatch(liveStreamingActions.destroyReconnectFlag());
      }
    };
    const handleDisconnect = async () => {
      console.log("dis chat");
      setJoinState(false);
    };
    const handleReceiveGift = async (data) => {
      console.log("subscribe.receive_gift", { data });
      dispatch(liveStreamingActions.closeGift());
      dispatch(liveStreamingActions.handleRapidPushGift(data));
    };
    const handleSubChanelMessage = async (payload) => {
      dispatch(liveStreamingActions.setLiveChatMessages(payload));
      //   setMessages(payload.messages);
      scrollDown();
    };
    const handleChanelConcurrent = async ({ concurrent, chanel_id }) => {
      console.log({ concurrent, chanel_id });
    };
    const handleNewMessage = (data: any) => {
      dispatch(liveStreamingActions.appendLiveChatMessage(data));
      scrollDown();
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("subscribe.receive_gift", handleReceiveGift);
    socket.on("subscribe.chanel_messages", handleSubChanelMessage);
    socket.on("subscribe.chanel_concurrent", handleChanelConcurrent);
    socket.on("subscribe.new_message", handleNewMessage);

    // return () => {
    //   socket.off("connect", handleConnect);
    //   socket.off("disconnect", handleDisconnect);
    //   socket.off("subscribe.receive_gift", handleReceiveGift);
    //   socket.off("subscribe.chanel_messages", handleSubChanelMessage);
    //   socket.off("subscribe.chanel_concurrent", handleChanelConcurrent);
    //   socket.off("subscribe.new_message", handleNewMessage);
    // };
  }, [socket]);

  return {
    joinState,
    sendMessage,
    joinChat,
    leaveChat,
    errors,
    messages,
    sendGift,
  };
}
