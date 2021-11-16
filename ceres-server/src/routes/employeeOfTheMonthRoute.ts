import express from 'express';
import controller from '../controllers/employeeOfTheMonthController';

const router = express.Router();

router.get('', controller.getEmployeeOfTheMonth);

export = router;
