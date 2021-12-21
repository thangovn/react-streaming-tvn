import classNames from "classnames";
import { capitalize, snakeCase } from "lodash";
import React from "react";
import Lottie from "react-lottie";
export var LOTTIE_ICON_WIDTH = 100;
export var LOTTIE_ICON_HEIGHT = 100;
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
        React.createElement("svg", { id: snakeCase(name), style: { width: "100%" }, "data-name": snakeCase(name), xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 2160.3 2160.3" },
            React.createElement("polygon", { fill: "#4CD1FB", points: "0 467.75 40.36 159.56 40.36 2000.74 0 1815.82 0 467.75" }),
            React.createElement("path", { fill: "#25084f", d: "M52.66,137.6V2022.7a62.66,62.66,0,0,0,62.66,62.66H2041.56a62.66,62.66,0,0,0,62.66-62.66V137.6a62.66,62.66,0,0,0-62.66-62.66H115.32A62.66,62.66,0,0,0,52.66,137.6Zm1917.73,1878H186.49A62.67,62.67,0,0,1,123.83,1953V207.34a62.66,62.66,0,0,1,62.66-62.66h1783.9a62.66,62.66,0,0,1,62.66,62.66V1953A62.67,62.67,0,0,1,1970.39,2015.62Z" }),
            React.createElement("polygon", { fill: "#4CD1FB", points: "2160.3 1682.72 2120.29 1985.97 2120.29 174.32 2160.3 356.27 2160.3 1682.72" }),
            React.createElement("polygon", { fill: "#4CD1FB", points: "1787.4 0 1965.79 52.29 191.11 52.29 369.35 0 1787.4 0" }),
            React.createElement("polygon", { fill: "#4CD1FB", points: "369.49 2160.3 191.11 2100.29 1965.78 2100.29 1787.55 2160.3 369.49 2160.3" }),
            React.createElement("polygon", { fill: "#8637fb", points: "2033.05 2085.36 52.66 2085.36 52.66 1791.79 1689.53 1791.79 2033.05 2085.36" }),
            React.createElement("polygon", { fill: "#eb07d8", points: "850.87 2085.36 52.66 2085.36 52.66 1703.84 595.17 1703.84 850.87 2085.36" }),
            React.createElement("text", { style: { fontSize: 269.56, fontWeight: 700 }, fill: "#fff", transform: "translate(121.08 1994.31)" }, "$05"),
            React.createElement("text", { fill: "#fff", transform: "translate(860.04 1994.31)", style: { fontSize: 188.34, fontWeight: 700 } },
                React.createElement("tspan", { style: { letterSpacing: "0.01rem" } }, capitalize(name)))),
        React.createElement("div", { className: classNames("gift-lottie position-absolute p-1", {
                "d-none": isStopped,
            }), onClick: onClick, style: {
                top: "10%",
                left: "10%",
                bottom: 0,
                right: 0,
                cursor: "pointer",
            } },
            React.createElement(Lottie, { options: prepareAinimation(resource), height: LOTTIE_ICON_WIDTH, width: LOTTIE_ICON_HEIGHT, isStopped: isStopped, isPaused: isStopped }))));
});
