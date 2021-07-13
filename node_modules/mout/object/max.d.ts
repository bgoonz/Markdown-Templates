/**
 * Returns maximum value inside object.
 */
declare function max<T>(obj: Record<string, T>, compareFn: <T>(a: T, b: T) => number): T | undefined;
export default max;
