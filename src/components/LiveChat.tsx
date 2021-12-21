import { Button, Icon, Popover, TextField } from "@mui/material";
import classNames from "classnames";
import { Picker } from "emoji-mart";
// import { socket } from "../index";
import { get, map } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sessionActions from "../stores/actions/sessionActions";
import { AppState } from "../stores/reducers";
import BoxGift from "./BoxGift";
import { ticon_arrow_bottom } from "../images/index";
import useSocketIO from "../hooks/useSocketIO";

const LiveChat = ({
  channelChat,
  onReceiveGift,
  socketURL,
}: {
  channelChat: string;
  onReceiveGift: (gift: any) => void;
  socketURL: string;
}) => {
  const {
    sessionState: { currentLoginInformation, currentChanel },
    liveStreamingState: { chanelMessages },
  } = useSelector((state: AppState) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mess, setMess] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();

  const { sendMessage, joinChat, leaveChat } = useSocketIO(socketURL);
  useEffect(() => {
    if (currentLoginInformation && channelChat) {
      dispatch(sessionActions.setCurrentChanel(channelChat));
      joinChat({
        ...currentLoginInformation,
        chanel_id: channelChat,
      });
    }
    return () => {
      leaveChat({
        ...currentLoginInformation,
        chanel_id: channelChat,
      });
    };
  }, []);

  // useEffect(() => {
  //   joinChat("khoa", "khoa", "bacarat-18");
  //   return () => leaveChat("khoa", "khoa", "bacarat-18");
  // }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHideChat = (event) => {
    document.getElementById("box-chat")?.classList.toggle("show");
    document.getElementById("chatInputWrap")?.classList.toggle("show");
    document.getElementById("hideIcon")?.classList.toggle("back");
  };

  const addEmoji = (emj) => {
    setMess(mess + String.fromCodePoint(parseInt(emj.unified, 16)));
  };

  const onSend = () => {
    if (mess === "") return;

    const data = {
      ...currentLoginInformation,
      chanel_id: currentChanel,
      message: mess,
    };
    // console.log(data);

    sendMessage(data);
    setMess("");
  };

  return (
    <div className="live-chat" style={{ position: "absolute" }}>
      <BoxGift />
      <div id="box-chat" className="box-chat hide--slide-y show">
        {map(get(chanelMessages, currentChanel!), (item, index) => {
          return (
            <div
              key={index}
              className={classNames("box-chat-item rounded-pill", {
                "text-end": currentLoginInformation.user_id === item.user_id,
                "text-start": currentLoginInformation.user_id !== item.user_id,
              })}
            >
              <span
                className={classNames("box-chat-item--text", {
                  current: currentLoginInformation.user_id === item.user_id,
                })}
              >
                <b>{item.user_name}:</b> {item.message}
              </span>
            </div>
          );
        })}
        <a id="end" />
      </div>
      <div>
        <Button onClick={handleHideChat} variant="text" disableTouchRipple>
          <img
            id="hideIcon"
            className="ticon rotate-225 back"
            src={ticon_arrow_bottom.default}
            style={{ width: 20, height: 20 }}
          />
        </Button>
      </div>
      <div
        className={"chatInputWrap hide--slide-x hide--slide-y show"}
        id="chatInputWrap"
      >
        <TextField
          className="overflow-hidden"
          variant="standard"
          id="chatInput"
          fullWidth
          value={mess}
          size="medium"
          onKeyDown={(e) => Boolean(e.keyCode == 13) && onSend()}
          onChange={(e) => setMess(e.target.value)}
          InputProps={{
            startAdornment: (
              <Button onClick={handleClick} variant="text" disableTouchRipple>
                <Icon className="hover--opacity">mood</Icon>
              </Button>
            ),
            endAdornment: (
              <Button
                name="SEND"
                onClick={onSend}
                className="btn-send-chat br-5"
              >
                SEND
              </Button>
            ),
            disableUnderline: true,
          }}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        disablePortal={true}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Picker
          theme={"dark"}
          showPreview={false}
          showSkinTones={false}
          useButton={false}
          emojiSize={20}
          sheetSize={20}
          onSelect={addEmoji}
        />
      </Popover>
    </div>
  );
};

export default LiveChat;
