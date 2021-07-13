/**
 * Enforce a specific amount of decimal digits and also fix floating
 * point rounding issues.
 */
declare function enforcePrecision(val: any, nDecimalDigits: number): number;
export default enforcePrecision;
