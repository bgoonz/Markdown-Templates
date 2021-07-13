/**
 * Parse timestamp into an object.
 */
declare function parseMs(ms: any): {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
};
export default parseMs;
