import fetch from 'node-fetch';
import {createRequire} from 'node:module';
import {AREA, FORMAT, writeFileSync} from '#src/commons/file.utils.ts';

const require = createRequire(import.meta.url);
const DATASET_CONFIG = require('#src/config/rawDataset.config.json');

const SOURCE_LOCATION = 'https://raw.githubusercontent.com/iliedorobat/QoLI-Framework/master/files';
const TARGET_LOCATION = 'files';

export enum DATASET_TYPE {
    RAW = 'raw',
    PREPARED = 'prepared'
}

export interface IDatasetConfig {
    filename: string,
    extension: FORMAT,
    destination: string,
    source: string
}

const downloadDatasets = async (datasetType = DATASET_TYPE.RAW, area = AREA.COUNTRY) => {
    const urls: IDatasetConfig[] = getDatasetsUrls(datasetType, area);

    for await (const url of urls) {
        const response = await fetch(url.source);
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

const getDatasetsUrls = (datasetType: DATASET_TYPE, area: AREA) => {
    if (!Object.values(DATASET_TYPE).includes(datasetType)) {
        throw new Error(`datasetType=${datasetType} is not supported`);
    }

    if (!Object.values(AREA).includes(area)) {
        throw new Error(`area=${area} is not supported`);
    }

    const urls: IDatasetConfig[] = [];

    const {filename, extension, dimensions} = DATASET_CONFIG.qoli;
    const destinationUrl = `${TARGET_LOCATION}/${datasetType}/json/${area}`;
    const sourceUrl = `${SOURCE_LOCATION}/${datasetType}/json/${area}`;

    if (datasetType === DATASET_TYPE.PREPARED) {
        urls.push({
            filename,
            extension,
            destination: `${destinationUrl}/${filename}.${extension}`,
            source: `${sourceUrl}/${filename}.${extension}`
        });
    }

    for (const dimensionName in dimensions) {
        const {filename, extension, indicators} = dimensions[dimensionName];

        if (datasetType === DATASET_TYPE.PREPARED) {
            urls.push({
                filename: `${dimensionName}/${filename}`,
                extension,
                destination: `${destinationUrl}/${dimensionName}/${filename}.${extension}`,
                source: `${sourceUrl}/${dimensionName}/${filename}.${extension}`
            });
        }

        for (const indicatorName in indicators) {
            const indicator = indicators[indicatorName];
            const {filename, extension} = indicator;

            if (filename && extension) {
                urls.push({
                    filename: `${dimensionName}/${filename}`,
                    extension,
                    destination: `${destinationUrl}/${dimensionName}/${filename}.${extension}`,
                    source: `${sourceUrl}/${dimensionName}/${filename}.${extension}`
                });
            }
        }
    }

    return urls;
};

export {
    downloadDatasets
};
