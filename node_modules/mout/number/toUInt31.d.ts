/**
 * "Convert" value into an 31-bit unsigned integer (since 1 bit is used for sign).
 * IMPORTANT: value wil wrap at 2^31, if negative will return 0.
 */
declare function toUInt31(val: number): number;
export default toUInt31;
