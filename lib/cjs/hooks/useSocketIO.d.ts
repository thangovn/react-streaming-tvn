export default function useSocketIO(url: string): {
    joinState: boolean;
    sendMessage: Function;
    joinChat: Function;
    leaveChat: Function;
    sendGift: Function;
    errors: any[];
    messages: any[];
};
