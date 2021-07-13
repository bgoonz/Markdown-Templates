/**
 * Copy missing properties in the obj from the defaults.
 */
declare function fillIn<T extends {}, E extends {}>(obj: T, ...varDefaults: any[]): T & E;
export default fillIn;
