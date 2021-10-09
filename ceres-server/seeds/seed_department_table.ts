import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Department').del();

  // Inserts seed entries
  await knex('Department').insert([{ id: 1, name: 'Rehab' }]);
}
