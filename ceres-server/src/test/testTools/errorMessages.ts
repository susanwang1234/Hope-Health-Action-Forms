const departmentNegativeInputError = { error: 'Incorrect usage for /departmentForm/:id , id must be a positive integer' };
const departmentDNEError = { error: 'Department does not exist or its form structure is empty' };
const pageNotFoundError = { message: 'not found' };

export { departmentNegativeInputError, departmentDNEError, pageNotFoundError };
