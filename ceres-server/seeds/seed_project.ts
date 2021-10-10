import { Knex } from 'knex';

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
  await knex('Question').insert([
    { id: 1, label: 'Beds available', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 2, label: 'Beds days', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 3, label: 'Patient days', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 4, label: 'Hospitalized', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 5, label: 'Discharged alive', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 6, label: 'Died before 48h', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 7, label: 'Died after 48h', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 8, label: 'Days hospitalised', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 9, label: 'Referrals', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 10, label: 'Transfers', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 11, label: 'Self-discharged', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 12, label: 'Stayed in the ward', inputType: 'text', responseType: 'number', isMSPP: true },
    { id: 13, label: 'Admissions', inputType: 'text', responseType: 'number', isMSPP: true },
  ]);
  await knex('Department').insert([{ id: 1, name: 'Rehab' }]);
  await knex('DepartmentQuestion').insert([
    { id: 1, departmentId: 1, questionId: 1, isRequired: true},
    { id: 2, departmentId: 1, questionId: 2, isRequired: true},
    { id: 3, departmentId: 1, questionId: 3, isRequired: true},
    { id: 4, departmentId: 1, questionId: 4, isRequired: true},
    { id: 5, departmentId: 1, questionId: 5, isRequired: true},
    { id: 6, departmentId: 1, questionId: 6, isRequired: true},
    { id: 7, departmentId: 1, questionId: 7, isRequired: true},
    { id: 8, departmentId: 1, questionId: 8, isRequired: true},
    { id: 9, departmentId: 1, questionId: 9, isRequired: true},
    { id: 10, departmentId: 1, questionId: 10, isRequired: true},
    { id: 11, departmentId: 1, questionId: 11, isRequired: true},
    { id: 12, departmentId: 1, questionId: 12, isRequired: true},
    { id: 13, departmentId: 1, questionId: 13, isRequired: true},
  ]);
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