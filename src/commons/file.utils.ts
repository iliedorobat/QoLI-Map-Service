import path from 'path';
import fs from 'fs';

import DATASET_CONFIG from '#src/config/preparedDataset.config.ts';

export enum AREA {
    COUNTRY = 'countries',
    REGION = 'regions',
}

export enum FORMAT {
    CSV = 'csv',
    JSON = 'json',
}

// E.g.:
//  - parentName: education
//  - aggregators: [digitalSkillsRatio, pupilsRatio]
const getMultiplePaths = (parentName: string, aggregators: string[], area?: AREA, format?: FORMAT) => {
    const paths: string[] = [];

    aggregators.forEach(aggregator => {
        const path = getSinglePath(parentName, aggregator, area, format);
        path && paths.push(path);
    });

    return paths;
};

// E.g.:
//  - parentName: education
//  - aggregator: digitalSkillsRatio
const getSinglePath = (parentName: string, aggregator: string | undefined, area: AREA = AREA.COUNTRY, format: FORMAT = FORMAT.JSON) => {
    if (!parentName) {
        return;
    }

    const mainUrl = `./files/prepared/${format}/${area}`;
    const url = aggregator
        ? `${mainUrl}/${parentName}/${aggregator}.${format}`
        : `${mainUrl}/${parentName}.${format}`;

    return path.resolve(url);
};

const readJsonDimension = (dimension: string, area?: AREA): Promise<any>[] => {
    const filePath = getSinglePath(dimension, undefined, area, FORMAT.JSON);
    const callback = (dimension: string, data: any) => {
        return {
            parentName: 'qoli',
            aggregator: dimension,
            data
        };
    };

    return [
        readJsonFileSync(filePath, (data: any) => callback(dimension, data))
    ];
};

const readJsonIndicators = (parentName: string, aggregators: string[], area: AREA): Promise<any>[] => {
    // @ts-ignore
    const indicatorsConfig = DATASET_CONFIG.qoli.dimensions[parentName]?.indicators;
    const callback = (aggregator: string, data: any) => {
        return {
            parentName,
            aggregator,
            reversed: indicatorsConfig[aggregator].reversed,
            data
        };
    };

    return aggregators.map(aggregator => {
        const [dimension, indicator] = aggregator.split(':');
        const filePath = getSinglePath(parentName, indicator, area, FORMAT.JSON);
        return readJsonFileSync(filePath, (data: any) => callback(indicator, data));
    });
};

const readJsonFileSync = async (filePath: string | undefined, callback: Function | undefined): Promise<any> => {
    if (!filePath || !filePath.endsWith('.json')) {
        throw new Error(`"${filePath}" is not a valid json file path.`);
    }

    try {
        const buffer = await fs.readFileSync(filePath);
        const data = buffer.toString();
        const json = JSON.parse(data);

        return  typeof callback === 'function'
            ? callback(json)
            : json;
    } catch (error) {
        throw error;
    }
};

const writeFileSync = async (destination: string, content: string) => {
    try {
        const dirPath = path.dirname(destination);

        // Create the directory if not exists
        if (!fs.existsSync(dirPath)) {
            await fs.mkdirSync(dirPath, { recursive: true });
        }

        await fs.writeFileSync(destination, content);
        console.log('Raw data has been successfully downloaded to', destination);
    } catch (error) {
        console.error(error);
    }
};

export {
    getMultiplePaths,
    getSinglePath,
    readJsonDimension,
    readJsonFileSync,
    readJsonIndicators,
    writeFileSync
};
