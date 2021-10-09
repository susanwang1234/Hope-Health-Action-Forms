import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Role').del();

  // Inserts seed entries
  await knex('Role').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 3, name: 'departmentHead' }
  ]);
}
