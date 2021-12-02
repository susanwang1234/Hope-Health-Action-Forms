import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendEmail } from 'lib/passwordEmailer';

const NAMESPACE = 'Forgot Password Control';

const inputtedReqBody = (req: Request) => {
  const { username } = req.body;
  return { username: username };
};

const sendEmailToAdmin = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'SENDING AN EMAIL TO ADMIN');
  const forgotPasswordErrors = validationResult(req);
  if (!forgotPasswordErrors.isEmpty()) {
    return res.status(422).send({ errors: forgotPasswordErrors.array() });
  }
  try {
    await sendEmail(NAMESPACE, inputtedReqBody(req), res);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { sendEmailToAdmin };
