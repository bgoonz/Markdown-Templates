import assignMergeValue from './_assignMergeValue';
import cloneBuffer from './_cloneBuffer';
import cloneTypedArray from './_cloneTypedArray';
import copyArray from './_copyArray';
import initCloneObject from './_initCloneObject';
import isArguments from './isArguments';
import isArray from './isArray';
import isArrayLikeObject from './isArrayLikeObject';
import isBuffer from './isBuffer';
import isFunction from './isFunction';
import isObject from './isObject';
import isPlainObject from './isPlainObject';
import isTypedArray from './isTypedArray';
import safeGet from './_safeGet';
import toPlainObject from './toPlainObject';

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  const objValue = safeGet(object, key);
  const srcValue = safeGet(source, key);
  const stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  let newValue = customizer
    ? customizer(objValue, srcValue, (`${key}`), object, source, stack)
    : undefined;

  let isCommon = newValue === undefined;

  if (isCommon) {
    const isArr = isArray(srcValue);
    const isBuff = !isArr && isBuffer(srcValue);
    const isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

export default baseMergeDeep;
