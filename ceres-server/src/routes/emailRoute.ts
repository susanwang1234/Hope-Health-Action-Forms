import express from 'express';
import controller from '../controllers/emailController';
import { emailValidation } from 'middlewares/email-validation.mw';

const router = express.Router();

router.get('', controller.getEmails);
router.post('', emailValidation, controller.createEmail);
router.put('/:id', emailValidation, controller.editEmailById);
router.delete('/:id', controller.deleteEmailById);

export = router;
