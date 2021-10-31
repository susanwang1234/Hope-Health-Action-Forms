import { Knex } from 'knex';

export async function insertTestQuestions(knex: Knex): Promise<void> {
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
    { id: 13, label: 'Admissions', inputType: 'text', responseType: 'number', isMSPP: true }
  ]);
}
