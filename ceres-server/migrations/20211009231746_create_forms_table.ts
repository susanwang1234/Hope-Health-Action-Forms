import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Form', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('departmentId').unsigned().notNullable().references('id').inTable('Department');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.boolean('isSubmitted');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Form');
}
