import {AVAILABLE_INTERVAL, EU28_MEMBER_CODES} from '#src/aggregator/stats.const.ts';

type IStatsEntry = {
    [key in typeof EU28_MEMBER_CODES[number]]: {
        [key in typeof AVAILABLE_INTERVAL[number]]: number;
    }
}

/**
 * The minimum value for which the PERCENTAGE_SAFETY_THRESHOLD can be applied
 */
const PERCENTAGE_MIN_VALUE = -100;

/**
 * A value that should be added to a percentage value in order to avoid the
 * multiplication or division by 0<br/>
 * E.g.:<br/>
 *      * percent = 0 => output = 0 + 101 = 101
 *      * percent = -100 => output = -100 + 101 = 1
 */
const PERCENTAGE_SAFETY_THRESHOLD = 101;

/**
 * Get a safety value.<br/>
 * <b>A safety value</b> is a value that neutralize the effect of the "0" value
 * in the multiplication and division processes.<br/>
 *
 * E.g.:<br/>
 * - value = 0     =>   safetyValue = 0 + 101 = 101<br/>
 * - value = -100  =>   safetyValue = -100 + 101 = 1
 *
 * QoLI Framework equivalence:<br/>
 *  - MathUtils.percentageSafetyDouble(double value)
 *  - MathUtils.percentageSafetyDouble(Map<String, Number> map, String key)
 *
 * @param value The percentage value
 * @return The safety value
 */
const percentageSafetyDouble = (value: number): number => {
    if (value < PERCENTAGE_MIN_VALUE) {
        throw new Error(`The value (${value}) is lower than ${PERCENTAGE_MIN_VALUE} and the current safety threshold can not be applied.`)
    }

    return value + PERCENTAGE_SAFETY_THRESHOLD;
};

/**
 * Get a safety value.<br/>
 * <b>A safety value</b> is a value that neutralize the effect of the "0" value
 * in the multiplication and division processes.<br/>
 *
 * E.g.:<br/>
 * - value = 0     =>   safetyValue = 0 + 101 = 101<br/>
 * - value = -100  =>   safetyValue = -100 + 101 = 1
 *
 * QoLI Framework equivalence:<br/>
 *  - MathUtils.percentageSafetyDouble(Map<String, Number> map, String key, boolean reversedImpact)
 *
 * @param map The related map
 * @param countryCode Internationally recognized code of the target country (E.g.: "AT", "RO", etc.)
 * @param year The year for which the analysis is carried out
 * @param reversedImpact true/false specifying if the indicator has a negative impact
 *                       (e.g.: dropoutRatio, pollutionRatio, etc.)
 * @return The safety value
 */
const percentageSafetyMapDouble = (map: IStatsEntry, countryCode: string, year: number, reversedImpact: boolean): number => {
    const value = reversedImpact
        ? percentageReverseRatio(map[countryCode][year])
        : map[countryCode][year];

    return percentageSafetyDouble(value);
};

/**
 * Get the differences between 100% and the current ratio.<br/>
 * E.g.: Dropout Ratio = 7%   =>   Graduating Ratio = 100% - 7% = 93%
 *
 * QoLI Framework equivalence:<br/>
 *  - MathUtils.percentageReverseRatio(Map<String, Number> map, String key)
 *  - MathUtils.percentageSafetyDouble(Map<String, Number> map, String key, boolean reversedImpact)
 *
 * @param value The percentage value
 * @return The reversed ratio
 */
const percentageReverseRatio = (value: number | undefined = 0) => {
    return 100 - value;
};

export {
    PERCENTAGE_MIN_VALUE,
    PERCENTAGE_SAFETY_THRESHOLD,
    percentageSafetyDouble,
    percentageSafetyMapDouble,
    percentageReverseRatio
};
