import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import classNames from "classnames";
import { map } from "lodash";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import useSocketIO from "../../hooks/useSocketIO";
import { gift_icon } from "../../images/index";
import GiftGif from "./GiftGif";
import GiftLottie from "./GiftLottie";

const GiftDialog = ({ className, value, loading, socketURL }) => {
  const { sendGift } = useSocketIO(socketURL);
  const dialogRef = useRef(null);
  const [open, toggleOpen] = useToggle(false);
  const { currentChanel, currentLoginInformation } = useSelector(
    (state) => state.sessionState
  );

  const onGiftClicked = (item) => {
    sendGift({
      chanel_id: currentChanel,
      quantity: 99,
      gift_data: item,
      time: new Date().toISOString(),
      ...currentLoginInformation,
    });

    toggleOpen();
  };

  return (
    <>
      <Button
        variant="text"
        onClick={toggleOpen}
        disableRipple
        className={classNames(className)}
      >
        <img
          src={gift_icon.default}
          className="ms-auto"
          style={{ width: "5rem" }}
        />
      </Button>

      <Dialog
        ref={dialogRef}
        open={true}
        onClose={toggleOpen}
        className={classNames({ "d-none": !open })}
        aria-labelledby="alert-dialog-title"
        PaperProps={{ className: "dark-dialog gift-dialog" }}
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogContent className="text-light">
          <Grid container spacing={1} className="gift-container">
            {loading && <CircularProgress />}
            {!loading &&
              map(value, (item, idx) => {
                return (
                  <Grid
                    item
                    md={3}
                    key={idx}
                    className={classNames("position-relative")}
                  >
                    {item.gift_type === 'Lottie' && (
                      <GiftLottie
                        resource={item.resource}
                        name={item.name}
                        isStopped={!open}
                        onClick={() => onGiftClicked(item)}
                      />
                    )}
                    {item.gift_type === 'Gif' && (
                      <GiftGif
                        resource={item.resource}
                        name={item.name}
                        isStopped={!open}
                        onClick={() => onGiftClicked(item)}
                      />
                    )}
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftDialog;
