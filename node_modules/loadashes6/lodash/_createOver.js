import apply from './_apply';
import arrayMap from './_arrayMap';
import baseIteratee from './_baseIteratee';
import baseRest from './_baseRest';
import baseUnary from './_baseUnary';
import flatRest from './_flatRest';

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return flatRest(iteratees => {
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    return baseRest(function(args) {
      const thisArg = this;
      return arrayFunc(iteratees, iteratee => {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

export default createOver;
