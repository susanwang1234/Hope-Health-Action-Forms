import express from 'express';
import controller from '../controllers/form';

const router = express.Router();

router.post('', controller.createNewForm);

export = router;
