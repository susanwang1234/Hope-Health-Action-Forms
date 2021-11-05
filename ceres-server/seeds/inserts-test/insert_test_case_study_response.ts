import { Knex } from 'knex';

export async function insertTestCaseStudyResponse(knex: Knex): Promise<void> {
  await knex('CaseStudyResponse').insert([{ id: 1, caseStudyTypeQuestionId: 1, caseStudyId: 1, response: 'John Doe' }]);
  await knex('CaseStudyResponse').insert([{ id: 2, caseStudyTypeQuestionId: 2, caseStudyId: 1, response: '69' }]);
  await knex('CaseStudyResponse').insert([{ id: 3, caseStudyTypeQuestionId: 3, caseStudyId: 1, response: 'Canada' }]);
  await knex('CaseStudyResponse').insert([{ id: 4, caseStudyTypeQuestionId: 4, caseStudyId: 1, response: 'Why not' }]);
  await knex('CaseStudyResponse').insert([{ id: 5, caseStudyTypeQuestionId: 5, caseStudyId: 1, response: '30 days' }]);
  await knex('CaseStudyResponse').insert([{ id: 6, caseStudyTypeQuestionId: 6, caseStudyId: 1, response: 'Unknown' }]);
  await knex('CaseStudyResponse').insert([{ id: 7, caseStudyTypeQuestionId: 7, caseStudyId: 1, response: 'Joe Doe is a 69 year old Canadian man who was stuck at the HCBH for 30 days...' }]);
  await knex('CaseStudyResponse').insert([{ id: 8, caseStudyTypeQuestionId: 8, caseStudyId: 2, response: 'Name is staff01' }]);
  await knex('CaseStudyResponse').insert([{ id: 9, caseStudyTypeQuestionId: 9, caseStudyId: 2, response: 'Nurse' }]);
  await knex('CaseStudyResponse').insert([{ id: 10, caseStudyTypeQuestionId: 10, caseStudyId: 2, response: 'Rehab' }]);
  await knex('CaseStudyResponse').insert([{ id: 11, caseStudyTypeQuestionId: 11, caseStudyId: 2, response: 'Long enough' }]);
  await knex('CaseStudyResponse').insert([{ id: 12, caseStudyTypeQuestionId: 12, caseStudyId: 2, response: 'I like to help people' }]);
  await knex('CaseStudyResponse').insert([
    { id: 13, caseStudyTypeQuestionId: 7, caseStudyId: 2, response: 'Staff01 is a nurse from the Rehab Department. She has been working there for "long enough"' }
  ]);
}
