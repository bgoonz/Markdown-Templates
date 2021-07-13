/**
 * Group arguments as path segments, if any of the args is `null` or an
 * empty string it will be ignored from resulting path.
 */
declare function makePath(...args: Array<string | null | undefined>): string;
export default makePath;
