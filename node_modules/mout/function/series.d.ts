/**
 * Returns a function that will execute a list of functions in sequence
 * passing the same arguments to each one. (useful for batch processing
 * items during a forEach loop)
 */
declare function series(): () => void;
export default series;
