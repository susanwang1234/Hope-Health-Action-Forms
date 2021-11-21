import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { createItem } from './requestTemplates/createRequest';
import { isInvalidInput } from './controllerTools/isInvalidInput';
import { departmentNegativeOrNanInputError } from 'shared/errorMessages';

const NAMESPACE = 'Message Control';
const TABLE_NAME = 'Messages';
const SQL_FOREIGN_KEY_CONSTRAINT_ERROR_CODE: number = 1452;

const createNewMessage = () => {};

const getMessages = () => {};

export default { createNewMessage, getMessages };
