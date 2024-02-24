import {readJsonDimension, readJsonIndicators} from '#src/commons/file.utils.ts';
import {percentageSafetyMapDouble} from '#src/aggregator/stats.math.ts';
import {DIMENSIONS, INDICATORS} from '#src/config/preparedDataset.const.ts';
import {GEO_TYPE} from '#src/commons/file.utils.ts';

export const VALID_DIMENSIONS = Object.values(DIMENSIONS);

export class Stats {
    static aggregateQoliScore = async (
        aggrs: string[] | undefined,
        countryCode: string,
        year: number,
        geoType: GEO_TYPE | undefined = GEO_TYPE.COUNTRIES
    ) => {
        const scores = Stats.aggregateQoliScoreByDimension(aggrs, countryCode, year, geoType);

        let aggrScore = 1;
        let counter = 0;

        for (const [key, value] of Object.entries(scores)) {
            aggrScore += await value;
            counter++;
        }

        // Skip the aggregation and return the already calculated value
        // if "scores" contains only one dimension
        return counter === 1 ? aggrScore : Math.log(aggrScore);
    };

    static aggregateQoliScoreByDimension = (
        aggrs: string[] | undefined,
        countryCode: string,
        year: number,
        geoType: GEO_TYPE | undefined = GEO_TYPE.COUNTRIES
    ) => {
        if (!aggrs?.length) {
            return {};
        }

        return VALID_DIMENSIONS.reduce((acc, dimension) => {
            const indicators = aggrs.filter(aggr => aggr.startsWith(`${dimension}`));
            if (!indicators.length) {
                return acc;
            }

            const validIndicators = Object.values(INDICATORS[dimension]).map(indicator => `${dimension}:${indicator}`);
            acc[dimension] = Stats.getDimensionScore(validIndicators, dimension, indicators, countryCode, year, geoType);

            return acc;
        }, {} as { [key: string]: any });
    };

    static getDimensionScore = async (validIndicators: string[], dimension: string, indicators: string[], countryCode: string, year: number, geoType?: GEO_TYPE) => {
        // Skip calculating the score for the whole dimension but extract it directly
        // form the already calculated scores (E.g.: indicators = ["environment"]
        if (isCompleteDimension(validIndicators, dimension, indicators)) {
            const promises = readJsonDimension(dimension, geoType);
            const results = await Promise.all(promises);

            return results[0].data[countryCode][year];
        }

        // Skip the aggregation and get the calculated value of the selected aggregator if the user
        // selected only a single indicator (E.g.: indicators = ["environment:noisePollutionRatio"])
        if (indicators.length === 1) {
            const promises = readJsonIndicators(dimension, indicators, geoType);
            const results = await Promise.all(promises);

            return results[0].data[countryCode][year];
        }

        // Throw an error if one of the indicator is not valid
        if (!areValidAggregators(validIndicators, indicators)) {
            throw new Error('One or more aggregators are not valid.');
        }

        const promises = readJsonIndicators(dimension, indicators, geoType);
        const results = await Promise.all(promises);

        const product = results.reduce((acc: number, result) => {
            const indicatorValue = percentageSafetyMapDouble(result.data, countryCode, year, result.reversed);
            return acc * indicatorValue;
        }, 1);

        return Math.log(product);
    };
}

const isCompleteDimension = (validAggregators: string[], parent: string, aggregators: string[]) => {
    return isDimensionAggregator(parent, aggregators) || areCompleteValidAggregators(validAggregators, parent, aggregators);
};

// Check if the list of target "aggregators" contains only the parent name
// E.g.:
//  - valid list: ["environment"]
//  - invalid list: ["environment:noisePollutionRatio"]
const isDimensionAggregator = (parent: string, aggregators: string[]) => {
    return aggregators.length === 1 && aggregators[0] === parent;
};

// Check if the list of valid aggregators is the same with the list of target "aggregators"
// E.g.:
//  - valid list: ["environment:noisePollutionRatio", "environment:pm2_5PollutionRatio", "environment:pm10PollutionRatio", "environment:pollutionRatio", "environment:waterSupplyRatio"]
//  - invalid list: ["environment:noisePollutionRatio", "environment:pm2_5PollutionRatio"]
const areCompleteValidAggregators = (validAggregators: string[], parent: string, aggregators: string[]): boolean => {
    return validAggregators.every(validAggregator => aggregators.includes(validAggregator));
};

// Check if all "aggregators" are valid (are part of the validAggregators list)
// E.g.:
//  - valid list: ["environment:noisePollutionRatio", "environment:pm10PollutionRatio"]
//  - invalid list: ["environment:noisePollutionRatio", "environment:pm10PollutionRatio", "environment:test"]
const areValidAggregators = (validAggregators: string[], aggregators: string[]): boolean => {
    return aggregators.every(aggregator => validAggregators.includes(aggregator));
};
