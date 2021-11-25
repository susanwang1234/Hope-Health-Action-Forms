import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Messages', function (table) {
    table.increments();
    table.string('message_content').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.string('author').notNullable().references('username').inTable('User');
    table.string('departmentName').notNullable().references('name').inTable('Department');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Messages');
}
