import express from 'express';
import controller from '../controllers/forgotPasswordController';
import { forgotPasswordValidation } from 'middlewares/forgot-password-validation.mw';

const router = express.Router();

router.post('', forgotPasswordValidation, controller.sendEmailToAdmin);

export = router;
