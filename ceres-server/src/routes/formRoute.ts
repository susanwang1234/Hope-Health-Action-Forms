import express from 'express';
import controller from '../controllers/formController';

const router = express.Router();

router.post('', controller.createNewForm);
router.put('/:id', controller.putFormById);
router.get('/:departmentId', controller.getAllFormsByDepartmentId);
router.get('/:formId/export-as-csv', controller.exportFormAsCsv);
router.get('/:formId/export-as-pdf', controller.exportFormAsPdf);

export = router;
