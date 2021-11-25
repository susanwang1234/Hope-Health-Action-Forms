import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { ToDo } from 'db/models/todoModel';

const NAMESPACE = 'To-do Control';

const formatMonth = (currMonth: number) => {
  return currMonth < 10 ? '0' + currMonth : '' + currMonth;
};

const getToDoStatus = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'GETTING THE TO-DO STATUS FOR EACH DEPARTMENT');

  // Haiti is GMT-5 (EASTERN TIME ET)
  const currDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Cancun' }));
  const currMonth = currDate.getMonth() + 1;
  const currYear = currDate.getFullYear();
  const currMonthLastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
  const formatYearMonth = `${currYear}-${formatMonth(currMonth)}`;

  let listToDoStatus: ToDo[] = [];
  let currToDoStatus: ToDo;

  try {
    const numDepartments = await Knex('Department').count('id AS total').first();
    console.log(numDepartments.total);
    for (let departmentId = 2; departmentId <= numDepartments.total; departmentId++) {
      currToDoStatus = {
        departmentId: departmentId,
        dataForm: false,
        caseStudies: 0
      };
      try {
        const retrievedForm = await Knex.select('*')
          .from('Form')
          .whereBetween('createdAt', [`${formatYearMonth}-01T00:00:00Z`, `${formatYearMonth}-${currMonthLastDay}T23:59:59Z`])
          .andWhere('departmentId', '=', departmentId)
          .andWhere('isSubmitted', '=', true);
        logging.info(NAMESPACE, `RETRIEVED FORMS FOR MONTH OF ${currMonth} FOR DEPARTMENT ID ${departmentId}`, retrievedForm);
        currToDoStatus.dataForm = retrievedForm.length;

        const retrievedCaseStudies = await Knex('CaseStudy')
          .count('departmentId AS totalCaseStudies')
          .first()
          .whereBetween('createdAt', [`${formatYearMonth}-01T00:00:00Z`, `${formatYearMonth}-${currMonthLastDay}T23:59:59Z`])
          .andWhere('departmentId', '=', departmentId);
        logging.info(NAMESPACE, `COUNTED CASE STUDIES FOR MONTH OF ${currMonth} FOR DEPARTMENT ID ${departmentId}`, retrievedCaseStudies);
        currToDoStatus.caseStudies = retrievedCaseStudies.totalCaseStudies;
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
