import express from 'express';
import controller from '../controllers/dataVizController';

const router = express.Router();

router.get('/:departmentId', controller.getDataForPlots);

export = router;
