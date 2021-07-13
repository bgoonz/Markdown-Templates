/**
 * Just a wrapper to Math.random. No methods inside mout/random should call
 * Math.random() directly so we can inject the pseudo-random number
 * generator if needed (ie. in case we need a seeded random or a better
 * algorithm than the native one)
 */
declare function random(): number;
declare namespace random {
    var get: () => number;
}
export default random;
