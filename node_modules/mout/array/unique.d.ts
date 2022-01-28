/**
 * @return {array} Array of unique items
 */
declare function unique(arr: any, compare?: typeof isEqual): any[];
declare function isEqual(a: any, b: any): boolean;
export default unique;
