import express from 'express';
import controller from '../controllers/department';

const router = express.Router();

router.get('/:id', controller.departmentPage);

export = router;
