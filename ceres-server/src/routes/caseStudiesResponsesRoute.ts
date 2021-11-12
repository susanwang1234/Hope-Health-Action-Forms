import express from 'express';
import controller from '../controllers/caseStudyResponsesController';

const router = express.Router();

router.post('/:caseStudyId', controller.addCaseStudyResponsesByCaseStudyId);

export = router;
