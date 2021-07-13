/**
 * checks if a object contains all given properties/values
 */
declare function matches<T>(target: Record<string, T>, props: string[]): boolean;
export default matches;
