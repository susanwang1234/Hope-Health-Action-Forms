import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { isInvalidInput } from './controllerTools/isInvalidInput';

const NAMESPACE = 'Data Visualization Control';

const getDataForPlots = async (req: Request, res: Response, next: NextFunction) => {
  const departmentId = +req.params.departmentId;
  if (isInvalidInput(departmentId)) {
    res.status(400).send({ error: 'Incorrect usage for /dataviz/:departmentId, departmentId must be a positive integer' });
    return;
  }
  const query = Knex.select('FormResponse.response', 'createdAt', 'label', 'departmentQuestionId')
    .from('FormResponse')
    .join('DepartmentQuestion', 'FormResponse.departmentQuestionId', 'DepartmentQuestion.id')
    .join('Question', 'DepartmentQuestion.questionId', 'Question.id')
    .join('Form', 'FormResponse.formId', 'Form.id')
    .orderBy('departmentQuestionId', 'createdAt')
    .where('Form.departmentId', departmentId);

  const startMonth = req.query.startMonth;
  const startYear = req.query.startYear;
  if (startMonth && startYear) {
    const startDate = new Date(`${startMonth} ${startYear}`);
    query.where('createdAt', '>=', startDate);
  }

  const endMonth = req.query.endMonth;
  const endYear = req.query.endYear;
  if (endMonth && endYear) {
    const endDate = new Date(`${endMonth} ${endYear}`);
    query.where('createdAt', '<=', endDate);
  }

  const rawData = await query;
  const data: any = {
    plotData: [],
    questionLabels: []
  };
  let i = 0;
  while (i < rawData.length) {
    const departmentQuestionId: number = rawData[i].departmentQuestionId;
    let x = [];
    let y = [];
    data.questionLabels.push(rawData[i].label);
    while (i < rawData.length && rawData[i].departmentQuestionId === departmentQuestionId) {
      x.push(rawData[i].createdAt);
      y.push(rawData[i].response);
      i++;
    }
    data.plotData.push({ x: x, y: y });
  }

  res.send(data);
};

export default { getDataForPlots };
