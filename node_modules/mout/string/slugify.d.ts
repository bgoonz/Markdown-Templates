/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
declare function slugify(str: any, delimeter: any): any;
export default slugify;
