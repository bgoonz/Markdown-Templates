/**
 * Get current time in miliseconds
 */
declare function now(): number;
declare namespace now {
    var get: () => number;
}
export default now;
