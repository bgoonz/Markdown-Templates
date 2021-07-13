import metaMap from './_metaMap';
import noop from './noop';

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
const getData = !metaMap ? noop : func => {
  return metaMap.get(func);
};

export default getData;
