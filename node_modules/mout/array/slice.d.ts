/**
 * Create slice of source array or array-like object
 */
declare function slice<T>(arr: T[] | IArguments, start?: number, end?: number): T[];
export default slice;
