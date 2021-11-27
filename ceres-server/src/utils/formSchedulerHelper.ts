import { isInvalidInput } from 'controllers/controllerTools/isInvalidInput';
import { ScheduledForms } from 'db/models/schedulerModel';
import logging from '../config/logging';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Form Scheduler Control';
const NAMESPACE_FORM = 'Form';
const NAMESPACE_FORM_RESPONSE = 'FormResponse';
const NAMESPACE_DEPARTMENT = 'Department';
const NAMESPACE_DEPARTMENT_QUESTIONS = 'DepartmentQuestion';
const ERROR_CODE = -1;

const formTemplate = (departmentId: number) => {
  return { departmentId: departmentId, isSubmitted: false };
};

const formResponseTemplate = (departmentQuestionId: number, formId: number) => {
  return { departmentQuestionId: departmentQuestionId, formId: formId, response: '' };
};

const fillInFormResponseTemplate = (retrievedDepartmentQuestionIds: any, formId: number) => {
  let formResponses: any[] = new Array();
  retrievedDepartmentQuestionIds.forEach((item: any) => {
    formResponses.push(formResponseTemplate(item.id, formId));
  });
  return formResponses;
};

const createMonthlyForm = async (departmentId: number) => {
  try {
    if (isInvalidInput(departmentId)) {
      logging.error(NAMESPACE_FORM, 'This department does not exist');
      return ERROR_CODE;
    }
    const createdForm = await Knex.insert(formTemplate(departmentId)).into(NAMESPACE_FORM);
    const retrievedForm = await Knex.select('*').from(NAMESPACE_FORM).where('id', '=', createdForm);
    logging.info(NAMESPACE_FORM, `CREATED ${NAMESPACE_FORM.toUpperCase()}`, retrievedForm);
    return createdForm[0];
  } catch (error: any) {
    logging.error(NAMESPACE_FORM, error.message, error);
  }
};

const createMonthlyFormResponses = async (departmentId: number, formId: number) => {
  try {
    if (isInvalidInput(departmentId)) {
      logging.error(NAMESPACE_DEPARTMENT, 'This department does not exist');
      return ERROR_CODE;
    }
    if (isInvalidInput(formId)) {
      logging.error(NAMESPACE_FORM, 'This form does not exist');
      return ERROR_CODE;
    }
    const retrievedDepartmentQuestionIds = await Knex.select('id').from(NAMESPACE_DEPARTMENT_QUESTIONS).where('departmentId', departmentId);
    if (!retrievedDepartmentQuestionIds.length) {
      logging.error(NAMESPACE_DEPARTMENT_QUESTIONS, 'This department has no questions');
      return ERROR_CODE;
    }
    await Knex.insert(fillInFormResponseTemplate(retrievedDepartmentQuestionIds, formId)).into(NAMESPACE_FORM_RESPONSE);
    const retrievedFormResponses = await Knex.select('*').from(NAMESPACE_FORM_RESPONSE).where('formId', formId);
    logging.info(NAMESPACE_FORM_RESPONSE, `CREATED ${NAMESPACE_FORM_RESPONSE.toUpperCase()}S`, retrievedFormResponses);
    return retrievedDepartmentQuestionIds.length;
  } catch (error: any) {
    logging.error(NAMESPACE_FORM_RESPONSE, error.message, error);
  }
};

const createMonthlyForms = async () => {
  logging.info(NAMESPACE, 'CREATING MONTHLY FORMS AND FORM RESPONSES FOR EACH DEPARTMENT');
  let listScheduledForms: ScheduledForms[] = [];
  let currScheduledForm: ScheduledForms;
  try {
    const numDepartments = await Knex(NAMESPACE_DEPARTMENT).count('id AS total').first();
    for (let departmentId = 2; departmentId <= numDepartments.total; departmentId++) {
      currScheduledForm = {
        departmentId: departmentId,
        formId: 0,
        formResponsesCreated: 0
      };
      try {
        currScheduledForm.formId = await createMonthlyForm(departmentId);
        currScheduledForm.formResponsesCreated = await createMonthlyFormResponses(departmentId, currScheduledForm.formId);
        listScheduledForms.push(currScheduledForm);
      } catch (error: any) {
        logging.error(NAMESPACE, error.message, error);
        return;
      }
    }
    logging.info(NAMESPACE, 'CREATED THE FOLLOWING FORMS AND FORM RESPONSES FOR THIS MONTH', listScheduledForms);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    return;
  }
};

export default createMonthlyForms;
