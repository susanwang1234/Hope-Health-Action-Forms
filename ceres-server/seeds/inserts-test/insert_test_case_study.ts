import { Knex } from 'knex';

export async function insertTestCaseStudy(knex: Knex): Promise<void> {
  await knex('CaseStudy').insert([{ id: 1, caseStudyTypeId: 1, departmentId: 2, userId: 2, title: 'Case Study Dummy 1' }]);
}
