import express from 'express';
import controller from '../controllers/emailController';

const router = express.Router();

router.get('', controller.getEmails);
router.post('', controller.createEmail);
router.put('/:id', controller.editEmailById);
router.delete('/:id', controller.deleteEmailById);

export = router;
