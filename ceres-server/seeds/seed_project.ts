import { Knex } from 'knex';
import { insertQuestions } from './inserts/insert_questions';
import { insertRehabDepartmentQuestions } from './inserts/insert_rehab_department_questions';
import { insertNICUPaedsDepartmentQuestions } from './inserts/insert_nicupaeds_department_questions';

export async function seed(knex: Knex): Promise<void> {
  // Delete All existing entries, keeping in mind of foreign key constraints
  await knex('Dummies').del();
  await knex('Rehab_Report').del();
  await knex('User').del();
  await knex('Role').del();
  await knex('DepartmentQuestion').del();
  await knex('Department').del();
  await knex('Question').del();

  // Insert seed entries
  await insertQuestions(knex);
  await knex('Department').insert([
    { id: 1, name: 'Rehab' },
    { id: 2, name: 'NICUPaeds' }
  ]);
  await insertRehabDepartmentQuestions(knex);
  await insertNICUPaedsDepartmentQuestions(knex);
  await knex('Role').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 3, name: 'departmentHead' }
  ]);
  await knex('User').insert([{ id: 1, username: 'admin', password: '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm', departmentId: 1, roleId: 1 }]);
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
  await knex('Dummies').insert([
    { id: 1, dummies_name: 'Dummy1', dummies_info: 111 },
    { id: 2, dummies_name: 'Dummy2', dummies_info: 222 }
  ]);
}
