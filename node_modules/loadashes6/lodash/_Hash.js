import hashClear from './_hashClear';
import hashDelete from './_hashDelete';
import hashGet from './_hashGet';
import hashHas from './_hashHas';
import hashSet from './_hashSet';

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  let index = -1;
  const length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

export default Hash;
