import express from 'express';
import controller from '../controllers/employeeOfTheMonthController';

const router = express.Router();

router.get('', controller.getEmployeeOfTheMonth);
router.put('/:id', controller.editEmployeeOfTheMonthById);

export = router;
