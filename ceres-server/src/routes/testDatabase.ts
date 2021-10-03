import express from 'express';
import controller from '../controllers/testDatabase';

const router = express.Router();

router.post('/create/testDatabase', controller.createTestDatabase);
router.get('/get/testDatabase', controller.getAllTestDatabase);

export = router;