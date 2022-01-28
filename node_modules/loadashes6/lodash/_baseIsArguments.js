import baseGetTag from './_baseGetTag';
import isObjectLike from './isObjectLike';

/** `Object#toString` result references. */
const argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

export default baseIsArguments;
