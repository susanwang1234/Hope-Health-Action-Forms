import { Knex } from 'knex';

export async function insertCaseStudyTypeQuestions(knex: Knex): Promise<void> {
  await insertPatientStoryTypeQuestions(knex);
  await insertStaffRecognitionTypeQuestions(knex);
  await insertTrainingSessionTypeQuestions(knex);
  await insertEquipmentReceivedTypeQuestions(knex);
  await insertOtherTypeQuestions(knex);
}

async function insertPatientStoryTypeQuestions(knex: Knex): Promise<void> {
  await knex('CaseStudyTypeQuestion').insert([
    { id: 1, caseStudyTypeId: 1, caseStudyQuestionId: 1 },
    { id: 2, caseStudyTypeId: 1, caseStudyQuestionId: 2 },
    { id: 3, caseStudyTypeId: 1, caseStudyQuestionId: 3 },
    { id: 4, caseStudyTypeId: 1, caseStudyQuestionId: 4 },
    { id: 5, caseStudyTypeId: 1, caseStudyQuestionId: 5 },
    { id: 6, caseStudyTypeId: 1, caseStudyQuestionId: 6 },
    { id: 7, caseStudyTypeId: 1, caseStudyQuestionId: 7 }
  ]);
}

async function insertStaffRecognitionTypeQuestions(knex: Knex): Promise<void> {
  await knex('CaseStudyTypeQuestion').insert([
    { id: 8, caseStudyTypeId: 2, caseStudyQuestionId: 8 },
    { id: 9, caseStudyTypeId: 2, caseStudyQuestionId: 9 },
    { id: 10, caseStudyTypeId: 2, caseStudyQuestionId: 10 },
    { id: 11, caseStudyTypeId: 2, caseStudyQuestionId: 11 },
    { id: 12, caseStudyTypeId: 2, caseStudyQuestionId: 12 },
    { id: 13, caseStudyTypeId: 2, caseStudyQuestionId: 7 }
  ]);
}

async function insertTrainingSessionTypeQuestions(knex: Knex): Promise<void> {
  await knex('CaseStudyTypeQuestion').insert([
    { id: 14, caseStudyTypeId: 3, caseStudyQuestionId: 13 },
    { id: 15, caseStudyTypeId: 3, caseStudyQuestionId: 14 },
    { id: 16, caseStudyTypeId: 3, caseStudyQuestionId: 15 },
    { id: 17, caseStudyTypeId: 3, caseStudyQuestionId: 16 },
    { id: 18, caseStudyTypeId: 3, caseStudyQuestionId: 17 },
    { id: 19, caseStudyTypeId: 3, caseStudyQuestionId: 7 }
  ]);
}

async function insertEquipmentReceivedTypeQuestions(knex: Knex): Promise<void> {
  await knex('CaseStudyTypeQuestion').insert([
    { id: 20, caseStudyTypeId: 4, caseStudyQuestionId: 18 },
    { id: 21, caseStudyTypeId: 4, caseStudyQuestionId: 19 },
    { id: 22, caseStudyTypeId: 4, caseStudyQuestionId: 20 },
    { id: 23, caseStudyTypeId: 4, caseStudyQuestionId: 21 },
    { id: 24, caseStudyTypeId: 4, caseStudyQuestionId: 22 },
    { id: 25, caseStudyTypeId: 4, caseStudyQuestionId: 7 }
  ]);
}

async function insertOtherTypeQuestions(knex: Knex): Promise<void> {
  await knex('CaseStudyTypeQuestion').insert([{ id: 26, caseStudyTypeId: 5, caseStudyQuestionId: 7 }]);
}
