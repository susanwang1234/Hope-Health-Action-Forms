import { Knex } from 'knex';

export async function insertCaseStudyTypes(knex: Knex): Promise<void> {
  await knex('CaseStudyType').insert([
    { id: 1, name: 'Patient Story' },
    { id: 2, name: 'Staff Recognition' },
    { id: 3, name: 'Training Session' },
    { id: 4, name: 'Equipment Received' },
    { id: 5, name: 'Other Story' }
  ]);
}
