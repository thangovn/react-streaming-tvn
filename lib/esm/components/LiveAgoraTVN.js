import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect } from "react";
import useAgora from "../hooks/useAgora";
import MediaPlayer from "./MediaPlayer";
var client = AgoraRTC.createClient({ codec: "h264", mode: "live" });
var LiveAgoraTVN = function (_a) {
    var _b = _a.appid, appid = _b === void 0 ? "3098260ca7614087844230aec70a64eb" : _b, _c = _a.channel, channel = _c === void 0 ? "demo" : _c, token = _a.token, uid = _a.uid, _d = _a.showSetting, showSetting = _d === void 0 ? false : _d, _e = _a.autoJoin, autoJoin = _e === void 0 ? true : _e;
    var _f = useAgora(client !== null && client !== void 0 ? client : null), localAudioTrack = _f.localAudioTrack, localVideoTrack = _f.localVideoTrack, leave = _f.leave, join = _f.join, joinState = _f.joinState, remoteUsers = _f.remoteUsers, errors = _f.errors, joinAu = _f.joinAu;
    useEffect(function () {
        if (autoJoin)
            joinAu(appid, channel, token);
    }, []);
    return (React.createElement("div", { className: "call h-100" },
        Boolean(showSetting) && (React.createElement("div", { className: "button-group" },
            React.createElement("button", { id: "join", type: "button", className: "btn-primary mr-2", disabled: joinState, onClick: function () {
                    join(appid, channel, token);
                } }, "Create Chanel"),
            React.createElement("button", { id: "join", type: "button", className: "btn-primary mr-2", disabled: joinState, onClick: function () {
                    joinAu(appid, channel, token);
                } }, "Join"),
            React.createElement("button", { id: "leave", type: "button", color: "error", disabled: !joinState, onClick: function () {
                    leave();
                } }, "Leave"))),
        React.createElement("div", { className: "player-container h-100 position-relative" },
            Boolean(joinState) && (React.createElement("div", { className: "loading-wrap" },
                React.createElement("div", { className: "loader m-auto" }),
                React.createElement("div", { className: "content" }, "Waiting for connection"))),
            remoteUsers.map(function (user) { return (React.createElement("div", { className: "remote-player-wrapper", key: user.uid },
                React.createElement(MediaPlayer, { videoTrack: user.videoTrack, audioTrack: user.audioTrack }))); }))));
};
export default LiveAgoraTVN;
