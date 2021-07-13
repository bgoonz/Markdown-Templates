import baseProperty from './_baseProperty';

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
const asciiSize = baseProperty('length');

export default asciiSize;
