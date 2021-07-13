import baseWrapperValue from './_baseWrapperValue';
import getView from './_getView';
import isArray from './isArray';

/** Used to indicate the type of lazy iteratees. */
const LAZY_FILTER_FLAG = 1;

const LAZY_MAP_FLAG = 2;

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeMin = Math.min;

/**
 * Extracts the unwrapped value from its lazy wrapper.
 *
 * @private
 * @name value
 * @memberOf LazyWrapper
 * @returns {*} Returns the unwrapped value.
 */
function lazyValue() {
  const array = this.__wrapped__.value();
  const dir = this.__dir__;
  const isArr = isArray(array);
  const isRight = dir < 0;
  const arrLength = isArr ? array.length : 0;
  const view = getView(0, arrLength, this.__views__);
  const start = view.start;
  const end = view.end;
  let length = end - start;
  let index = isRight ? end : (start - 1);
  const iteratees = this.__iteratees__;
  const iterLength = iteratees.length;
  let resIndex = 0;
  const takeCount = nativeMin(length, this.__takeCount__);

  if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
    return baseWrapperValue(array, this.__actions__);
  }
  const result = [];

  outer:
  while (length-- && resIndex < takeCount) {
    index += dir;

    let iterIndex = -1;
    let value = array[index];

    while (++iterIndex < iterLength) {
      const data = iteratees[iterIndex];
      const iteratee = data.iteratee;
      const type = data.type;
      const computed = iteratee(value);

      if (type == LAZY_MAP_FLAG) {
        value = computed;
      } else if (!computed) {
        if (type == LAZY_FILTER_FLAG) {
          continue outer;
        } else {
          break outer;
        }
      }
    }
    result[resIndex++] = value;
  }
  return result;
}

export default lazyValue;
