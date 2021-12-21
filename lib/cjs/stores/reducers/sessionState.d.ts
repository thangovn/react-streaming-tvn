export interface SessionState {
    currentChanel?: string | null;
    currentLoginInformation: {
        user_name: string;
        user_id: string;
    };
}
declare const _default: (state: SessionState | undefined, action: any) => {
    currentChanel: any;
    currentLoginInformation: {
        user_name: string;
        user_id: string;
    };
} | {
    currentLoginInformation: any;
    currentChanel?: string | null | undefined;
};
export default _default;
