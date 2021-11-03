import { Knex } from 'knex';
import { insertTestQuestions } from './inserts-test/insert_test_questions';
import { insertTestDepartments } from './inserts-test/insert_test_departments';
import { insertTestRehabDepartmentQuestions } from './inserts-test/insert_test_rehab_department_questions';
import { insertTestNICUPaedsDepartmentQuestions } from './inserts-test/insert_test_nicupaeds_department_questions';
import { insertTestRoles } from './inserts-test/insert_test_roles';
import { insertTestUsers } from './inserts-test/insert_test_users';

export async function seed(knex: Knex): Promise<void> {
  // Delete all existing entries, keeping in mind of foreign key constraints
  await knex.raw('SET FOREIGN_KEY_CHECKS=0;');
  await knex('Dummies').del();
  await knex('Rehab_Report').del();
  await knex('User').del();
  await knex('Role').del();
  await knex('FormResponse').del();
  await knex('Form').truncate();
  await knex('DepartmentQuestion').del();
  await knex('Department').del();
  await knex('Question').del();
  await knex.raw('SET FOREIGN_KEY_CHECKS=1;');

  // Insert seed entries
  await insertTestQuestions(knex);
  await insertTestDepartments(knex);
  await insertTestRehabDepartmentQuestions(knex);
  await insertTestNICUPaedsDepartmentQuestions(knex);
  await insertTestRoles(knex);
  await insertTestUsers(knex);
}
