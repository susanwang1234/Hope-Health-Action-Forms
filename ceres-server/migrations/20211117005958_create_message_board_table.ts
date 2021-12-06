import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Messages', function (table) {
    table.increments();
    table.text('messageContent').notNullable();
    table.string('author').notNullable().references('username').inTable('User');
    table.integer('departmentId').unsigned().notNullable().references('id').inTable('Department');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Messages');
}
