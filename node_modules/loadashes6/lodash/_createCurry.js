import apply from './_apply';
import createCtor from './_createCtor';
import createHybrid from './_createHybrid';
import createRecurry from './_createRecurry';
import getHolder from './_getHolder';
import replaceHolders from './_replaceHolders';
import root from './_root';

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  const Ctor = createCtor(func);

  function wrapper() {
    let length = arguments.length;
    const args = Array(length);
    let index = length;
    const placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    const holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    const fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

export default createCurry;
