/**
 * Return a function that will execute in the given context, optionally adding any additional supplied parameters to the beginning of the arguments collection.
 * @param {Function} fn  Function.
 * @param {object} context   Execution context.
 * @param {rest} args    Arguments (0...n arguments).
 * @return {Function} Wrapped Function.
 */
declare function bind(fn: any, context: any, ...args: any[]): (...innerArgs: any[]) => any;
export default bind;
