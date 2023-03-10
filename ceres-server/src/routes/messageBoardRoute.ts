import { Router } from 'express';
import controller from '../controllers/messageBoardController';

const router = Router();

router.get('/:departmentId', controller.getMessages);
router.post('/', controller.createNewMessage);

export = router;
