import arrayMap from './_arrayMap';
import baseGet from './_baseGet';
import baseIteratee from './_baseIteratee';
import baseMap from './_baseMap';
import baseSortBy from './_baseSortBy';
import baseUnary from './_baseUnary';
import compareMultiple from './_compareMultiple';
import identity from './identity';
import isArray from './isArray';

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, iteratee => {
      if (isArray(iteratee)) {
        return value => {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  let index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  const result = baseMap(collection, (value, key, collection) => {
    const criteria = arrayMap(iteratees, iteratee => {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, (object, other) => {
    return compareMultiple(object, other, orders);
  });
}

export default baseOrderBy;
