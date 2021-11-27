import express from 'express';
import controller from '../controllers/formResponsesController';

const router = express.Router();

router.get('/:formId', controller.getFormResponsesByFormId);
router.get('/latest/:departmentId', controller.getFormResponsesForLatestFormByDepartmentId);
router.post('/:formId', controller.addNewFormResponses);
router.put('/:formId', controller.editFormResponsesByFormId);

export = router;
