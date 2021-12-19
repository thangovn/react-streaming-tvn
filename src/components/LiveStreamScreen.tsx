import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LiveConfigProps } from "../dtos";
import LiveStreamingScreenLayout from "../layouts/ScreenLayout";
import { persistor, store } from "../stores";
import "../styles/app.scss";
import GiftDialog from "./GiftDialog";
import GiftContainer from "./GiftDialog/GiftContainer";
import LiveAgoraTVN from "./LiveAgoraTVN";
import LiveChat from "./LiveChat";
export default ({
  configChat: { socketURL = "18.138.225.4:5000", channelChat },
  configLive: {
    autoJoin = true,
    showSetting = false,
    uid,
    appid,
    token,
    channelLive,
  },
  giftData,
}: LiveConfigProps) => {
  // const initial = (app_id: string) => {};
  // useEffect(() => {
  //   fetchSignInKey(appid)
  //     .then((key) => {
  //       initial(key);
  //     })
  //     .catch();
  // }, [appid]);
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <div className="live-streaming-screen container d-flex flex-column flex-fill">
            <LiveStreamingScreenLayout className="screen ">
              <GiftContainer />
              <LiveChat
                socketURL={socketURL}
                channelChat={channelChat}
                onReceiveGift={(gift) => {
                  console.log(gift);
                }}
              />
              <GiftDialog
                className={"gift-absolute"}
                value={giftData.value}
                loading={giftData.loading}
                socketURL={socketURL}
              />
              <LiveAgoraTVN
                appid={appid}
                channel={channelLive}
                autoJoin={autoJoin}
                showSetting={showSetting}
                token={token}
                uid={uid}
              ></LiveAgoraTVN>
            </LiveStreamingScreenLayout>
          </div>
        </HelmetProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
