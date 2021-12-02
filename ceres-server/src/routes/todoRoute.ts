import express from 'express';
import controller from '../controllers/todoController';

const router = express.Router();

router.get('', controller.getToDoStatus);

export = router;
