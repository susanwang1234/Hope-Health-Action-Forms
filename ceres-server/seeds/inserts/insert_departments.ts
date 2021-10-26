import { Knex } from 'knex';

export async function insertDepartments(knex: Knex): Promise<void> {
  await knex('Department').insert([
    { id: 1, name: 'Rehab' },
    { id: 2, name: 'NICUPaeds' }
  ]);
}
