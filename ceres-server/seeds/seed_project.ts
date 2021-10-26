import { Knex } from 'knex';
import { insertQuestions } from './inserts/insert_questions';
import { insertRehabDepartmentQuestions } from './inserts/insert_rehab_department_questions';
import { insertNICUPaedsDepartmentQuestions } from './inserts/insert_nicupaeds_department_questions';
import { insertDepartments } from './inserts/insert_departments';
import { insertUsers } from './inserts/insert_users';
import { insertRoles } from './inserts/insert_roles';
import { insertRehabReports } from './inserts/insert_rehab_reports';
import { insertDummies } from './inserts/insert_dummies';

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
  await insertDepartments(knex);
  await insertRehabDepartmentQuestions(knex);
  await insertNICUPaedsDepartmentQuestions(knex);
  await insertRoles(knex);
  await insertUsers(knex);
  await insertRehabReports(knex);
  await insertDummies(knex);
}
