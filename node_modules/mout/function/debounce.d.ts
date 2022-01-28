/**
 * Debounce callback execution
 */
declare function debounce(fn: any, threshold: any, isAsap: any): {
    (): any;
    cancel(): void;
};
export default debounce;
