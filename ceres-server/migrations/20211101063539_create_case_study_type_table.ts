import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CaseStudyType', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name', 50);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CaseStudyType');
}
