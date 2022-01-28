/**
 * Combine properties from all the objects into first one.
 * - This method affects target object in place, if you want to create a new Object pass an empty
 * object as first param.
 * @param {object} target    Target Object
 * @param {...object} objects    Objects to be combined (0...n objects).
 * @return {object} Target Object.
 */
declare function mixIn(target: any, ...objects: any[]): any;
export default mixIn;
