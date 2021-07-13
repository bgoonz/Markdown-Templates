import basePickBy from './_basePickBy';
import hasIn from './hasIn';

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, (value, path) => {
    return hasIn(object, path);
  });
}

export default basePick;
