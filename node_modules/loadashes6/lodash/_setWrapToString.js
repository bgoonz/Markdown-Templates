import getWrapDetails from './_getWrapDetails';
import insertWrapDetails from './_insertWrapDetails';
import setToString from './_setToString';
import updateWrapDetails from './_updateWrapDetails';

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  const source = (`${reference}`);
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

export default setWrapToString;
