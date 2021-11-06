import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CaseStudyTypeQuestion', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('caseStudyTypeId').unsigned().notNullable().references('id').inTable('CaseStudyType');
    table.integer('caseStudyQuestionId').unsigned().notNullable().references('id').inTable('CaseStudyQuestion');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CaseStudyTypeQuestion');
}
