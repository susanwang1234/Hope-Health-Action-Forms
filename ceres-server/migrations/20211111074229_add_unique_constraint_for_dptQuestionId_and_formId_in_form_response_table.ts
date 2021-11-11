import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('FormResponse', (table: Knex.AlterTableBuilder) => {
    table.unique(['departmentQuestionId', 'FormId']);
  });
}

export async function down(knex: Knex): Promise<void> {}
