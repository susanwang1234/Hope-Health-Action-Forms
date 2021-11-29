import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Data Visualization Control';

const getDataForPlots = async (req: Request, res: Response, next: NextFunction) => {
  const rawData = await Knex.select('FormResponse.response', 'createdAt', 'label', 'departmentQuestionId')
    .from('FormResponse')
    .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', 'DepartmentQuestion.id')
    .join('Question', 'DepartmentQuestion.questionId', 'Question.id')
    .join('Form', 'FormResponse.formId', 'Form.id')
    .orderBy('departmentQuestionId', 'createdAt');

  // const data = {};
  // for (const response of rawData) {
  //   const departmentQuestionId: number = response.departmentQuestionId
  //   if (data.hasOwnProperty(departmentQuestionId)) {
  //     data.
  //   }
  // }
  res.send(rawData);
};

export default { getDataForPlots };
