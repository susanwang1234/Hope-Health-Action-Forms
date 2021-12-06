import { Knex } from 'knex';

export async function insertTestRoles(knex: Knex): Promise<void> {
  await knex('Role').insert([
    { id: 1, name: 'hhaAdmin', label: 'HHA Admin' },
    { id: 2, name: 'hospitalAdmin', label: 'Hospital Admin' },
    { id: 3, name: 'departmentHead', label: 'Department Head' },
    { id: 4, name: 'user', label: 'Staff' }
  ]);
}
