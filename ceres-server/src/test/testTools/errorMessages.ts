function negativeInputError(url: string) {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
}

function dneError(entity: string) {
  return { error: `${entity} does not exist or its form structure is empty` };
}

const departmentNegativeInputError = negativeInputError('/departmentForm/:id');
const departmentDNEError = dneError('Department');
const userNegativeInputError = negativeInputError('/user/:id');
const userDNEError = dneError('User');
const pageNotFoundError = { message: 'not found' };

export { departmentNegativeInputError, departmentDNEError, userNegativeInputError, userDNEError, pageNotFoundError };
