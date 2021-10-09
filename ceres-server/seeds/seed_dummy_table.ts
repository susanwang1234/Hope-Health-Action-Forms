import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Dummies').del();

  // Inserts seed entries
  await knex('Dummies').insert([
    { id: 1, dummies_name: 'Dummy1', dummies_info: 111 },
    { id: 2, dummies_name: 'Dummy2', dummies_info: 222 }
  ]);
}
