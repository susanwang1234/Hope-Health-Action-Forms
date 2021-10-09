import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Dummies', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('dummies_name', 60);
    table.integer('dummies_info');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Dummies');
}
