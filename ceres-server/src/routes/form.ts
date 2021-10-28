import express from 'express';
import controller from '../controllers/form';

const router = express.Router();

router.get('/:department_id', controller.createNewForm);

export = router;
