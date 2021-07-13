import isArray from './isArray';
import isKey from './_isKey';
import stringToPath from './_stringToPath';
import toString from './toString';

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }

  if (isKey(value, object)) {
    return [value];
  } else {
    return stringToPath(toString(value));
  }
}

export default castPath;
