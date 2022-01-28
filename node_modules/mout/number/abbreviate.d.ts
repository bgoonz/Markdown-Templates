declare const _defaultDict: {
    thousand: string;
    million: string;
    billion: string;
};
/**
 * Abbreviate number if bigger than 1000. (eg: 2.5K, 17.5M, 3.4B, ...)
 */
declare function abbreviateNumber(val: number, nDecimals?: number, dict?: typeof _defaultDict): string;
export default abbreviateNumber;
