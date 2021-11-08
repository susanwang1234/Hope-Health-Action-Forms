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
import { insertTestCaseStudy } from './inserts-test/insert_test_case_study';
import { insertTestCaseStudyResponse } from './inserts-test/insert_test_case_study_response';

export async function seed(knex: Knex): Promise<void> {
  // Delete all existing entries, keeping in mind of foreign key constraints
  await knex.raw('SET FOREIGN_KEY_CHECKS=0;');
  await knex('CaseStudyTypeQuestion').truncate();
  await knex('CaseStudyQuestion').truncate();
  await knex('CaseStudyType').truncate();
  await knex('CaseStudyResponse').truncate();
  await knex('CaseStudy').truncate();
  await knex('User').truncate();
  await knex('Role').truncate();
  await knex('FormResponse').truncate();
  await knex('Form').truncate();
  await knex('DepartmentQuestion').truncate();
  await knex('Department').truncate();
  await knex('Question').truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS=1;');

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
  await insertTestCaseStudy(knex);
  await insertTestCaseStudyResponse(knex);
}
