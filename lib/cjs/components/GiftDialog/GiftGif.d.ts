/// <reference types="react" />
export declare const GIF_ICON_WIDTH = 120;
export declare const GIF_ICON_HEIGHT = 120;
export declare const prepareAinimation: (animationData: any) => {
    loop: boolean;
    autoplay: boolean;
    animationData: any;
    isStoped: boolean;
    isPause: boolean;
    rendererSettings: {
        preserveAspectRatio: string;
    };
};
declare const _default: ({ resource, onClick, isStopped, name }: any) => JSX.Element;
export default _default;
