import is from './is';
/**
 * Recursively checks for same properties and values.
 */
declare function deepEquals(a: any, b: any, callback?: typeof is): any;
export default deepEquals;
