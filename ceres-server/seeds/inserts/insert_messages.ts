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
      messageContent: 'dfud fiash aisu wr0uas gfgia 0ehda ahfasa gvjxc w0sdvha 0f sasdh afasug as sia dfg awru vlzn cvpzxi bsfpihg  pdvbjfs sfbjpzs bshfsdi dagpibh aehtey',
      departmentId: 2
    }
  ]);
}
