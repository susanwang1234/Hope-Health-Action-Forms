import express from 'express';
import controller from '../controllers/dashboardController';

const router = express.Router();

router.get('/dashboard', controller.dashboardHealthCheck);

export = router;
