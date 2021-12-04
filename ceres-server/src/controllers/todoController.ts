import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { ToDo } from 'db/models/todoModel';
import { currMonth, currMonthLastDay, formatYearMonth } from './controllerTools/getTodaysDate';

const NAMESPACE = 'To-do Control';

const getFormStatus = async (req: Request, res: Response, next: NextFunction, departmentId: number) => {
  try {
    const retrievedForm = await Knex.select('*')
      .from('Form')
      .whereBetween('createdAt', [`${formatYearMonth}-01T00:00:00Z`, `${formatYearMonth}-${currMonthLastDay}T23:59:59Z`])
      .andWhere('departmentId', '=', departmentId)
      .andWhere('isSubmitted', '=', true);
    logging.info(NAMESPACE, `RETRIEVED FORMS FOR MONTH OF ${currMonth} FOR DEPARTMENT ID ${departmentId}`, retrievedForm);
    return retrievedForm.length;
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getCaseStudies = async (req: Request, res: Response, next: NextFunction, departmentId: number) => {
  try {
    const retrievedCaseStudies = await Knex('CaseStudy')
      .count('departmentId AS totalCaseStudies')
      .first()
      .whereBetween('createdAt', [`${formatYearMonth}-01T00:00:00Z`, `${formatYearMonth}-${currMonthLastDay}T23:59:59Z`])
      .andWhere('departmentId', '=', departmentId);
    logging.info(NAMESPACE, `COUNTED CASE STUDIES FOR MONTH OF ${currMonth} FOR DEPARTMENT ID ${departmentId}`, retrievedCaseStudies);
    return retrievedCaseStudies.totalCaseStudies;
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getToDoStatus = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'GETTING THE TO-DO STATUS FOR EACH DEPARTMENT');
  let listToDoStatus: ToDo[] = [];
  let currToDoStatus: ToDo;
  try {
    const numDepartments = await Knex('Department').count('id AS total').first();
    for (let departmentId = 2; departmentId <= numDepartments.total; departmentId++) {
      currToDoStatus = {
        departmentId: departmentId,
        dataForm: false,
        caseStudies: 0
      };
      try {
        currToDoStatus.dataForm = await getFormStatus(req, res, next, departmentId);
        currToDoStatus.caseStudies = await getCaseStudies(req, res, next, departmentId);
        listToDoStatus.push(currToDoStatus);
      } catch (error: any) {
        logging.error(NAMESPACE, error.message, error);
        res.status(500).send(error);
      }
    }
    res.status(200).send(listToDoStatus);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getToDoStatus };
