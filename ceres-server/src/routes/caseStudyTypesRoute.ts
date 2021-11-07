import express from 'express';
import controller from '../controllers/caseStudyTypesController';

const router = express.Router();

router.get('', controller.getCaseStudyTypes);

export = router;
