import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CaseStudy', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('caseStudyTypeId').unsigned().notNullable().references('id').inTable('CaseStudyType');
    table.integer('departmentId').unsigned().notNullable().references('id').inTable('Department');
    table.integer('userId').unsigned().notNullable().references('id').inTable('User');
    table.string('title', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CaseStudy');
}
