import { Knex } from 'knex';

export async function insertRoles(knex: Knex): Promise<void> {
  await knex('Role').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 3, name: 'departmentHead' }
  ]);
}
