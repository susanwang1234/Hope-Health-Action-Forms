import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CaseStudyQuestion', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('label').notNullable();
    table.string('inputType', 20).notNullable();
    table.string('responseType', 20).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CaseStudyQuestion');
}
