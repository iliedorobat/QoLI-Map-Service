import {Request, Response, Router} from 'express';
import {createRequire} from 'node:module';
import fs from 'fs';
import path from 'path';

import {calculateQoliScores} from '#src/stats/stats.ts';
import {downloadDatasets} from '../commons/fetch.utils.ts';
import {getClientConfig} from '#src/config/preparedDataset.utils.ts';

import {AREA} from '#src/commons/file.utils.ts';
import DATASET_CONFIG from '#src/config/preparedDataset.config.ts';
import {DIMENSIONS} from '#src/config/preparedDataset.const.ts';
import {HOST} from '#src/app.const.js';

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

    try {
        await downloadDatasets();
        console.log('Download complete!');
        res.send('Download complete!');
    } catch (error) {
        if (error instanceof Error) {
            // @ts-ignore
            const {code = 500, message} = error;
            console.error(message);
            res.status(code).send({error: message});
        } else {
            const message = 'Something went wrong while downloading raw data.';
            console.error(message);
            res.status(500).send({error: message});
        }
    }
});

router.get('/stats/dataset/prepare', async (req: Request, res: Response) => {
    console.log('Start data preparation...');

    const dirPath = path.resolve('files', 'raw');

    if (!fs.existsSync(dirPath)) {
        const response = await fetch(`${HOST}/stats/dataset/collect`);

        if (response.status === 404) {
            const message = await response.text();
            return res.status(response.status).send(message);
        }
    }

    try {
        const java = new JavaCaller({
            jar: 'libs/QoLI-Framework-2.0.jar',
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
