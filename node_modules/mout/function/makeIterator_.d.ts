/**
 * Converts argument into a valid iterator.
 * Used internally on most array/object/collection methods that receives a
 * callback/iterator providing a shortcut syntax.
 */
declare function makeIterator(src: Function | object | string | number, thisObj?: any): Function;
export default makeIterator;
