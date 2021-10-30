import express from 'express';
import authenticationController from '../controllers/authentication';

const router = express.Router();

router.post('/login', authenticationController.login);

export default router;
