import { Knex } from 'knex';
import { insertTestQuestions } from './inserts-test/insert_test_questions';
import { insertTestDepartments } from './inserts-test/insert_test_departments';
import { insertTestRehabDepartmentQuestions } from './inserts-test/insert_test_rehab_department_questions';
import { insertTestNICUPaedsDepartmentQuestions } from './inserts-test/insert_test_nicupaeds_department_questions';
import { insertTestRoles } from './inserts-test/insert_test_roles';
import { insertTestUsers } from './inserts-test/insert_test_users';
import { insertTestCaseStudyTypes } from './inserts-test/insert_test_case_study_types';
import { insertTestCaseStudyQuestions } from './inserts-test/insert_test_case_study_questions';
import { insertTestCaseStudyTypeQuestions } from './inserts-test/insert_test_case_study_type_questions';

export async function seed(knex: Knex): Promise<void> {
  // Delete all existing entries, keeping in mind of foreign key constraints
  await knex('CaseStudyTypeQuestion').del();
  await knex('CaseStudyQuestion').del();
  await knex('CaseStudyType').del();
  await knex('Dummies').del();
  await knex('Rehab_Report').del();
  await knex('User').del();
  await knex('Role').del();
  await knex('DepartmentQuestion').del();
  await knex('Department').del();
  await knex('Question').del();

  // Insert seed entries
  await insertTestQuestions(knex);
  await insertTestDepartments(knex);
  await insertTestRehabDepartmentQuestions(knex);
  await insertTestNICUPaedsDepartmentQuestions(knex);
  await insertTestRoles(knex);
  await insertTestUsers(knex);
  await insertTestCaseStudyTypes(knex);
  await insertTestCaseStudyQuestions(knex);
  await insertTestCaseStudyTypeQuestions(knex);
}
