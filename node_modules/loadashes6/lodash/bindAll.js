import arrayEach from './_arrayEach';
import baseAssignValue from './_baseAssignValue';
import bind from './bind';
import flatRest from './_flatRest';
import toKey from './_toKey';

/**
 * Binds methods of an object to the object itself, overwriting the existing
 * method.
 *
 * **Note:** This method doesn't set the "length" property of bound functions.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {Object} object The object to bind and assign the bound methods to.
 * @param {...(string|string[])} methodNames The object method names to bind.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * _.bindAll(view, ['click']);
 * jQuery(element).on('click', view.click);
 * // => Logs 'clicked docs' when clicked.
 */
const bindAll = flatRest((object, methodNames) => {
  arrayEach(methodNames, key => {
    key = toKey(key);
    baseAssignValue(object, key, bind(object[key], object));
  });
  return object;
});

export default bindAll;
