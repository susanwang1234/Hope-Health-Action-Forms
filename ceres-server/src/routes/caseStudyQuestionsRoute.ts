import express from 'express';
import controller from '../controllers/caseStudyQuestionsController';

const router = express.Router();

router.get('/:id', controller.getCaseStudyQuestionsById);

export = router;
