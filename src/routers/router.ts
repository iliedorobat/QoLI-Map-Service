import {Request, Response, Router} from 'express';
import {createRequire} from 'node:module';

import {AREA, DATASET_TYPE, downloadDatasets} from './fetch.utils.ts';
import {getClientConfig} from '#src/routers/dataset.utils.ts';
import {Stats} from '#src/aggregator/Stats.ts';
import {GEO_TYPE} from '#src/commons/file.utils.ts';
import {FORMAT} from 'src/commons/file.utils.ts';

const require = createRequire(import.meta.url);
const datasetConfig = require('#src/config/preparedDataset.config.json');
const {JavaCaller} = require('java-caller');

const router = Router();

router.get('', async (req: Request, res: Response) => {
    res.send('OK');
});

router.get('/stats', async (req: Request, res: Response) => {
    const {aggr, countryCode, year, geoType, format} = req.query;
    const aggrs = Array.isArray(aggr) ? aggr : [aggr];

    await Stats.aggregateQoliScore(
        aggrs as string[] | undefined,
        countryCode as string,
        parseInt(year as string),
        geoType as GEO_TYPE,
        format as FORMAT
    );

    res.send('OK');
});

router.get('/stats/config', async (req: Request, res: Response) => {
    res.send(getClientConfig());
});

router.get('/stats/name/dimensions', async (req: Request, res: Response) => {
    res.send(datasetConfig.qoli.aggregators);
});

router.get('/stats/name/indicators', async (req: Request, res: Response) => {
    const {dimensionName} = req.query;

    if (!dimensionName || dimensionName === 'qoli') {
        const indNames = [];

        for (const dimName of datasetConfig.qoli.aggregators) {
            const names = datasetConfig.qoli.dimensions[dimName].aggregators
                .map((indName: string) => `${dimName}:${indName}`);
            indNames.push(...names);
        }

        res.send(indNames);
    }
});

router.get('/stats/collect', async (req: Request, res: Response) => {
    console.log('Starting downloading raw data...');
    const {datasetType = DATASET_TYPE.RAW, area = AREA.COUNTRIES} = req.query;

    try {
        await downloadDatasets(
            datasetType as DATASET_TYPE,
            area as AREA
        );
        console.log('Download complete!');
        res.send('Download complete!');
    } catch (error) {
        res.status(500).send({error});
    }
});

router.get('/stats/prepare', async (req: Request, res: Response) => {
    console.log('Start data preparation...');
    const java = new JavaCaller({
        jar: 'libs/QoLI-Framework-1.2.jar',
        mainClass: 'app.java.Main'
    });
    const {status, stdout, sterr} = await java.run(['--calculate=true', '--calculateIndicators=true']);
    if (sterr) {
        console.log('Data preparation has successfully finished!');
        res.status(500).send({error: 'Execution failed'});
    }
    res.send('Calculation complete!');
});

export default router;
