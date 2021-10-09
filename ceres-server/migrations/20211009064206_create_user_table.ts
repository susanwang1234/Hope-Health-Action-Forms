import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('User', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('username', 50).unique().notNullable();
    table.string('password', 50).notNullable();
    table.integer('departmentId').unsigned().notNullable().references('id').inTable('Department');
    table.integer('roleId').unsigned().notNullable().references('id').inTable('Role');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('User');
}
