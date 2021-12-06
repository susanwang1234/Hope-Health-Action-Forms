import { Knex } from 'knex';

export async function insertMessages(knex: Knex): Promise<void> {
  await knex('Messages').insert([
    {
      id: 1,
      author: 'admin',
      messageContent:
        'Good evening everyone, this is a friendly reminder that tommorow he have our monthly meeting at 6:00 pm. try to be on time before all snacks are gone. looking forward too seeing you all!',
      departmentId: 2
    },
    { id: 2, author: 'admin', messageContent: 'We support and stand by @HaitiCancerCenter in their fight aigains cancer! #go_away_cancer', departmentId: 2 },
    {
      id: 3,
      author: 'admin',
      messageContent: 'Goodevening all. I just wanted to remind everyone that the deadline for Rehab forms are due tommorow. lets make sure we have them ready. Thanks!',
      departmentId: 2
    },
    {
      id: 4,
      author: 'admin',
      messageContent: 'This is my message from dept id 1.',
      departmentId: 3
    },
    {
      id: 5,
      author: 'admin',
      messageContent: 'This is my message from dept id 1. Hello world. ',
      departmentId: 3
    },
    {
      id: 6,
      author: 'admin',
      messageContent: 'This is my message from dept id 1. Testing 1 2 3. ',
      departmentId: 3
    }
  ]);
}
