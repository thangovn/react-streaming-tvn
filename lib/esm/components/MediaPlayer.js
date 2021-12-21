import React, { useEffect, useRef } from "react";
var MediaPlayer = function (props) {
    var container = useRef(null);
    useEffect(function () {
        var _a;
        if (!container.current)
            return;
        (_a = props.videoTrack) === null || _a === void 0 ? void 0 : _a.play(container.current);
        return function () {
            var _a;
            (_a = props.videoTrack) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [container, props.videoTrack]);
    useEffect(function () {
        var _a;
        if (props.audioTrack) {
            (_a = props.audioTrack) === null || _a === void 0 ? void 0 : _a.play();
        }
        return function () {
            var _a;
            (_a = props.audioTrack) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [props.audioTrack]);
    return (React.createElement("div", { ref: container, className: "video-player", style: { width: "100%", height: "100%", position: "absolute" } }));
};
export default MediaPlayer;
