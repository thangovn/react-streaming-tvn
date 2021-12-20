import classNames from "classnames"
import React from "react"

const LiveStreamingScreenLayout = props => {
  const { children, className } = props
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className={classNames(className, "position-relative flex-fill")}>
      <div className="screen-player">{children}</div>
    </div>
  )
}
export default LiveStreamingScreenLayout
