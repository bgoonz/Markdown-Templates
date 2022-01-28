/**
 * Gets the "kind" of value. (e.g. "String", "Number", etc)
 */
declare type Type = 'Arguments' | 'Array' | 'Boolean' | 'Date' | 'Function' | 'Null' | 'Number' | 'Object' | 'RegExp' | 'String' | 'Symbol' | 'Undefined';
declare function kindOf(val: any): Type;
export default kindOf;
