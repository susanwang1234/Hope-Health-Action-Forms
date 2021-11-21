import { Router } from 'express';
import controller from '../controllers/messageBoardController';

const router = Router();

router.get('/', controller.getMessages);
router.use('/', controller.createNewMessage);

export = router;
