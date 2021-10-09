import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('DepartmentQuestion', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('departmentId').unsigned().notNullable().references('id').inTable('Department');
    table.integer('questionId').unsigned().notNullable().references('id').inTable('Questions');
    table.boolean('isRequired');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('DepartmentQuestion');
}
