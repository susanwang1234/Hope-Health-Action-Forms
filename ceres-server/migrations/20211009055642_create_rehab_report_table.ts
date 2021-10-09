import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Rehab_Report', (table) => {
    table.increments();
    table.dateTime('curr_date');
    table.integer('beds_available');
    table.integer('bed_days');
    table.integer('patient_days');
    table.integer('hospitalised');
    table.integer('discharged');
    table.integer('self_discharges');
    table.integer('deaths_before_48');
    table.integer('deaths_after_48');
    table.integer('days_hospitalised');
    table.integer('referrals');
    table.integer('transfers');
    table.integer('stays');
    table.integer('admissions');
    table.integer('outpatients');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Rehab_Report');
}
