/**
 */
declare function throttle(fn: any, delay: any): {
    (): any;
    cancel(): void;
};
export default throttle;
