import { fetchSignInKey } from "../utils/signInKey";
import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LiveStreamingScreenLayout from "../layouts/ScreenLayout";
import { persistor, store } from "../stores";
import "../styles/app.scss";
import GiftDialog from "./GiftDialog";
import GiftContainer from "./GiftDialog/GiftContainer";
import LiveAgoraTVN from "./LiveAgoraTVN";
import LiveChat from "./LiveChat";
import sessionActions from "../stores/actions/sessionActions";

export default React.memo(
  ({
    userInfo: { user_id, user_name },
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
  }) => {
    const [appId, setAppId] = useState("");
    const [statusAppId, setStatusAppId] = useState(null);
    // const dispatch = useDispatch();
    const initial = (res) => {
      if (res.error) {
        setStatusAppId({
          statusCode: res.error.statusCode,
          name: res.error.name,
          message: res.error.message,
        });
      } else {
        setAppId(res.secret);
        setStatusAppId({
          statusCode: 200,
          name: "ok",
          message: "ok",
        });
      }
    };
    useEffect(() => {
      fetchSignInKey(appid)
        .then((res) => {
          initial(res);
        })
        .catch();
    }, [appid]);

    useEffect(() => {
      store.dispatch(
        sessionActions.setCurrentLoginInformations({
          user_name: user_name,
          user_id: user_id,
        })
      );
    }, [user_id, user_name]);

    useEffect(() => {
      store.dispatch(sessionActions.setCurrentChanel(channelChat));
    }, [channelChat]);

    const rederResult = () => {
      if (statusAppId?.statusCode == 200) {
        return (
          <>
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
              appid={appId}
              channel={channelLive}
              autoJoin={autoJoin}
              showSetting={showSetting}
              token={token}
              uid={uid}
            ></LiveAgoraTVN>
          </>
        );
      } else {
        return (
          <div className="loading-wrap">
            {/* <div className="loader m-auto"></div> */}
            <div className="content">{statusAppId?.message}</div>
          </div>
        );
      }
    };

    return (
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <div className="live-streaming-screen container d-flex flex-column flex-fill">
              <LiveStreamingScreenLayout className="screen ">
                {rederResult()}
              </LiveStreamingScreenLayout>
            </div>
          </HelmetProvider>
        </PersistGate>
      </ReduxProvider>
    );
  }
);
