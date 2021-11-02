import express from 'express';
import controller from '../controllers/formResponsesController';

const router = express.Router();

router.post('/:formId', controller.addNewFormResponses);

export = router;
