import express from 'express';
import controller from '../controllers/caseStudyQuestionsController';

const router = express.Router();

router.get('/:caseStudyTypeId', controller.getCaseStudyQuestionsById);

export = router;
