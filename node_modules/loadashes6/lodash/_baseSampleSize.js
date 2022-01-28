import baseClamp from './_baseClamp';
import shuffleSelf from './_shuffleSelf';
import values from './values';

/**
 * The base implementation of `_.sampleSize` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to sample.
 * @param {number} n The number of elements to sample.
 * @returns {Array} Returns the random elements.
 */
function baseSampleSize(collection, n) {
  const array = values(collection);
  return shuffleSelf(array, baseClamp(n, 0, array.length));
}

export default baseSampleSize;
