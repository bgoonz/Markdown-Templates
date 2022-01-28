/**
 * Returns a random element from the supplied arguments
 * or from the array (if single argument is an array).
 */
declare function choice<T>(...items: T[] | T[][]): T;
export default choice;
