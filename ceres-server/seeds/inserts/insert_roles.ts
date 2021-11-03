import { Knex } from 'knex';

export async function insertRoles(knex: Knex): Promise<void> {
  await knex('Role').insert([
    { id: 1, name: 'hhaAdmin' },
    { id: 2, name: 'hospitalAdmin' },
    { id: 3, name: 'departmentHead' },
    { id: 4, name: 'user' }
  ]);
}
