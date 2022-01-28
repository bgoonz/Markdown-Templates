/** Used to match a single whitespace character. */
const reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  let index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

export default trimmedEndIndex;
