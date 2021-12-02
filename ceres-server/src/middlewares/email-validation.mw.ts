import { check } from 'express-validator';

const isValidEmail = [check('email').isEmail().trim().escape().normalizeEmail().withMessage('Must be a valid email')];

export { isValidEmail as emailValidation };
