/**
 * Returns pseudo-random guid (UUID v4)
 * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
 * by default and sequences can be predicted in some cases. See the
 * "random/random" documentation for more info about it and how to replace
 * the default PRNG.
 */
declare function guid(): string;
export default guid;
