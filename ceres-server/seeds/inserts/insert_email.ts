import { Knex } from 'knex';

export async function insertEmails(knex: Knex): Promise<void> {
  await knex('Email').insert([{ id: 1, email: 'chf2@sfu.ca' }]);
  await knex('Email').insert([{ id: 2, email: 'akadiric@sfu.ca' }]);
}
