import { Knex } from 'knex';
import { insertQuestions } from './inserts/insert_questions';
import { insertRehabDepartmentQuestions } from './inserts/insert_rehab_department_questions';
import { insertNICUPaedsDepartmentQuestions } from './inserts/insert_nicupaeds_department_questions';
import { insertDepartments } from './inserts/insert_departments';
import { insertUsers } from './inserts/insert_users';
import { insertRoles } from './inserts/insert_roles';
import { insertRehabReports } from './inserts/insert_rehab_reports';
import { insertDummies } from './inserts/insert_dummies';
import { insertCaseStudyTypes } from './inserts/insert_case_study_types';
import { insertCaseStudyQuestions } from './inserts/insert_case_study_questions';
import { insertCaseStudyTypeQuestions } from './inserts/insert_case_study_type_questions';

export async function seed(knex: Knex): Promise<void> {
  // Delete all existing entries, keeping in mind of foreign key constraints
  await knex.raw('SET FOREIGN_KEY_CHECKS=0;');
  await knex('CaseStudyTypeQuestion').truncate();
  await knex('CaseStudyQuestion').truncate();
  await knex('CaseStudyType').truncate();
  await knex('Dummies').truncate();
  await knex('Rehab_Report').truncate();
  await knex('User').truncate();
  await knex('Role').truncate();
  await knex('FormResponse').truncate();
  await knex('Form').truncate();
  await knex('DepartmentQuestion').truncate();
  await knex('Department').truncate();
  await knex('Question').truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS=1;');

  // Insert seed entries
  await insertQuestions(knex);
  await insertDepartments(knex);
  await insertRehabDepartmentQuestions(knex);
  await insertNICUPaedsDepartmentQuestions(knex);
  await insertRoles(knex);
  await insertUsers(knex);
  await insertRehabReports(knex);
  await insertDummies(knex);
  await insertCaseStudyTypes(knex);
  await insertCaseStudyQuestions(knex);
  await insertCaseStudyTypeQuestions(knex);
}
