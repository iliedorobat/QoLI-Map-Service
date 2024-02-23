import {readJsonDimension, readJsonIndicators} from '#src/commons/file.utils.ts';
import {percentageSafetyMapDouble} from '#src/aggregator/stats.math.ts';
import {DIMENSIONS, INDICATORS} from '#src/config/preparedDataset.const.ts';
import {FORMAT, GEO_TYPE} from '#src/commons/file.utils.ts';

export const VALID_DIMENSIONS = Object.values(DIMENSIONS);

export class Stats {
    // TODO:
    static aggregateQoliScore = async (
        aggrs: string[] | undefined,
        countryCode: string,
        year: number,
        geoType: GEO_TYPE | undefined = GEO_TYPE.COUNTRIES,
        format: FORMAT | undefined = FORMAT.JSON
    ) => {
        console.log(aggrs, countryCode, year, geoType, format);

        // aggrs && VALID_DIMENSIONS.forEach(dimension => {
        //     const indicators = aggrs.filter(aggr => aggr.startsWith(dimension));
        //     const validIndicators = Object.values(INDICATORS[dimension]);
        //
        //     const score = Stats.getDimensionScore(validIndicators, dimension, indicators, countryCode, year, geoType);
        //     console.log('forEach:', dimension, score);
        // });

        const dimension = DIMENSIONS.ENVIRONMENT;
        const indicators = aggrs?.filter(aggr => aggr.startsWith(dimension)) || [];
        const validIndicators = Object.values(INDICATORS[dimension]).map(indicator => `${dimension}:${indicator}`);
        const score = await Stats.getDimensionScore(validIndicators, dimension, indicators, countryCode, year, geoType);
        console.log('score:', score);
    };

    static getDimensionScore = async (validIndicators: string[], dimension: string, indicators: string[], countryCode: string, year: number, geoType?: GEO_TYPE) => {
        // Skip calculating the score for the whole dimension but extract it
        // directly form the already calculated scores
        if (isCompleteDimension(validIndicators, dimension, indicators)) {
            const promises = await readJsonDimension(dimension, geoType);
            const results = await Promise.all(promises);

            return results[0].data[countryCode][year];
        }

        // Throw an error if one of the indicator is not valid
        if (!areValidAggregators(validIndicators, indicators)) {
            throw new Error('One or more aggregators are not valid.');
        }

        const promises = await readJsonIndicators(dimension, indicators, geoType);
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
