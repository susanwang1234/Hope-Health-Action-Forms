import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('EmployeeOfTheMonth', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('imageId').unsigned().notNullable().references('id').inTable('Image');
    table.string('name', 50).notNullable();
    table.string('department', 50).notNullable();
    table.integer('departmentId').unsigned().notNullable().references('id').inTable('Department');
    table.text('description').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('EmployeeOfTheMonth');
}
