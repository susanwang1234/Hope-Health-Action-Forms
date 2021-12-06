const negativeOrNanInputError = (url: string) => {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
};

const dneError = (entity: string, errorMessage: string) => {
  return { error: `${entity} ${errorMessage}` };
};

const invalidExtension = (entity: string, extensionTypes: string) => {
  return { error: `${entity} must be of extension types ${extensionTypes}` };
};

// TODO: Generalize these better so they can be used for more controllers
const caseStudiesNegativeOrNanInputError = negativeOrNanInputError('/case-studies/:caseStudyTypeId');
const caseStudiesDNEError = dneError('Case Studies', 'do not exist for this type of case study');
const caseStudyNegativeOrNanInputError = negativeOrNanInputError('/case-study/:caseStudyId');
const caseStudyDNEError = dneError('Case Study', 'does not exist');
const caseStudyQuestionsNegativeOrNanInputError = negativeOrNanInputError('/case-study-questions/:caseStudyTypeid');
const caseStudyQuestionsDNEError = dneError('Case Study Questions', 'do not exist for this id');
const caseStudyResponsesNegativeOrNanInputError = negativeOrNanInputError('/case-study-responses/:caseStudyId');
const departmentNegativeOrNanInputError = negativeOrNanInputError('/department-form/:id');
const messageDepartmentNegativeOrNanInputError = negativeOrNanInputError('/messages/:departmentId');
const departmentDNEError = dneError('Department', 'does not exist or its form structure is empty');
const formNegativeOrNanInputError = negativeOrNanInputError('/form/:id');
const formDepartmentNegativeOrNanInputError = negativeOrNanInputError('/form/:departmentId');
const formResponseNegativeOrNanInputError = negativeOrNanInputError('/form-responses/:formId');
const formDNEError = dneError('Form', 'does not exist or its responses are empty');
const userNegativeOrNanInputError = negativeOrNanInputError('/user/:id');
const userDNEError = dneError('User', 'does not exist');
const pageNotFoundError = { message: 'not found' };
const imageNegativeOrNanInputError = negativeOrNanInputError('/image/:imageId');
const imageDNEError = dneError('Image', 'does not exist');
const imageMimetypeError = invalidExtension('Image', 'png, jpg, or jpeg');
const employeeOfTheMonthNegativeOrNanInputError = negativeOrNanInputError('/employee-of-the-month/:id');
const employeeOfTheMonthDNEError = dneError('Employee of the Month', 'does not exist');
const emailNegativeOrNanInputError = negativeOrNanInputError('/email/:id');
const emailDNEError = dneError('Email', 'does not exist');

export {
  caseStudiesNegativeOrNanInputError,
  caseStudiesDNEError,
  caseStudyNegativeOrNanInputError,
  caseStudyDNEError,
  caseStudyQuestionsNegativeOrNanInputError,
  caseStudyQuestionsDNEError,
  caseStudyResponsesNegativeOrNanInputError,
  departmentNegativeOrNanInputError,
  messageDepartmentNegativeOrNanInputError,
  departmentDNEError,
  formNegativeOrNanInputError,
  formDepartmentNegativeOrNanInputError,
  formResponseNegativeOrNanInputError,
  formDNEError,
  userNegativeOrNanInputError,
  userDNEError,
  pageNotFoundError,
  imageNegativeOrNanInputError,
  imageDNEError,
  imageMimetypeError,
  employeeOfTheMonthNegativeOrNanInputError,
  employeeOfTheMonthDNEError,
  emailNegativeOrNanInputError,
  emailDNEError
};
