import { Knex } from 'knex';

export async function insertTestEmployeeOfTheMonth(knex: Knex): Promise<void> {
  await knex('EmployeeOfTheMonth').insert([
    {
      id: 1,
      imageId: 1,
      name: 'Zack Cody',
      departmentId: 4,
      description:
        'Zack works in the maternity department at Hope Health Action delivering children. He is so good at delivering children he delivered 300 children this month ALONE. This is why he is employee of the month. Go Zack!'
    }
  ]);
}
