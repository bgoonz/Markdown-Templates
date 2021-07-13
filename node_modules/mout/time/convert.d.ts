declare type unit = 'ms' | 'millisecond' | 's' | 'second' | 'm' | 'minute' | 'h' | 'hour' | 'd' | 'day' | 'w' | 'week';
/**
 * convert time into another unit
 */
declare function convert(val: number, sourceUnitName: unit, destinationUnitName?: unit): number;
export default convert;
