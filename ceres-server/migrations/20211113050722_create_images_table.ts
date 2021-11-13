import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Image', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('imgFilename').unique().notNullable();
    table.text('imgFilepath').notNullable();
    table.text('imgMimetype').notNullable();
    table.bigInteger('imgSize').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('Image');
}
