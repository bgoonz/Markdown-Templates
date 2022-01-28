/**
 * Calls closure only after callback is called x times
 */
declare function after(closure: any, times: any): () => void;
export default after;
