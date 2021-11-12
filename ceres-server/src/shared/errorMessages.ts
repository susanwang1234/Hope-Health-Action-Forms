function negativeOrNanInputError(url: string) {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
}

function dneError(entity: string, errorMessage: string) {
  return { error: `${entity} ${errorMessage}` };
}

// TODO: Generalize these better so they can be used for more controllers
const caseStudyNegativeOrNanInputError = negativeOrNanInputError('/case-studies/:id');
const caseStudyDNEError = dneError('Case Study', 'does not exist');
const caseStudyQuestionsNegativeOrNanInputError = negativeOrNanInputError('/case-study-questions/:id');
const caseStudyQuestionsDNEError = dneError('Case Study Questions', 'do not exist for this id');
const caseStudyResponsesNegativeOrNanInputError = negativeOrNanInputError('/case-study-responses/:caseStudyId');
const departmentNegativeOrNanInputError = negativeOrNanInputError('/department-form/:id');
const departmentDNEError = dneError('Department', 'does not exist or its form structure is empty');
const formNegativeOrNanInputError = negativeOrNanInputError('/form-responses/:formId');
const formDNEError = dneError('Form', 'does not exist or its responses are empty');
const userNegativeOrNanInputError = negativeOrNanInputError('/user/:id');
const userDNEError = dneError('User', 'does not exist');
const pageNotFoundError = { message: 'not found' };

export {
  caseStudyNegativeOrNanInputError,
  caseStudyDNEError,
  caseStudyQuestionsNegativeOrNanInputError,
  caseStudyQuestionsDNEError,
  caseStudyResponsesNegativeOrNanInputError,
  departmentNegativeOrNanInputError,
  departmentDNEError,
  formNegativeOrNanInputError,
  formDNEError,
  userNegativeOrNanInputError,
  userDNEError,
  pageNotFoundError
};
