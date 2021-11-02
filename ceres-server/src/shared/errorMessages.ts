function negativeOrNanInputError(url: string) {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
}

function dneError(entity: string, errorMessage: string) {
  return { error: `${entity} ${errorMessage}` };
}

// TODO: Generalize these better so they can be used for more controllers
const departmentNegativeOrNanInputError = negativeOrNanInputError('/departmentForm/:id');
const departmentDNEError = dneError('Department', 'does not exist or its form structure is empty');
const userNegativeOrNanInputError = negativeOrNanInputError('/user/:id');
const userDNEError = dneError('User', 'does not exist');
const pageNotFoundError = { message: 'not found' };

export { departmentNegativeOrNanInputError, departmentDNEError, userNegativeOrNanInputError, userDNEError, pageNotFoundError };
