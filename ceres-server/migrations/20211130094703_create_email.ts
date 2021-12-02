import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Email', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('email', 50).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Email');
}
