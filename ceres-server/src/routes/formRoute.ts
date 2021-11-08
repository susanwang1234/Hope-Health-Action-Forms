import express from 'express';
import controller from '../controllers/formController';

const router = express.Router();

router.post('', controller.createNewForm);
router.get('/:departmentId', controller.getAllFormsByDepartmentId);

export = router;
