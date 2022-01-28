import baseRepeat from './_baseRepeat';
import baseToString from './_baseToString';
import castSlice from './_castSlice';
import hasUnicode from './_hasUnicode';
import stringSize from './_stringSize';
import stringToArray from './_stringToArray';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeCeil = Math.ceil;

/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : baseToString(chars);

  const charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat(chars, length) : chars;
  }
  const result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
  return hasUnicode(chars)
    ? castSlice(stringToArray(result), 0, length).join('')
    : result.slice(0, length);
}

export default createPadding;
