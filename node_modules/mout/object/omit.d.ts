/**
 * Return a copy of the object, filtered to only contain properties except the blacklisted keys.
 */
declare function omit<T extends {}, E extends keyof T>(obj: T, varKeys: E[]): Omit<T, E>;
declare function omit<T extends {}, E extends keyof T>(obj: T, ...varKeys: E[]): Omit<T, E>;
export default omit;
