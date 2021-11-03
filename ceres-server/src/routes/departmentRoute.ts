import express from 'express';
import controller from '../controllers/departmentController';

const router = express.Router();

router.get('/:id', controller.departmentPage);
router.get('', controller.getDepartments);

export = router;
