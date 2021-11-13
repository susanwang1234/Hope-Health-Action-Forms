import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Image', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('filename').unique().notNullable();
    table.text('Filepath').notNullable();
    table.text('mimetype').notNullable();
    table.bigInteger('size').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('Image');
}
