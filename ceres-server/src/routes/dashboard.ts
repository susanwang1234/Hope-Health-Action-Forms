import express from 'express';
import controller from '../controllers/dashboard';

const router = express.Router();

router.get('/dashboard', controller.dashboardHealthCheck);

export = router;
