import fetch from 'node-fetch';
import {createRequire} from 'node:module';

import {AREA, FORMAT, writeFileSync} from '#src/commons/file.utils.ts';
import {CustomError} from '#src/commons/CustomError.js';
import {IQoLI} from '#src/config/preparedDataset.types.js';

const require = createRequire(import.meta.url);
const DATASET_CONFIG = require('#src/config/rawDataset.config.json');

const SOURCE_LOCATION = 'https://raw.githubusercontent.com/iliedorobat/QoLI-Framework/master/files/raw';
const TARGET_LOCATION = 'files/raw';

export interface IDatasetConfig {
    filename: string,
    extension: FORMAT,
    destination: string,
    source: string
}

const downloadDatasets = async () => {
    const urls: IDatasetConfig[] = getRawDatasetUrls();

    for await (const url of urls) {
        const response = await fetch(url.source);
        if (response.status === 404) {
            throw new CustomError(`Error: ${url.source} could not be found.`, 404);
        }

        let content = '';

        if (url.extension === 'json') {
            const jsonContent = await response.json();
            content = JSON.stringify(jsonContent);
        } else if (url.extension === 'csv') {
            content = await response.text();
        }

        await writeFileSync(url.destination, content);
        }
};

const getRawDatasetUrls = () => {
    const urls: IDatasetConfig[] = [];
    const {dimensions} = DATASET_CONFIG.qoli as IQoLI;

    for (const [dimensionName, dimension] of Object.entries(dimensions)) {
        for (const [indicatorName, indicator] of Object.entries(dimension.indicators)) {
            const {filename, extension} = indicator;
            pushUrlMeta(urls, dimensionName, filename, extension);
        }
    }

    return urls;
};

const pushUrlMeta = (urls: IDatasetConfig[], dimensionName: string | undefined, filename: string, extension: string) => {
    const url = getUrlMeta(dimensionName, filename, extension);
    urls.push(url);
};

const getUrlMeta = (dimensionName: string | undefined, filename: string, extension: string) => {
    const getPath = (locationPath: string) => {
        const dirPath = [locationPath, FORMAT.JSON, AREA.COUNTRY, dimensionName].join('/');
        return `${dirPath}/${filename}.${extension}`;
    };

    return {
        filename: dimensionName ? `${dimensionName}/${filename}` : filename,
        extension,
        destination: getPath(TARGET_LOCATION),
        source: getPath(SOURCE_LOCATION)
    } as IDatasetConfig;
};

export {
    downloadDatasets
};
