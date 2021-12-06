import { Knex } from 'knex';

export async function insertForm(knex: Knex): Promise<void> {
  await knex('Form').insert([{ departmentId: 3, isSubmitted: false }]);

  const formFields: any = { departmentId: 2, isSubmitted: false };
  const rehabForms = [{ createdAt: '2020-12-01 00:00:00', ...formFields }];
  for (let i = 3; i < 14; i++) {
    rehabForms.push({ createdAt: `2021-${i - 2}-01 00:00:00`, ...formFields });
  }

  // December 2021 form
  rehabForms.push({ createdAt: '2021-12-01 00:00:00', ...formFields });

  await knex('Form').insert(rehabForms);
}
