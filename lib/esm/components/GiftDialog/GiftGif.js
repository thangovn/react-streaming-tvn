import classNames from "classnames";
import { capitalize } from "lodash";
import React from "react";
export var GIF_ICON_WIDTH = 120;
export var GIF_ICON_HEIGHT = 120;
export var prepareAinimation = function (animationData) { return ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStoped: true,
    isPause: true,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
}); };
export default (function (_a) {
    var resource = _a.resource, onClick = _a.onClick, isStopped = _a.isStopped, name = _a.name;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classNames("gift-lottie p-1", {
                "d-none": isStopped,
            }), onClick: onClick, style: {
                display: "flex",
                alignItems: "center",
                //   top: "10%",
                //   left: "10%",
                //   bottom: 0,
                //   right: 0,
                height: GIF_ICON_HEIGHT,
                width: GIF_ICON_WIDTH,
                cursor: "pointer",
            } },
            React.createElement("img", { src: resource, alt: name, style: {
                    maxWidth: "90%",
                    maxHeight: "90%",
                } }),
            React.createElement("tspan", { style: { letterSpacing: "0.01rem", position: "absolute", bottom: 0 } }, capitalize(name)))));
});
