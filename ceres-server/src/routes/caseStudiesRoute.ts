import express from 'express';
import controller from '../controllers/caseStudiesController';

const router = express.Router();

router.get('', controller.getCaseStudies);

export = router;
