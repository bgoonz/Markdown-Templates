/**
 * Return a copy of the object, filtered to only have values for the whitelisted keys.
 */
declare function pick<T extends {}>(obj: T, varKeys: string[]): Partial<T>;
declare function pick<T extends {}>(obj: T, ...varKeys: string[]): Partial<T>;
export default pick;
