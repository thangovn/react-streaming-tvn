/// <reference types="react" />
export declare const LOTTIE_ICON_WIDTH = 100;
export declare const LOTTIE_ICON_HEIGHT = 100;
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
