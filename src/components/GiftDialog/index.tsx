import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import classNames from "classnames";
import { map } from "lodash";
import React, { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useToggle from "react-use/lib/useToggle";
import { GifiDto, GiftType } from "../../dtos";
import useSocketIO from "../../hooks/useSocketIO";
import { gift_icon } from "../../images/index";
import { AppState } from "../../stores/reducers";
import GiftGif from "./GiftGif";
import GiftLottie from "./GiftLottie";

interface GiftDialogProps {
  className?: string;
  value: GifiDto[] | any;
  loading: boolean;
  socketURL: string;
}

const GiftDialog: FC<GiftDialogProps> = ({
  className,
  value,
  loading,
  socketURL,
}) => {
  const { sendGift } = useSocketIO(socketURL);
  const dialogRef = useRef(null);
  const [open, toggleOpen] = useToggle(false);
  const { currentChanel, currentLoginInformation } = useSelector(
    (state: AppState) => state.sessionState
  );

  const onGiftClicked = (item: GifiDto, quantity: number) => {
    if (quantity == 0) return;
    sendGift({
      chanel_id: currentChanel,
      quantity: quantity,
      gift_data: item,
      time: new Date().toISOString(),
      ...currentLoginInformation,
    });

    toggleOpen();
  };

  const renderGiftItem = (item, index) => {
    const [quantity, setQuantity] = useState<any>(0);
    return (
      <Grid item md={3} key={index} className={classNames("position-relative")}>
        {item.gift_type === GiftType.LOTTIE && (
          <GiftLottie
            resource={item.resource}
            name={item.name}
            isStopped={!open}
            onClick={() => {
              setQuantity(0);
              onGiftClicked(item, quantity);
            }}
          />
        )}
        {item.gift_type === GiftType.GIF && (
          <>
            <GiftGif
              resource={item.resource}
              name={item.name}
              isStopped={!open}
              onClick={() => {
                setQuantity(0);
                onGiftClicked(item, quantity);
              }}
            />
          </>
        )}
        <TextField
          key={item.id}
          label=""
          size="small"
          className="text-center"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={(e) => {
            let value: any = e.target.value;
            if (value > 99) value = 99;
            if (value < 0) value = 0;
            setQuantity(value);
          }}
          InputProps={{
            inputProps: {
              style: { textAlign: "center", color: "#ffffff" },
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  className="p-0"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 0}
                >
                  <Icon>remove</Icon>
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className="p-0"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  <Icon>add</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    );
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
                return renderGiftItem(item, idx);
              })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftDialog;
