export interface LiveConfigProps {
  configChat: {
    socketURL?: string;
    channelChat: string;
  };
  configLive: {
    channelLive: string;
    appid: string;
    token?: string;
    uid?: string | number;
    showSetting?: boolean;
    autoJoin?: boolean;
  };
  giftData: {
    value: GifiDto[] | any;
    loading: boolean;
  };
}

export enum GiftType {
  LOTTIE = "Lottie",
  GIF = "Gif",
}

export interface GifiDto {
  _id: string;
  name: string;
  price: number;
  currency: string;
  currency_abbrev: string;
  url: string | null;
  resource: any | null;
  type: string;
  maximum_per_use: number;
}

export interface IGiftItem {
  created_at?: string;
  created_by_id?: number;
  updated_at?: string;
  deleted_at?: null;
  deleted_by_id?: null;
  is_deleted?: number;
  id?: number;
  name?: string;
  description?: string;
  gift_type?: "Gif" | "Lottie";
  resource?: string;
  price?: number;
  coin?: number;
  thumbnail?: string;
  currency_id?: number;
  quantity_remain?: number;
}

export interface IReceiveGiftItem {
  chanel_id?: string;
  quantity?: number;
  user_name?: string;
  gift_data?: IGiftItem;
  queue_id?: string;
}

export interface ChanelConcurrent {
  chanel_id: string;
  concurrent: number;
}
