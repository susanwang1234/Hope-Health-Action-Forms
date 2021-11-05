import { Knex } from 'knex';

export async function insertNICUPaedsDepartmentQuestions(knex: Knex): Promise<void> {
  await knex('DepartmentQuestion').insert([
    { id: 14, departmentId: 3, questionId: 1, isRequired: true },
    { id: 15, departmentId: 3, questionId: 2, isRequired: true },
    { id: 16, departmentId: 3, questionId: 3, isRequired: true },
    { id: 17, departmentId: 3, questionId: 4, isRequired: true },
    { id: 18, departmentId: 3, questionId: 5, isRequired: true },
    { id: 19, departmentId: 3, questionId: 6, isRequired: true },
    { id: 20, departmentId: 3, questionId: 7, isRequired: true },
    { id: 21, departmentId: 3, questionId: 8, isRequired: true },
    { id: 22, departmentId: 3, questionId: 9, isRequired: true },
    { id: 23, departmentId: 3, questionId: 10, isRequired: true },
    { id: 24, departmentId: 3, questionId: 11, isRequired: true },
    { id: 25, departmentId: 3, questionId: 12, isRequired: true },
    { id: 26, departmentId: 3, questionId: 13, isRequired: true }
  ]);
}
