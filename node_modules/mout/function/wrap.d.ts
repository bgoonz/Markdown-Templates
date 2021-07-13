/**
 * Returns the first function passed as an argument to the second,
 * allowing you to adjust arguments, run code before and after, and
 * conditionally execute the original function.
 */
declare function wrap(fn: any, wrapper: any): (...rest: any[]) => any;
export default wrap;
