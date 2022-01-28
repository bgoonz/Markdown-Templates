/**
 * Linear interpolation.
 * IMPORTANT:will return `Infinity` if numbers overflow Number.MAX_VALUE
 */
declare function lerp(ratio: number, start: number, end: number): number;
export default lerp;
