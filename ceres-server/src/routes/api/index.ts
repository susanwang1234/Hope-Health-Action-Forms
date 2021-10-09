import { Router } from 'express';
import secretRouter from './superSecretEndpoint';

const router = Router();

router.use('/secrets', secretRouter);

export default router;
