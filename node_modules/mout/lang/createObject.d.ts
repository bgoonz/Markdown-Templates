/**
 * Create Object using prototypal inheritance and setting custom properties.
 * - Mix between Douglas Crockford Prototypal Inheritance <http://javascript.crockford.com/prototypal.html> and the EcmaScript 5 `Object.create()` method.
 * @param {object} parent    Parent Object.
 * @param {object} [props] Object properties.
 * @return {object} Created object.
 */
declare function createObject(parent: any, props?: any): any;
export default createObject;
