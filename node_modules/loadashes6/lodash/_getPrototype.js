import overArg from './_overArg';

/** Built-in value references. */
const getPrototype = overArg(Object.getPrototypeOf, Object);

export default getPrototype;
