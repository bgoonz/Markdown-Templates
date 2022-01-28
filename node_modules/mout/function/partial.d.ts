/**
 * Creates a partially applied function.
 */
declare function partial(f: any, ...outerArgs: any[]): (...rest: any[]) => any;
declare namespace partial {
    var _: {};
}
export default partial;
