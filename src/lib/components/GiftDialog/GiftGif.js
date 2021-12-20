import classNames from "classnames";
import { capitalize } from "lodash";
import React from "react";

export const GIF_ICON_WIDTH = 120;
export const GIF_ICON_HEIGHT = 120;

export const prepareAinimation = (animationData) => ({
  loop: true,
  autoplay: true,
  animationData,
  isStoped: true,
  isPause: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
});

export default ({ resource, onClick, isStopped, name }) => {
  return (
    <>
      <div
        className={classNames("gift-lottie p-1", {
          "d-none": isStopped,
        })}
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          //   top: "10%",
          //   left: "10%",
          //   bottom: 0,
          //   right: 0,
          height: GIF_ICON_HEIGHT,
          width: GIF_ICON_WIDTH,
          cursor: "pointer",
        }}
      >
        <img
          src={resource}
          alt={name}
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        />
        <tspan
          style={{ letterSpacing: "0.01rem", position: "absolute", bottom: 0 }}
        >
          {capitalize(name)}
        </tspan>
        {/* <Lottie
        options={prepareAinimation(resource)}
        height={GIF_ICON_WIDTH}
        width={GIF_ICON_HEIGHT}
        isStopped={isStopped}
        isPaused={isStopped}
      /> */}
      </div>
    </>
  );
};
