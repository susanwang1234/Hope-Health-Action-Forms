import { Knex } from 'knex';

export async function insertTestFormResponse(knex: Knex): Promise<void> {
  await knex('FormResponse').insert([
    { id: 1, departmentQuestionId: 1, formId: 1, response: '' },
    { id: 2, departmentQuestionId: 2, formId: 1, response: '' },
    { id: 3, departmentQuestionId: 3, formId: 1, response: '' },
    { id: 4, departmentQuestionId: 4, formId: 1, response: '' },
    { id: 5, departmentQuestionId: 5, formId: 1, response: '' },
    { id: 6, departmentQuestionId: 6, formId: 1, response: '' },
    { id: 7, departmentQuestionId: 7, formId: 1, response: '' },
    { id: 8, departmentQuestionId: 8, formId: 1, response: '' },
    { id: 9, departmentQuestionId: 9, formId: 1, response: '' },
    { id: 10, departmentQuestionId: 10, formId: 1, response: '' },
    { id: 11, departmentQuestionId: 11, formId: 1, response: '' },
    { id: 12, departmentQuestionId: 12, formId: 1, response: '' },
    { id: 13, departmentQuestionId: 13, formId: 1, response: '' }
  ]);
  await knex('FormResponse').insert([
    { id: 14, departmentQuestionId: 14, formId: 2, response: '' },
    { id: 15, departmentQuestionId: 15, formId: 2, response: '' },
    { id: 16, departmentQuestionId: 16, formId: 2, response: '' },
    { id: 17, departmentQuestionId: 17, formId: 2, response: '' },
    { id: 18, departmentQuestionId: 18, formId: 2, response: '' },
    { id: 19, departmentQuestionId: 19, formId: 2, response: '' },
    { id: 20, departmentQuestionId: 20, formId: 2, response: '' },
    { id: 21, departmentQuestionId: 21, formId: 2, response: '' },
    { id: 22, departmentQuestionId: 22, formId: 2, response: '' },
    { id: 23, departmentQuestionId: 23, formId: 2, response: '' },
    { id: 24, departmentQuestionId: 24, formId: 2, response: '' },
    { id: 25, departmentQuestionId: 25, formId: 2, response: '' },
    { id: 26, departmentQuestionId: 26, formId: 2, response: '' }
  ]);
}
