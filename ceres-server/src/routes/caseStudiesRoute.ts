import express from 'express';
import controller from '../controllers/caseStudiesController';

const router = express.Router();

router.get('/:id', controller.getCaseStudies);

export = router;
