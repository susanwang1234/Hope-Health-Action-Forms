import { Knex } from 'knex';

export async function insertTestCaseStudyQuestions(knex: Knex): Promise<void> {
  await insertQuestionsFromPatientStory(knex);
  await insertQuestionsFromStaffRecognition(knex);
  await insertQuestionsFromTrainingSession(knex);
  await insertQuestionsFromEquipmentReceived(knex);
}

async function insertQuestionsFromPatientStory(knex: Knex): Promise<void> {
  await knex('CaseStudyQuestion').insert([
    { id: 1, label: "Patient's name?", inputType: 'text', responseType: 'string' },
    { id: 2, label: "Patient's age?", inputType: 'text', responseType: 'string' },
    { id: 3, label: 'Where is the patient from?', inputType: 'text', responseType: 'string' },
    { id: 4, label: 'Why did the patient choose to come to HCBH?', inputType: 'text', responseType: 'string' },
    { id: 5, label: 'How long were they at HCBH?', inputType: 'text', responseType: 'string' },
    { id: 6, label: 'What was their diagnosis?', inputType: 'text', responseType: 'string' },
    { id: 7, label: 'Story', inputType: 'textarea', responseType: 'string' }
  ]);
}

async function insertQuestionsFromStaffRecognition(knex: Knex): Promise<void> {
  await knex('CaseStudyQuestion').insert([
    { id: 8, label: 'Staff name', inputType: 'text', responseType: 'string' },
    { id: 9, label: 'Role/Job Title', inputType: 'text', responseType: 'string' },
    { id: 10, label: 'What department does this staff member work in?', inputType: 'text', responseType: 'string' },
    { id: 11, label: 'How long have they been working at HCBH?', inputType: 'text', responseType: 'string' },
    { id: 12, label: 'What do they enjoy most about working at HCBH', inputType: 'text', responseType: 'string' }
  ]);
}

async function insertQuestionsFromTrainingSession(knex: Knex): Promise<void> {
  await knex('CaseStudyQuestion').insert([
    { id: 13, label: 'Training date?', inputType: 'text', responseType: 'string' },
    { id: 14, label: 'What was the training on?', inputType: 'text', responseType: 'string' },
    { id: 15, label: 'Who conducted the training?', inputType: 'text', responseType: 'string' },
    { id: 16, label: 'Who attended the training?', inputType: 'text', responseType: 'string' },
    { id: 17, label: 'How will the training benefit HCBH and its staff?', inputType: 'text', responseType: 'string' }
  ]);
}

async function insertQuestionsFromEquipmentReceived(knex: Knex): Promise<void> {
  await knex('CaseStudyQuestion').insert([
    { id: 18, label: 'What equipment was received?', inputType: 'text', responseType: 'string' },
    { id: 19, label: 'What department recevied the equipment?', inputType: 'text', responseType: 'string' },
    { id: 20, label: 'Who was the equipment from?', inputType: 'text', responseType: 'string' },
    { id: 21, label: 'Was the equipment donated or purchased?', inputType: 'text', responseType: 'string' },
    { id: 22, label: 'What does this new equipment do?', inputType: 'text', responseType: 'string' }
  ]);
}
