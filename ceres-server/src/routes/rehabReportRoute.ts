import express from 'express';
import controller from '../controllers/rehabReportController';

const router = express.Router();

router.post('/create/rehab-report', controller.createRehabReport);
router.put('/edit/rehab-report', controller.editRehabReport);
router.delete('/delete-all/rehab-report', controller.deleteAllRehabReport);
router.delete('/delete/rehab-report', controller.deleteRehabReport);
router.get('/get/rehab-report', controller.getAllRehabReport);

export = router;
