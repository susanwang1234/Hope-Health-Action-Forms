import { Knex } from 'knex';

export async function insertTestForm(knex: Knex): Promise<void> {
  await knex('Form').insert([{ id: 1, departmentId: 2, isSubmitted: false }]);
  await knex('Form').insert([{ id: 2, departmentId: 3, isSubmitted: false }]);
}
