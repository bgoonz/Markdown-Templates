/**
 * Binds methods of the object to be run in it's own context.
 */
declare function bindAll<T extends {}>(obj: T, ...args: Array<keyof T>): void;
export default bindAll;
