/**
 * Creates a new object where all the values are the result of calling
 * `callback`.
 */
declare function mapValues(obj: object, callback: Function, thisObj?: any): Record<string, any>;
export default mapValues;
