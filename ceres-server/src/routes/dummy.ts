import express from 'express';
import controller from '../controllers/dummy';

const router = express.Router();

router.post('/create/dummy', controller.createDummy);
router.delete('/delete/dummy', controller.deleteAllDummy);
router.get('/get/dummy', controller.getAllDummy);

export = router;
