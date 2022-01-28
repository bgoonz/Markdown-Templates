import baseIteratee from './_baseIteratee';
import isArrayLike from './isArrayLike';
import keys from './keys';

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return (collection, predicate, fromIndex) => {
    const iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = key => { return iteratee(iterable[key], key, iterable); };
    }
    const index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

export default createFind;
