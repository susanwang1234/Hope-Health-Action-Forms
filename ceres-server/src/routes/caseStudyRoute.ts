import express from 'express';
import controller from '../controllers/caseStudyController';

const router = express.Router();

router.get('/:id', controller.getCaseStudyById);
router.post('', controller.addCaseStudy);

export = router;
