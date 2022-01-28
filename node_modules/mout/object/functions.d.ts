/**
 * return a list of all enumerable properties that have function values
 */
declare function functions<T extends {}>(obj: T): Array<keyof T>;
export default functions;
