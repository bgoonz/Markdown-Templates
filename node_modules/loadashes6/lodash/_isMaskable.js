import coreJsData from './_coreJsData';
import isFunction from './isFunction';
import stubFalse from './stubFalse';

/**
 * Checks if `func` is capable of being masked.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
 */
const isMaskable = coreJsData ? isFunction : stubFalse;

export default isMaskable;
