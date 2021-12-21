import { FC } from "react";
import { GifiDto } from "../../dtos";
interface GiftDialogProps {
    className?: string;
    value: GifiDto[] | any;
    loading: boolean;
    socketURL: string;
}
declare const GiftDialog: FC<GiftDialogProps>;
export default GiftDialog;
