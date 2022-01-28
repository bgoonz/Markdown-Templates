/**
 * internal method used to create other collection modules.
 */
declare function makeCollectionMethod(arrMethod: any, objMethod: any, defaultReturn?: any): (...args: any[]) => any;
export default makeCollectionMethod;
