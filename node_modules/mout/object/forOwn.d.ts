/**
 * Similar to Array/forEach but works over object properties and fixes Don't
 * Enum bug on IE.
 * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
 */
declare function forOwn(obj: Record<string, any>, fn: Function, thisObj?: any): void;
export default forOwn;
