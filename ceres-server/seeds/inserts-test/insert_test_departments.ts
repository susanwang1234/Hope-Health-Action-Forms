import { Knex } from 'knex';

export async function insertTestDepartments(knex: Knex): Promise<void> {
  await knex('Department').insert([
    { id: 1, name: 'All Departments' },
    { id: 2, name: 'Rehab' },
    { id: 3, name: 'NICUPaeds' },
    { id: 4, name: 'Maternity' },
    { id: 5, name: 'Community Health' }
  ]);
}
