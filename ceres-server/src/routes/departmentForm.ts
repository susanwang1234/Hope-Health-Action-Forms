import express from 'express';
import controller from '../controllers/departmentForm';

const router = express.Router();

router.get('/:id', controller.getDepartmentFormById);

export = router;
