import express from 'express';
import controller from '../controllers/formResponsesController';

const router = express.Router();

router.get('/:formId', controller.getFormResponsesByFormId);
router.post('/:formId', controller.addNewFormResponses);
router.put('/:formId', controller.editFormResponsesByFormId);

export = router;
