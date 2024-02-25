import {Request, Response, Router} from 'express';
import {createRequire} from 'node:module';

import {calculateQoliScores} from '#src/stats/stats.ts';
import {DATASET_TYPE, downloadDatasets} from '../commons/fetch.utils.ts';
import {getClientConfig} from '#src/config/preparedDataset.utils.ts';

import {AREA} from '#src/commons/file.utils.ts';
import DATASET_CONFIG from '#src/config/preparedDataset.config.ts';
import {DIMENSIONS} from '#src/config/preparedDataset.const.ts';

const require = createRequire(import.meta.url);
const {JavaCaller} = require('java-caller');

const router = Router();

router.get('/stats', async (req: Request, res: Response) => {
    const {aggr, countryCode, year, area, format} = req.query;

    if (!aggr) {
        return res.status(500).send({error: 'Aggregation indicators are missing.'});
    }

    if (!year) {
        return res.status(500).send({error: 'Aggregation year is missing.'});
    }

    try {
        const aggrs = typeof aggr === 'string'
            ? [aggr as string]
            : aggr as string[];
        const countryCodes = typeof countryCode === 'string'
            ? [countryCode as string]
            : countryCode as string[];
        const years = Array.isArray(year)
            ? year.map(y => parseInt(y as string))
            : [parseInt(year as string)];

        const score = await calculateQoliScores(
            aggrs,
            countryCodes,
            years,
            area as AREA
        );

        res.send(score);
    } catch (error: any) {
        if (error?.code === 'ENOENT') {
            return res.status(500).send({error: 'Some of the aggregator names are wrong.'});
        }
        return res.status(500).send({error: error.message});
    }
});

router.get('/stats/name/dimensions', async (req: Request, res: Response) => {
    res.send(DATASET_CONFIG.qoli.aggregators);
});

router.get('/stats/name/indicators', async (req: Request, res: Response) => {
    const {dimensionName} = req.query;
    const indNames = [];

    if (!dimensionName || dimensionName === 'qoli') {
        for (const dimName of Object.values(DIMENSIONS)) {
            const names = DATASET_CONFIG.qoli.dimensions[dimName].aggregators
                .map((indName: string) => `${dimName}:${indName}`);
            indNames.push(...names);
        }
    }

    res.send(indNames);
});

router.get('/stats/dataset/config', async (req: Request, res: Response) => {
    res.send(getClientConfig());
});

router.get('/stats/dataset/collect', async (req: Request, res: Response) => {
    console.log('Starting downloading raw data...');
    const {datasetType, area} = req.query;

    try {
        await downloadDatasets(
            datasetType as DATASET_TYPE,
            area as AREA
        );
        console.log('Download complete!');
        res.send('Download complete!');
    } catch (error) {
        console.error('Something went wrong while downloading raw data.');
        res.status(500).send({error});
    }
});

router.get('/stats/dataset/prepare', async (req: Request, res: Response) => {
    console.log('Start data preparation...');

    try {
        const java = new JavaCaller({
            jar: 'libs/QoLI-Framework-1.2.jar',
            mainClass: 'app.java.Main'
        });
        const {status, stdout, sterr} = await java.run(['--calculate=true', '--calculateIndicators=true']);

        if (sterr) {
            console.error('Something went wrong while preparing QoLI scores.');
            return res.status(500).send({error: 'Execution failed'});
        }

        console.log('Data preparation has successfully finished!');
        res.send('Calculation complete!');
    } catch (error) {
        console.error('Something went wrong while preparing QoLI scores.');
        res.status(500).send({error});
    }
});

export default router;
