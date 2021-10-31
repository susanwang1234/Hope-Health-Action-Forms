import { Knex } from 'knex';

export async function insertTestRehabDepartmentQuestions(knex: Knex): Promise<void> {
  await knex('DepartmentQuestion').insert([
    { id: 1, departmentId: 1, questionId: 1, isRequired: true },
    { id: 2, departmentId: 1, questionId: 2, isRequired: true },
    { id: 3, departmentId: 1, questionId: 3, isRequired: true },
    { id: 4, departmentId: 1, questionId: 4, isRequired: true },
    { id: 5, departmentId: 1, questionId: 5, isRequired: true },
    { id: 6, departmentId: 1, questionId: 6, isRequired: true },
    { id: 7, departmentId: 1, questionId: 7, isRequired: true },
    { id: 8, departmentId: 1, questionId: 8, isRequired: true },
    { id: 9, departmentId: 1, questionId: 9, isRequired: true },
    { id: 10, departmentId: 1, questionId: 10, isRequired: true },
    { id: 11, departmentId: 1, questionId: 11, isRequired: true },
    { id: 12, departmentId: 1, questionId: 12, isRequired: true },
    { id: 13, departmentId: 1, questionId: 13, isRequired: true }
  ]);
}
