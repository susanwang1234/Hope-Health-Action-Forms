import { Router } from 'express';
import testRouter from './testEndpoint';

const router = Router();

router.use('/test', testRouter);

export default router;
