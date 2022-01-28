/// <reference types="node" />
/**
 * Delays the call of a function within a given context.
 */
declare function timeout(fn: any, millis: any, context: any, ...args: any[]): NodeJS.Timeout;
export default timeout;
