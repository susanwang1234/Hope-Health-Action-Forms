import express from 'express';
import controller from '../controllers/caseStudyResponsesController';

const router = express.Router();

router.post('', controller.addCaseStudyResponse);

export = router;
