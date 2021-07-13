import Stack from './_Stack';
import assignMergeValue from './_assignMergeValue';
import baseFor from './_baseFor';
import baseMergeDeep from './_baseMergeDeep';
import isObject from './isObject';
import keysIn from './keysIn';
import safeGet from './_safeGet';

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, (srcValue, key) => {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      let newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (`${key}`), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

export default baseMerge;
