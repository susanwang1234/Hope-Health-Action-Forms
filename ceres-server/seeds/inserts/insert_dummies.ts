import { Knex } from 'knex';

export async function insertDummies(knex: Knex): Promise<void> {
  await knex('Dummies').insert([
    { id: 1, dummies_name: 'Dummy1', dummies_info: 111 },
    { id: 2, dummies_name: 'Dummy2', dummies_info: 222 }
  ]);
}
