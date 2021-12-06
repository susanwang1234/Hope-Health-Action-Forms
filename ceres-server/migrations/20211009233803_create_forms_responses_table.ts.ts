import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('FormResponse', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('departmentQuestionId').unsigned().notNullable().references('id').inTable('DepartmentQuestion');
    table.integer('formId').unsigned().notNullable().references('id').inTable('Form');
    table.string('response');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('FormResponse');
}
