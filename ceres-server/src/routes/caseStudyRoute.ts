import express from 'express';
import controller from '../controllers/caseStudyController';

const router = express.Router();

router.get('/:caseStudyId', controller.getCaseStudyById);
router.post('', controller.addCaseStudy);

export = router;
