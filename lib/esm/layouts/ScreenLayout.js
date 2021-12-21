import classNames from "classnames";
import React from "react";
var LiveStreamingScreenLayout = function (props) {
    var children = props.children, className = props.className;
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (React.createElement("div", { className: classNames(className, "position-relative flex-fill") },
        React.createElement("div", { className: "screen-player" }, children)));
};
export default LiveStreamingScreenLayout;
