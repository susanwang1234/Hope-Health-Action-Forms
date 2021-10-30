function negativeInputErrorTemplate(url: string) {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
}

function dneErrorTemplate(entity: string) {
  return { error: `${entity} does not exist or its form structure is empty` };
}

const negativeInputError = negativeInputErrorTemplate('/departmentForm/:id');
const dneError = dneErrorTemplate('Department');
const pageNotFoundError = { message: 'not found' };

export { negativeInputError, dneError, pageNotFoundError };
