import { Knex } from 'knex';

export async function insertLeaderboard(knex: Knex): Promise<void> {
  await knex('Leaderboard').insert([
    { id: 1, name: 'Department' },
    { id: 2, name: 'Score' }
  ]);
}
