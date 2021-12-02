import logging from '../config/logging';
import { Response } from 'express';
import { Knex } from '../db/mysql';

const nodemailer = require('nodemailer');
const USER_EMAIL = process.env.USER_EMAIL || 'cereshhatest@hotmail.com';
const USER_PASS = process.env.USER_EMAIL_PASSWORD || 'ceresTest21#';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS
  }
});

export const sendEmail = async (namespace: string, inputtedReqBody: any, res: Response) => {
  const retrievedEmailAddresses = await Knex.select('email AS address').from('Email');
  try {
    const emailContents = await transporter.sendMail({
      from: USER_EMAIL,
      to: retrievedEmailAddresses,
      subject: '[HHA Haiti Hospital] Forgot My Password',
      text: `To whom it may concern, \n\nI am ${inputtedReqBody.username} and I forgot my password. Please let me know once my password has been reset. \n\nThank you!`
    });
    logging.info(namespace, 'EMAIL SUCCESSFULLY SENT', emailContents);
    res.status(201).send({
      message: `Email has been sent to the following addresses`,
      addresses: retrievedEmailAddresses
    });
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};
