import { Knex } from 'knex';

export async function insertFormResponse(knex: Knex): Promise<void> {
  await knex('FormResponse').insert([
    { departmentQuestionId: 14, formId: 1, response: '' },
    { departmentQuestionId: 15, formId: 1, response: '' },
    { departmentQuestionId: 16, formId: 1, response: '' },
    { departmentQuestionId: 17, formId: 1, response: '' },
    { departmentQuestionId: 18, formId: 1, response: '' },
    { departmentQuestionId: 19, formId: 1, response: '' },
    { departmentQuestionId: 20, formId: 1, response: '' },
    { departmentQuestionId: 21, formId: 1, response: '' },
    { departmentQuestionId: 22, formId: 1, response: '' },
    { departmentQuestionId: 23, formId: 1, response: '' },
    { departmentQuestionId: 24, formId: 1, response: '' },
    { departmentQuestionId: 25, formId: 1, response: '' },
    { departmentQuestionId: 26, formId: 1, response: '' }
  ]);

  await knex('FormResponse').insert(buildRehabFormResponses());
}

function buildRehabFormResponses() {
  const defaultValues = [19, 434, 377, 17, 2, 1, 0, 334, 0, 0, 1, 13, 4];
  const formResponses = [];
  for (let formId = 2; formId < 14; formId++) {
    for (let j = 0; j < defaultValues.length; j++) {
      formResponses.push({ departmentQuestionId: j + 1, formId: formId, response: generateRandomValue(defaultValues[j]) });
    }
  }
  return formResponses;
}

function generateRandomValue(defaultValue: number): number {
  return Math.floor(Math.random() * ((defaultValue + 1) * 2));
}
