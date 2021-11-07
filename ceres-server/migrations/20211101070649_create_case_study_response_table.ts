import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CaseStudyResponse', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('caseStudyTypeQuestionId').unsigned().notNullable().references('id').inTable('CaseStudyTypeQuestion');
    table.integer('caseStudyId').unsigned().notNullable().references('id').inTable('CaseStudy');
    table.string('response').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CaseStudyResponse');
}
