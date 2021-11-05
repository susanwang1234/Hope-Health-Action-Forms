function negativeOrNanInputError(url: string) {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
}

function dneError(entity: string, errorMessage: string) {
  return { error: `${entity} ${errorMessage}` };
}

const caseStudyNegativeOrNanInputError = negativeOrNanInputError('/case-studies/:id');
const caseStudyDNEError = dneError('Case Study', 'does not exist');
const departmentNegativeOrNanInputError = negativeOrNanInputError('/department-form/:id');
const departmentDNEError = dneError('Department', 'does not exist or its form structure is empty');
const userNegativeOrNanInputError = negativeOrNanInputError('/user/:id');
const userDNEError = dneError('User', 'does not exist');
const pageNotFoundError = { message: 'not found' };

export { caseStudyNegativeOrNanInputError, caseStudyDNEError, departmentNegativeOrNanInputError, departmentDNEError, userNegativeOrNanInputError, userDNEError, pageNotFoundError };
