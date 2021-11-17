import { Knex } from 'knex';

export async function insertCaseStudy(knex: Knex): Promise<void> {
  await knex('CaseStudy').insert([{ id: 1, caseStudyTypeId: 1, departmentId: 1, userId: 1, imageId: 1, title: 'Case Study Dummy 1' }]);
  await knex('CaseStudy').insert([{ id: 2, caseStudyTypeId: 2, departmentId: 2, userId: 2, imageId: 2, title: 'Case Study Dummy 2' }]);
}
