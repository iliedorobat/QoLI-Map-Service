import {Request, Response, Router} from 'express';
import {AREA, DATASET_TYPE, downloadDatasets} from './fetch.utils.js';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const {JavaCaller} = require('java-caller');

const router = Router();

router.get('', (req: Request, res: Response) => {
    res.send('OK');
});

router.get('/dataset/fetch', async (req: Request, res: Response) => {
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

router.get('/dataset/calculate', async (req: Request, res: Response) => {
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
