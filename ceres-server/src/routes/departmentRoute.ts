import express from 'express';
import controller from '../controllers/departmentController';

const router = express.Router();

router.get('', controller.getDepartments);
router.get('/:departmentId', controller.getDepartmentById);

export = router;
