import {Request, Response, Router} from 'express';
import {AREA, DATASET_TYPE, downloadDatasets} from './fetchUtils.js';

const router = Router();

router.get('', (req: Request, res: Response) => {
    res.send('OK');
});

router.get('/dataset/fetch', async (req: Request, res: Response) => {
    const {datasetType = DATASET_TYPE.RAW, area = AREA.COUNTRIES} = req.query;

    try {
        console.log('Starting downloading raw data...');
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

export default router;
