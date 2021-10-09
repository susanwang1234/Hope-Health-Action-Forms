import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Rehab_Report').del();

  // Inserts seed entries
  await knex('Rehab_Report').insert([
    {
      id: 1,
      curr_date: '2021-10-4 20:53:15',
      beds_available: 19,
      bed_days: 434,
      patient_days: 377,
      hospitalised: 17,
      discharged: 2,
      self_discharges: 1,
      deaths_before_48: 1,
      deaths_after_48: 0,
      days_hospitalised: 334,
      referrals: 0,
      transfers: 0,
      stays: 13,
      admissions: 4,
      outpatients: 16
    },
    {
      id: 2,
      curr_date: '2021-10-5 07:44:04',
      beds_available: 22,
      bed_days: 435,
      patient_days: 378,
      hospitalised: 17,
      discharged: 2,
      self_discharges: 1,
      deaths_before_48: 1,
      deaths_after_48: 0,
      days_hospitalised: 335,
      referrals: 0,
      transfers: 0,
      stays: 13,
      admissions: 4,
      outpatients: 16
    }
  ]);
}
