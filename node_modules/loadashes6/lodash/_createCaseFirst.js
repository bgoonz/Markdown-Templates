import castSlice from './_castSlice';
import hasUnicode from './_hasUnicode';
import stringToArray from './_stringToArray';
import toString from './toString';

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return string => {
    string = toString(string);

    const strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    const chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    const trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

export default createCaseFirst;
