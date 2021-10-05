import express from 'express';
import controller from '../controllers/rehabReport';

const router = express.Router();

router.post('/create/rehab_report', controller.createRehabReport);
router.delete('/delete_all/rehab_report', controller.deleteAllRehabReport);
router.delete('/delete/rehab_report', controller.deleteRehabReport);
router.get('/get/rehab_report', controller.getAllRehabReport);

export = router;
