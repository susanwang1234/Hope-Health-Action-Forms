import { check } from 'express-validator';

const isValidUsername = [check('username').isLength({ min: 1 }).trim().escape().withMessage('Must be a valid username')];

export { isValidUsername as forgotPasswordValidation };
